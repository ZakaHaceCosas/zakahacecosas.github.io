document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll("box");

    boxes.forEach((box) => {
        const allLabels = box.getAttribute("labels");
        if (!allLabels) {
            return // no labels = just ignore
        }
        const labels = allLabels.split(",");
        const flexElement = box.querySelector("flex");

        // creates a <labeler> and adds it to the <box>
        const labeler = document.createElement("labeler");
        box.insertBefore(labeler, flexElement);

        labels.forEach((label) => {
            const labelElement = document.createElement("label");
            labelElement.innerText = label;

            // labels are added to the labeler to avoid issues with flex styling
            labeler.appendChild(labelElement);
        });
    });
});