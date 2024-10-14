"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll("box");
    boxes.forEach((box) => {
        const allLabels = box.getAttribute("labels");
        if (!allLabels) {
            return; // no labels = just ignore
        }
        const flexElement = box.querySelector("flex");
        if (!flexElement) {
            console.error("If this is running, it means a card WITH labels doesn't have the <flex> element. Check your code.");
            throw new Error("Error: No flex element on labeled card.");
        }
        // visual fix
        flexElement.style.marginTop = "10px";
        // creates a <labeler> and adds labels to it before inserting it into the <box>
        const labeler = document.createElement("labeler");
        const fragment = document.createDocumentFragment();
        allLabels.split(",").forEach((label) => {
            const labelElement = document.createElement("label");
            labelElement.innerText = label;
            fragment.appendChild(labelElement);
        });
        // labels are added to the labeler to avoid issues with flex styling
        // now this is done in a single operation (for performance)
        labeler.appendChild(fragment);
        // append the labeler before the flex element
        box.insertBefore(labeler, flexElement);
    });
});
