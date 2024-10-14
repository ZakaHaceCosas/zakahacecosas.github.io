"use strict";
const statusTextMap = {
    available: {
        esp: "Disponible",
        eng: "Available",
        longTextEsp: `Acepto comisiones / encargos. ¡Genial! Escríbeme por donde sea, <b>preferible Discord</b>, y hagamos cosas épicas.`,
        longTextEng: `I am available for hire. Great! Text me anywhere, <b>preferably Discord</b>, and lets make epic things.`,
        className: "god"
    },
    busy: {
        esp: "Ocupado",
        eng: "Busy",
        longTextEsp: `Acepto comisiones / encargos, PERO que no te sorprendan (de momento) respuestas tardías o problemas para aceptar encargos. Ando mal de tiempo.`,
        longTextEng: `I am for hire, BUT don't be surprised (for now) by late replies or problems to accept some works. I'm lacking time.`,
        className: "meh"
    },
    notAvailable: {
        esp: "Muy ocupado",
        eng: "Very busy",
        longTextEsp: `<b>De momento NO acepto comisiones / encargos.</b> Volvió el curso escolar y las responsabilidades se me acumulan. No puedo ofrecer nada. Lo siento.`,
        longTextEng: `<b>I am NOT available for hire, for now.</b> I really lack spare time for now as I'm dealing with my studies. Sorry.`,
        className: "nah"
    }
};
function createElement(tag, innerText, isHTML = false) {
    const element = document.createElement(tag);
    if (innerText) {
        if (isHTML) {
            element.innerHTML = innerText;
        }
        else {
            element.innerText = innerText;
        }
    }
    return element;
}
function constructStatus(statusItem, status) {
    try {
        const statusData = statusTextMap[status];
        const statusLabel = createElement("p", null, false);
        statusLabel.appendChild(createElement("esp", "Estado"));
        statusLabel.appendChild(createElement("eng", "Status"));
        statusItem.appendChild(statusLabel);
        const mainLabel = createElement("h2", null, false);
        mainLabel.appendChild(createElement("esp", statusData.esp));
        mainLabel.appendChild(createElement("eng", statusData.eng));
        mainLabel.className = statusData.className;
        statusItem.appendChild(mainLabel);
        const longLabel = createElement("p", null, false);
        longLabel.appendChild(createElement("esp", statusData.longTextEsp, true));
        longLabel.appendChild(createElement("eng", statusData.longTextEng, true));
        statusItem.appendChild(longLabel);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const statusItem = document.querySelector("StatusItem");
    if (!statusItem) {
        console.error("Why is there no status item?");
        return;
    }
    const status = statusItem.getAttribute("status");
    if (!status) {
        console.error("You forgot the status attribute.");
        return;
    }
    else if (!(status in statusTextMap)) {
        console.error("Status is not valid. Use one of the following: notAvailable, available, busy");
        return;
    }
    constructStatus(statusItem, status);
});
