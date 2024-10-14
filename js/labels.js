"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll("box");
    boxes.forEach((box) => {
        const allLabels = box.getAttribute("labels");
        if (!allLabels) {
            return;
        }
        const flexElement = box.querySelector("flex");
        if (!flexElement) {
            console.error("If this is running, it means a card WITH labels doesn't have the <flex> element. Check your code.");
            throw new Error("Error: No flex element on labeled card.");
        }
        flexElement.style.marginTop = "10px";
        const labeler = document.createElement("labeler");
        const fragment = document.createDocumentFragment();
        allLabels.split(",").forEach((label) => {
            const labelElement = document.createElement("label");
            labelElement.innerText = label;
            fragment.appendChild(labelElement);
        });
        labeler.appendChild(fragment);
        box.insertBefore(labeler, flexElement);
    });
});
