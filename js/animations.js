document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".container");

    containers.forEach(container => {
        const svgFile = container.getAttribute("data-svg");

        if (svgFile) {
            fetch(`SVG/${svgFile}`)
                .then(response => response.text())
                .then(svgContent => {
                    container.innerHTML = svgContent;

                    const svgElement = container.querySelector("#svg-grid");
                    const elements = Array.from(svgElement.children); // Alle SVG-Elemente sammeln

                    // Füge jedem Element eine individuelle Verzögerung hinzu
                    elements.forEach((element, index) => {
                        element.style.setProperty("--index", index); // Dynamische Verzögerung
                        console.log(elements); // Überprüfe, ob die `<path>`-Elemente korrekt gesammelt werden
                    });

                    // Animation basierend auf dem Bild starten
                    executeAnimation(svgFile, elements);
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
        case "pow.svg":
            applyAnimationClass(elements, "pow-animation");
            break;
        case "ucom.svg":
            applyAnimationClass(elements, "ucom-animation");
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