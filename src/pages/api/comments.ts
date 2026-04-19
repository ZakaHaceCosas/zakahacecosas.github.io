export const prerender = false;

import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import { Profanity } from "@2toad/profanity";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) throw new Error(JSON.stringify(process.env, null, 1));

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const MAX_REQ_POR_MINUTO = 2;
// no sé desde cuando esto existe (Emoji_presentation como regex)
// pensé que chatgpt estaba alucinando, pero funciona
const EMOJI_REGEX = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu;

// llevo la vida sin usar Supabase, mare mía

const getCorsHeaders = (origin: string | null) => {
    const headers: Record<string, string> = {};

    if (!origin) return headers;

    const url = new URL(origin);

    if (url.hostname.endsWith(".zhc.es") || url.hostname === "zhc.es") {
        headers["Access-Control-Allow-Origin"] = origin;
        headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS";
        headers["Access-Control-Allow-Headers"] = "Content-Type";
        headers["Vary"] = "Origin";
    }

    return headers;
};

const buildResponse = (request: Request, content: any, status = 200): Response =>
    Response.json(content, {
        status,
        headers: getCorsHeaders(request.headers.get("origin")),
    });

export const OPTIONS: APIRoute = async ({ request }) => {
    return new Response(null, {
        status: 204,
        headers: getCorsHeaders(request.headers.get("origin")),
    });
};

export const GET: APIRoute = async (ctx) => {
    const searchParams = ctx.url.searchParams;
    const pageId = searchParams.get("comments");

    if (!pageId) {
        return buildResponse(
            ctx.request,
            {
                error:
                    "Falta ID de página en los parámetros recibidos: " +
                    JSON.stringify(Object.fromEntries(searchParams)),
            },
            400,
        );
    }

    const { data: comments, error } = await supabase
        .from("comments")
        .select("*")
        .eq("page_id", pageId)
        .eq("approved", true)
        .order("created_at", { ascending: false });

    if (error) return buildResponse(ctx.request, { error: error.message }, 500);
    return buildResponse(ctx.request, comments);
};

const moderador = new Profanity({
    languages: ["es"],
    wholeWord: true,
    grawlix: "*****",
    grawlixChar: "*",
});

export const POST: APIRoute = async (ctx) => {
    const ip = crypto
        .createHash("sha256")
        .update(ctx.request.headers.get("x-forwarded-for") ?? "unknown")
        .digest("hex");

    const { text, author, pageId } = await ctx.request.json();

    if (!text || text.length < 3 || text.length > 500)
        return buildResponse(
            ctx.request,
            { error: "Texto inválido, o es muy corto (<3 letras) o muy largo (>500)." },
            400,
        );

    if (author && (author.length < 3 || author.length > 64))
        return buildResponse(
            ctx.request,
            { error: "Autor inválido, o es muy corto (<3 letras) o muy largo (>64)." },
            400,
        );

    const clean = moderador.censor(text);
    // podría prohibir las cosas malas directamente, pero bueno, vamos a ser algo más liberales
    // return json({ error: "Comentario moderado. No uses palabrotas." }, { status: 400 });

    // emojis sospechosos
    const emojis = text.match(EMOJI_REGEX) || [];
    const counts: Record<string, number> = {};
    for (const e of emojis) {
        counts[e] = (counts[e] || 0) + 1;
        if (counts[e] > 5) return buildResponse(ctx.request, { error: "Spam de emojis detectado. No te pases." }, 400);
    }

    const now = Date.now();
    const { data: rateData } = await supabase.from("rate_limits").select("*").eq("ip_hash", ip).limit(1).single();

    if (rateData) {
        if (rateData.reset_at > now && rateData.count >= MAX_REQ_POR_MINUTO)
            return buildResponse(
                ctx.request,
                {
                    error: `Demasiadas solicitudes. Estás limitado a ${MAX_REQ_POR_MINUTO} comentarios por minuto.`,
                },
                429,
            );
        else if (rateData.reset_at <= now) {
            await supabase.from("rate_limits").upsert({ ip_hash: ip, count: 1, reset_at: now + 60_000 });
        } else {
            await supabase
                .from("rate_limits")
                .update({ count: rateData.count + 1 })
                .eq("ip_hash", ip);
        }
    } else {
        await supabase.from("rate_limits").insert({ ip_hash: ip, count: 1, reset_at: now + 60_000 });
    }

    const { error: insertError } = await supabase.from("comments").insert({
        page_id: pageId,
        text: clean,
        ip_hash: ip,
        created_at: now,
        approved: false,
        author: (author ?? "").trim() === "" ? null : author,
        is_wm: false,
        admin_res: null,
    });

    if (insertError) return buildResponse(ctx.request, { error: insertError.message }, 500);
    return buildResponse(ctx.request, { ok: true });
};
