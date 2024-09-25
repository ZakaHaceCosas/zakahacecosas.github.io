document.addEventListener("DOMContentLoaded", () => {
    const boxes: NodeListOf<Element> = document.querySelectorAll<Element>("box");

    boxes.forEach((box: Element) => {
        const allLabels: string | null = box.getAttribute("labels");
        if (!allLabels) {
            return; // no labels = just ignore
        }

        const labels: string[] = allLabels.split(",");
        const flexElement: Element | null = box.querySelector("flex");
        if (!flexElement) {
            console.error("If this is running, it means a card WITH labels doesn't have the <flex> element. Check your code.")
        }

        // creates a <labeler> and adds it to the <box>
        const labeler: HTMLElement = document.createElement("labeler");
        box.insertBefore(labeler, flexElement);

        labels.forEach((label: string) => {
            const labelElement: HTMLElement = document.createElement("label");
            labelElement.innerText = label;

            // labels are added to the labeler to avoid issues with flex styling
            labeler.appendChild(labelElement);
        });
    });
});
