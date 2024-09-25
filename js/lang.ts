enum Languages {
    English = "Eng",
    Spanish = "Esp"
};

function setLang(lang: Languages) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365);
    if (typeof localStorage !== "undefined") {
        if (lang === Languages.English || lang === Languages.Spanish) {
            try {
                localStorage.setItem("selectedLang", lang);
                localStorage.setItem("langExpiration", expirationDate.toISOString());
            } catch (e) {
                console.error("Error accessing localStorage", e);
            }
        } else {
            console.error("Why are you trying to set the language to something that isn't 'Eng' or 'Esp'?")
        }
    }
    document.documentElement.setAttribute("lang", lang);
}

document.addEventListener("DOMContentLoaded", function () {
    function testLang(test: string) {
        const lang = /^es/i.test(test) ? Languages.Spanish : Languages.English;
        return lang
    }

    if (typeof localStorage !== "undefined") {
        const selectedLang = localStorage.getItem("selectedLang");
        const langExpiration = localStorage.getItem("langExpiration");

        if (selectedLang && langExpiration) {
            const expirationDate = new Date(langExpiration);

            if (expirationDate > new Date()) {
                if (!isNaN(expirationDate.getTime()) && expirationDate > new Date()) {
                    setLang(selectedLang as Languages);
                } else {
                    localStorage.removeItem("selectedLang");
                    localStorage.removeItem("langExpiration");
                }
            } else {
                localStorage.removeItem("selectedLang");
                localStorage.removeItem("langExpiration");
            }
        } else {
            setLang(testLang(navigator.language));
        }
    } else {
        setLang(testLang(navigator.language));
    }
});
