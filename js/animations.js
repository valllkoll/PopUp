document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".container");

    containers.forEach(container => {
        const svgFile = container.getAttribute("data-svg");

        if (svgFile) {
            fetch(`svg/${svgFile}`)
                .then(response => response.text())
                .then(svgContent => {
                    container.innerHTML = svgContent;

                    const svgElement = container.querySelector("svg");
                    const elements = svgElement.querySelectorAll("*");
                    elements.forEach((element, index) => {
                    element.style.setProperty("--index", index);
                    });
                    executeAnimation(svgFile, Array.from(elements));

                })
                .catch(error => console.error(`Error loading SVG: ${svgFile}`, error));
        }
    });
});

// Funktion zur Ausführung der Animation basierend auf der SVG-Datei
function executeAnimation(svgFile, elements) {
    switch (svgFile) {
        case "kreise.svg":
            applyAnimationClass(elements, "kreise-animation");
            break;
        case "ucom.svg":
            applyAnimationClass(elements, "ucom-animation");
            break;
        case "blobs.svg":
            applyAnimationClass(elements, "blobs-animation");
            break;
        case "quads.svg":
            const count = elements.length;
            elements.forEach((el, i) => {
                const spin = (90 * i / (count - i));
                el.style.setProperty('--spin-end', `${spin}deg`);
                el.style.setProperty('--spin-other', `${spin * -0.1}deg`);
            });
            applyAnimationClass(elements, "quads-animation");
    break;
        // Weitere Fälle für andere SVG-Dateien
        default:
            console.warn(`Keine Animation für ${svgFile} definiert.`);
    }
}

// Funktion zum Hinzufügen der CSS-Klasse für die Animation
function applyAnimationClass(elements, animationClass) {
    elements.forEach(element => {
        element.classList.add(animationClass);
    });
}