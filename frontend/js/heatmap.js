async function loadEvents() {
    try {
        const sessionId = localStorage.getItem("tracemap_session");

        const response = await fetch(
            `http://localhost:5000/heatmap/${sessionId}`
        );

        const events = await response.json();

        events.forEach((event) => {

            const dot = document.createElement("div");

            dot.style.position = "absolute";
            dot.style.borderRadius = "50%";
            dot.style.pointerEvents = "none";
            dot.style.transform = "translate(-50%, -50%)";
            dot.style.zIndex = "9999";

            // CLICKS
            if (event.eventType === "click") {

                dot.style.left = event.x + "px";
                dot.style.top = event.y + window.scrollY + "px";

                dot.style.width = "50px";
                dot.style.height = "50px";

                dot.style.background = "rgba(255,0,0,0.3)";
                dot.style.filter = "blur(15px)";

            }

            // MOUSE MOVEMENT
            else if (event.eventType === "mousemove") {

                dot.style.left = event.x + "px";
                dot.style.top = event.y + window.scrollY + "px";

                dot.style.width = "30px";
                dot.style.height = "30px";

                dot.style.background = "rgba(0,0,255,0.4)";
                dot.style.filter = "blur(8px)";

            }

            // SCROLL EVENTS
            else if (event.eventType === "scroll") {

                if (!event.scrollY) return;

                dot.style.left = "50%";
                dot.style.top = event.scrollY + "px";

                dot.style.width = "100px";
                dot.style.height = "100px";

                dot.style.background = "rgba(0,255,0,0.4)";
                dot.style.filter = "blur(20px)";

            }

            else {
                return;
            }

            document.body.appendChild(dot);

        });
    } catch (error) {
        console.log(error);
    }
}

loadEvents();