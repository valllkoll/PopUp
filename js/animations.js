document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".container");

    containers.forEach(container => {
        const svgFile = container.getAttribute("data-svg");
        if (svgFile) {
            fetch(`svg/${svgFile}`)
                .then(response => response.text())
                .then(svgContent => {
                    container.innerHTML = svgContent;

                    // Animation hinzufügen (Beispiel: Rotation)
                    const svgElement = container.querySelector("svg");
                    if (svgElement) {
                        svgElement.style.animation = "rotate 5s infinite linear";
                    }
                })
                .catch(error => console.error(`Error loading SVG: ${svgFile}`, error));
        }
    });
});

// Beispiel-CSS-Animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
`;
document.head.appendChild(style);