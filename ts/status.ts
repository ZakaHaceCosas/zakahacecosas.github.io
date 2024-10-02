type validStatus = "notAvailable" | "available" | "busy";

function constructStatus(statusItem: HTMLElement, status: validStatus): void {
    try {
        // statusItem.className = "zakaBox animation";
        const statusLabel = document.createElement("p");

        const statusEsp = document.createElement("esp");
        statusEsp.innerText = "Estado";
        const statusEng = document.createElement("eng");
        statusEng.innerText = "Status";

        statusLabel.appendChild(statusEsp);
        statusLabel.appendChild(statusEng);

        statusItem.appendChild(statusLabel);

        const mainLabel = document.createElement("h2");

        const mainEsp = document.createElement("esp");
        mainEsp.innerText = status === "available" ? "Disponible" : status === "busy" ? "Ocupado" : "Muy ocupado";
        const mainEng = document.createElement("eng");
        mainEng.innerText = status === "available" ? "Available" : status === "busy" ? "Busy" : "Very busy";

        mainLabel.appendChild(mainEsp);
        mainLabel.appendChild(mainEng);

        mainLabel.className = status === "available" ? "god" : status === "busy" ? "meh" : "nah";

        statusItem.appendChild(mainLabel);

        const SpanishLongTexts = [
            `Acepto comisiones / encargos. ¡Genial! Escríbeme por donde sea, <b>preferible Discord</b>, y hagamos cosas épicas.`, // Trabajo gratis para ganar experiencia (y por no tener cuenta bancaria para cobrar), aunque también acepto BTC.
            `Acepto comisiones / encargos, PERO que no te sorprendan (de momento) respuestas tardías o problemas para aceptar encargos. Ando mal de tiempo.`,
            `<b>De momento NO acepto comisiones / encargos.</b> Volvió el curso escolar y las responsabilidades se me acumulan. No puedo ofrecer nada. Lo siento.`
        ]

        const EnglishLongTexts = [
            `I am available for hire. Great! Text me anywhere, <b>preferably Discord</b>, and lets make epic things.`,
            `I am for hire, BUT don't be surprised (for now) by late replies or problems to accept some works. I'm lacking time.`,
            `<b>I am NOT available for hire, for now.</b> I really lack spare time for now as I'm dealing with my studies. Sorry.`
        ]

        const longLabel = document.createElement("p");

        const longEsp = document.createElement("esp");
        longEsp.innerHTML = status === "available" ? SpanishLongTexts[0] : status === "busy" ? SpanishLongTexts[1] : SpanishLongTexts[2];
        const longEng = document.createElement("eng");
        longEng.innerHTML = status === "available" ? EnglishLongTexts[0] : status === "busy" ? EnglishLongTexts[1] : EnglishLongTexts[2];

        longLabel.appendChild(longEsp);
        longLabel.appendChild(longEng);

        statusItem.appendChild(longLabel);
    } catch (e) {
        console.error(e);
        throw e;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const statusItem: HTMLElement | null = document.querySelector("StatusItem");

    if (!statusItem) {
        console.error("Why is there no status item?");
        return;
    }

    const status: string | null = statusItem.getAttribute("status");

    if (!status) {
        console.error("You forgot the status attribute.");
        return;
    } else if (!["notAvailable", "available", "busy"].includes(status as validStatus)) {
        console.error("Status is not valid. Use one of the following: notAvailable, available, busy");
        return;
    }

    constructStatus(statusItem, status as validStatus)
});
