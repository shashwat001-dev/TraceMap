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





