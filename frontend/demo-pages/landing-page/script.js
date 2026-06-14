var i = 0;
function expand() {
    const toggle = document.getElementById("toggle");
    const sideA = document.querySelector(".sideA");
    const buttons = sideA.querySelectorAll("button");

    if (i == 0) {
        document.getElementById("menu").style.transform = "scale(3)";
        document.getElementById("plus").style.transform = "rotate(137deg)";
        toggle.classList.add("active");
        buttons.forEach((btn, index) => {
            setTimeout(() => {
                btn.classList.add("hidden");
            }, index * 75);
        });
        i = 1;
    }
    else {
        document.getElementById("menu").style.transform = "scale(0)";
        document.getElementById("plus").style.transform = "rotate(0deg)";
        toggle.classList.remove("active");
        buttons.forEach((btn, index) => {
            setTimeout(() => {
                btn.classList.remove("hidden");
            }, index * 75);
        });
        i = 0;
    }
}

var tl = gsap.timeline({
    onComplete: function () {
        gsap.set('.navbar #left img, .navbar #left h4, .navbar #right>button, .navbar #right i', {
            clearProps: "transform"
        })
    }
})

tl.from('.navbar #left>h4, #left>img', {
    y: 0,
    opacity: 0,
    duration: 0.5,
    delay: 1,
    stagger: 0.1

})

tl.from('.navbar #right>button, #right>i', {
    y: -1,
    opacity: 0,
    duration: 1,
    stagger: 0.1

})

tl.from('.contents #c1>p, .text-changer', {
    x: -50,
    opacity: 0,
    duration: 1,
    stagger: 1
})

tl.from('.contents #c2', {
    x: -50,
    opacity: 0,
    duration: 1
})

gsap.from('.sideB .sub>h4 , .sub>p', {
    y: -50,
    opacity: 0,
    duration: 2,
    stagger: 1,
    scrollTrigger: {
        trigger: '.sideB .sub>h4 , .sub>p',
        scroller: 'body',
        // markers: true,
        start: 'top 20%',
        end: 'top 20%',
        scrub: 2

    }
})

gsap.from('.sideB .wrapper', {
    x: 50,
    opacity: 0,
    duration: 5,
    scrollTrigger: {
        trigger: '.sideB .wrapper',
        scroller: 'body',
        // markers: true,
        start: 'top 15%',
        end: 'top 20%',
        scrub: 2

    }
})

let form = document.querySelector("#userform")
let card = document.querySelector(".card")
let loader = document.querySelector(".loading")
let load = document.querySelector(".loading h1")

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const completionTime =
        Date.now() -
        Number(
            sessionStorage.getItem("formStartTime")
        );

    console.log(
        "Completion Time:",
        completionTime
    );

    fetch("http://localhost:5000/track", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sessionId: localStorage.getItem("tracemap_session"),
            eventType: "formsubmit",
            page: window.location.pathname,
            completionTime: completionTime,
            timestamp: Date.now()
        })
    })
        .then(res => res.json())
        .then(data => console.log("FORM SUBMIT SENT", data))
        .catch(err => console.log(err));



    let drone = {
        name: document.querySelector("#name").value,
        model: document.querySelector("#model").value,
        range: document.querySelector("#range").value,
        mission: document.querySelector("#mission").value,
        status: document.querySelector("#status").value
    };

    console.log(drone)

    if (drone.model === "Rescue Drone") {
        drone.image = "https://images.unsplash.com/photo-1720071702672-d18c69cb475c?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        if (drone.range === "200") {
            drone.price = "$25,000/-"
        } else if (drone.range === "150") {
            drone.price = "$20,000/-"
        } else if (drone.range === "100") {
            drone.price = "$15,000/-"
        } else if (drone.range === "50") {
            drone.price = "$10,000/-"
        }

    }

    else if (drone.model === "Scout X2") {
        drone.image = "https://plus.unsplash.com/premium_photo-1714618849685-89cad85746b1?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        if (drone.range === "200") {
            drone.price = "$25,000/-"
        } else if (drone.range === "150") {
            drone.price = "$20,000/-"
        } else if (drone.range === "100") {
            drone.price = "$15,000/-"
        } else if (drone.range === "50") {
            drone.price = "$10,000/-"
        }

    }

    else if (drone.model === "Cargo X5") {
        drone.image = "https://plus.unsplash.com/premium_photo-1757913837786-f4d345aacff0?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        if (drone.range === "200") {
            drone.price = "$25,000/-"
        } else if (drone.range === "150") {
            drone.price = "$20,000/-"
        } else if (drone.range === "100") {
            drone.price = "$15,000/-"
        } else if (drone.range === "50") {
            drone.price = "$10,000/-"
        }

    }

    else if (drone.model === "Survey Pro") {
        drone.image = "https://images.unsplash.com/photo-1514598800938-f7125ea1aa1c?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        if (drone.range === "200") {
            drone.price = "$25,000/-"
        } else if (drone.range === "150") {
            drone.price = "$20,000/-"
        } else if (drone.range === "100") {
            drone.price = "$15,000/-"
        } else if (drone.range === "50") {
            drone.price = "$10,000/-"
        }

    }


    card.innerHTML =
        `   <img src = "${drone.image}">
            <h1>${drone.name}</h1>
            <p>${drone.model}</p>
            <p>Range:${drone.range}KM</p>
            <p>${drone.mission}</p>
            <p>Status:${drone.status}
              ${drone.status === "Active"
            ? "<span style='background:limegreen'></span>" : drone.status === "Maintenance"
                ? "<span style='background:yellow'></span>" : drone.status === "Offline"
                    ? "<span style='background:red'></span>" : ""}</p>
            <p>Price:${drone.price}</p>
            <button onclick='deleteDrone()'>Reset</button>
            <button>Proceed to pay</button>
            `

    form.reset()

    form.style.display = "none"
    loader.style.display = "flex"


    let count = 0

    let interval = setInterval(() => {
        count++
        load.textContent = `${count}%`
    }, 25)

    setTimeout(() => {

        clearInterval(interval)

        loader.style.display = "none"
        card.style.display = "flex"

    }, 2500)


})

