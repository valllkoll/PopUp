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
                const spin = (200 * i / (count - i));
                el.style.setProperty('--spin-end', `${spin}deg`);
                el.style.setProperty('--spin-other', `${spin * -0.1}deg`);
            });
            applyAnimationClass(elements, "quads-animation");
            break;
        case "karte.svg":
            applyAnimationClass(elements, "karte-animation");
            break;
        case "auge.svg":
            // Nach dem Laden der SVG:
            const path = document.querySelector('path.eyeLid');
            if (path) animateEyeClose(path);
            break;
        case "berge.svg":
            applyAnimationClass(elements, "berge-animation");
            break;
        case "blume.svg":
            applyAnimationClass(elements, "blume-animation");
            break;
        case "brueder.svg":
            applyAnimationClass(elements, "brueder-animation");
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


// Augen Animation
function animateEyeClose(pathElement) {
    let t = 0;
    const waitFrames = 120; 
    let frame = 0;
    let animating = false;

    function animate() {
        if (!animating) {
            frame++;
            if (frame < waitFrames) {
                // Ausgangsform (offen) beibehalten
                requestAnimationFrame(animate);
                return;
            } else {
                animating = true;
                t = 0; // Animation starten
            }
        }

        // Sinus-Animation einmal durchlaufen (0 bis PI)
        const duration = 2*Math.PI; 
        const progress = (Math.sin(t-Math.PI/2) + 1) / 2;
        const cx = 404.99, cy = 404.99;
        const top = lerp(197.589844, cy, progress);
        const bottom = lerp(612.394531, cy, progress);

        const d = `
            M 0 404.992188 L 0 810 L 810 810 L 810 400 L 780.335938 404.992188 
            C 572.933594 ${bottom} 236.695312 ${bottom} 29.320312 404.992188 
            C 236.71875 ${top} 572.960938 ${top} 780.335938 404.992188 Z 
            M 780.335938 404.992188 L 810 450 L 810 0 L 0 0 L 0 404.992188 
        `;
        pathElement.setAttribute("d", d);

        if (t < duration) {
            t += 0.1;
            
        } else {
            frame = 0; 
            animating = false;
        }
        // sonst bleibt das Auge im Endzustand stehen
        requestAnimationFrame(animate);
    }
    animate();

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }
}


