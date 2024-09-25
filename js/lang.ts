function setLang(lang) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    if (typeof localStorage !== "undefined") {
        localStorage.setItem("selectedLang", lang);
        localStorage.setItem("langExpiration", expirationDate.toISOString());
    }
    document.documentElement.setAttribute("lang", lang);
}

function getBrowserLanguage() {
    return navigator.language || navigator.userLanguage;
}

document.addEventListener("DOMContentLoaded", function () {
    if (typeof localStorage !== "undefined") {
        const selectedLang = localStorage.getItem("selectedLang");
        const langExpiration = localStorage.getItem("langExpiration");

        if (selectedLang && langExpiration) {
            const expirationDate = new Date(langExpiration);

            if (expirationDate > new Date()) {
                setLang(selectedLang);
            } else {
                localStorage.removeItem("selectedLang");
                localStorage.removeItem("langExpiration");
            }
        } else {
            const browserLanguage = getBrowserLanguage();
            const lang = /^es/i.test(browserLanguage) ? "Esp" : "Eng";
            setLang(lang);
        }
    } else {
        const browserLanguage = getBrowserLanguage();
        const lang = /^es/i.test(browserLanguage) ? "Esp" : "Eng";
        setLang(lang);
    }
});