function deleteDrone() {
    card.innerHTML = ""
    card.style.display = "none"
    form.style.display = "flex"
}

gsap.from('.card-generator',
    {
        y: 100,
        opacity: 0,
        duration: 5,
        scrollTrigger: {
            trigger: '.card-generator',
            scroller: 'body',
            // markers: true,
            start: 'top 50%',
            end: 'top 20%',
            scrub: 2

        }
    })

gsap.from('.logistics h1, .logistics p',
    {
        x: 50,
        opacity: 0,
        duration: 5,
        stagger: 2,
        scrollTrigger: {
            trigger: '.logistics',
            scroller: 'body',
            // markers: true,
            start: 'top 50%',
            end: 'top 20%',
            scrub: 2

        }
    })


gsap.from('.logistics2 h1, .logistics2 p',
    {
        x: -50,
        opacity: 0,
        duration: 5,
        stagger: 2,
        scrollTrigger: {
            trigger: '.logistics2',
            scroller: 'body',
            // markers: true,
            start: 'top 50%',
            end: 'top 20%',
            scrub: 2

        }
    })

var elem = document.querySelectorAll(".elem")

elem.forEach((val) => {

    const image = val.querySelector("img")

    val.addEventListener("mouseenter", () => {
        image.style.opacity = 1
    })
    val.addEventListener("mouseleave", () => {
        image.style.opacity = 0
    })
    val.addEventListener("mousemove", (dets) => {
        const rect = val.getBoundingClientRect()
        image.style.left = `${dets.clientX - rect.left}px`
        image.style.top = `${dets.clientY - rect.top}px`
    })
})

function addShuffleOnHoverText(el, options = {}) {
    const letters = options.letters ?? "!@#$%^&*()_+-=[]{}<>?/|";
    const tickMs = options.tickMs ?? 30;

    const original = (el.textContent ?? "").toString();
    if (!original.trim()) return;

    let intervalId = null;

    function randomChar() {
        return letters[Math.floor(Math.random() * letters.length)];
    }

    function shuffledVersion(text) {
        return text
            .split("")
            .map((ch) => (ch === " " ? " " : randomChar()))
            .join("");
    }

    el.addEventListener("mouseenter", () => {
        clearInterval(intervalId);
        intervalId = setInterval(() => {
            el.textContent = shuffledVersion(original);
        }, tickMs);
    });

    el.addEventListener("mouseleave", () => {
        clearInterval(intervalId);
        intervalId = null;
        el.textContent = original;
    });
}


const strings = [
    "0123456789",
    "@#$%^&*()!",
    "0123456789",
    "@#$%^&*()!"
];

document.querySelectorAll('.elem h1').forEach((h1, index) => {
    addShuffleOnHoverText(h1, {
        letters: strings[index]
    });
});

const paraString = [
    "⍜⌇⋔⌰⟟☌⊑⌿⍀☊⋏⟒⎍⏃⏁⍀⋔⎎⌖◉☍⌬⌭⌮⌯⌰",
    "⍜⌇⋔⌰⟟☌⊑⌿⍀☊⋏⟒⎍⏃⏁⍀⋔⎎⌖◉☍⌬⌭⌮⌯⌰",
    "⍜⌇⋔⌰⟟☌⊑⌿⍀☊⋏⟒⎍⏃⏁⍀⋔⎎⌖◉☍⌬⌭⌮⌯⌰",
    "⍜⌇⋔⌰⟟☌⊑⌿⍀☊⋏⟒⎍⏃⏁⍀⋔⎎⌖◉☍⌬⌭⌮⌯⌰"
];

document.querySelectorAll('.logistics p').forEach((p, index) => {
    addShuffleOnHoverText(p, {
        letters: paraString[index]
    });
});

document.querySelectorAll('.logistics2 p').forEach((p, index) => {
    addShuffleOnHoverText(p, {
        letters: paraString[index]
    });
});
















