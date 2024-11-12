"use strict";
var Languages;
(function (Languages) {
    Languages["English"] = "en";
    Languages["Spanish"] = "es";
})(Languages || (Languages = {}));
function setLang(lang) {
    if (lang !== Languages.English && lang !== Languages.Spanish) {
        throw new Error("Why are you trying to set the language to something that isn't 'en' or 'es'?");
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
        const isInvalidLang = selectedLang !== Languages.English &&
            selectedLang !== Languages.Spanish;
        if (selectedLang && langExpiration) {
            const expirationDate = new Date(langExpiration);
            if (!isNaN(expirationDate.getTime()) &&
                expirationDate > new Date()) {
                if (isInvalidLang) {
                    localStorage.removeItem("selectedLang");
                    localStorage.removeItem("langExpiration");
                    setLang(testLang(navigator.language));
                }
                else {
                    setLang(selectedLang);
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
    const switchToEnglish = document.getElementById("setLangEn");
    const switchToSpanish = document.getElementById("setLangEs");
    if (!switchToEnglish || !switchToSpanish) {
        console.error("Either 'setLangEn' or 'setLangEs' is missing. Check your code.");
        throw new Error("Either 'setLangEn' or 'setLangEs' is missing. Check your code.");
    }
    switchToEnglish.addEventListener("click", function () {
        setLang(Languages.English);
    });
    switchToSpanish.addEventListener("click", function () {
        setLang(Languages.Spanish);
    });
});
