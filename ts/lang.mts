enum Languages {
    English = "en",
    Spanish = "es",
}

function setLang(lang: Languages) {
    if (lang !== Languages.English && lang !== Languages.Spanish) {
        throw new Error(
            "Why are you trying to set the language to something that isn't 'en' or 'es'?"
        );
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365);
    try {
        localStorage.setItem("selectedLang", lang);
        localStorage.setItem("langExpiration", expirationDate.toISOString());
    } catch (e) {
        console.error("Error accessing localStorage", e);
    }
    document.documentElement.setAttribute("lang", lang);
}

document.addEventListener("DOMContentLoaded", function () {
    function testLang(test: string): Languages {
        return /^es/i.test(test) ? Languages.Spanish : Languages.English;
    }

    try {
        const selectedLang = localStorage.getItem("selectedLang");
        const langExpiration = localStorage.getItem("langExpiration");

        const isInvalidLang =
            selectedLang !== Languages.English &&
            selectedLang !== Languages.Spanish;

        if (selectedLang && langExpiration) {
            const expirationDate = new Date(langExpiration);
            if (
                !isNaN(expirationDate.getTime()) &&
                expirationDate > new Date()
            ) {
                if (isInvalidLang) {
                    localStorage.removeItem("selectedLang");
                    localStorage.removeItem("langExpiration");
                    setLang(testLang(navigator.language));
                } else {
                    setLang(selectedLang as Languages);
                }
            } else {
                localStorage.removeItem("selectedLang");
                localStorage.removeItem("langExpiration");
                setLang(testLang(navigator.language));
            }
        } else {
            setLang(testLang(navigator.language));
        }
    } catch (e) {
        console.error("Error accessing localStorage", e);
        setLang(testLang(navigator.language));
    }

    const switchToEnglish: HTMLElement | null =
        document.getElementById("setLangEn");
    const switchToSpanish: HTMLElement | null =
        document.getElementById("setLangEs");

    if (!switchToEnglish || !switchToSpanish) {
        console.error(
            "Either 'setLangEn' or 'setLangEs' is missing. Check your code."
        );
        throw new Error(
            "Either 'setLangEn' or 'setLangEs' is missing. Check your code."
        );
    }

    switchToEnglish.addEventListener("click", function () {
        setLang(Languages.English);
    });

    switchToSpanish.addEventListener("click", function () {
        setLang(Languages.Spanish);
    });
});
