"use strict";
var Languages;
(function (Languages) {
    Languages["English"] = "Eng";
    Languages["Spanish"] = "Esp";
})(Languages || (Languages = {}));
;
function setLang(lang) {
    if (lang !== Languages.English && lang !== Languages.Spanish) {
        throw new Error("Why are you trying to set the language to something that isn't 'Eng' or 'Esp'?");
    }
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365);
    try {
        localStorage.setItem("selectedLang", lang);
        localStorage.setItem("langExpiration", expirationDate.toISOString());
    }
    catch (e) {
        console.error("Error accessing localStorage", e);
    }
    document.documentElement.setAttribute("lang", lang);
}
document.addEventListener("DOMContentLoaded", function () {
    function testLang(test) {
        return /^es/i.test(test) ? Languages.Spanish : Languages.English;
    }
    try {
        const selectedLang = localStorage.getItem("selectedLang");
        const langExpiration = localStorage.getItem("langExpiration");
        if (selectedLang && langExpiration) {
            const expirationDate = new Date(langExpiration);
            if (!isNaN(expirationDate.getTime()) && expirationDate > new Date()) {
                if (selectedLang === Languages.English || selectedLang === Languages.Spanish) {
                    setLang(selectedLang);
                }
                else {
                    localStorage.removeItem("selectedLang");
                    localStorage.removeItem("langExpiration");
                }
            }
            else {
                localStorage.removeItem("selectedLang");
                localStorage.removeItem("langExpiration");
                setLang(testLang(navigator.language));
            }
        }
        else {
            setLang(testLang(navigator.language));
        }
    }
    catch (e) {
        console.error("Error accessing localStorage", e);
        setLang(testLang(navigator.language));
    }
});