gsap.registerPlugin(ScrollTrigger);

var main = document.querySelector('body')
var crsr = document.querySelector('#cursor')

main.addEventListener("mousemove", (dets) => {
    crsr.style.left = dets.x + "px";
    crsr.style.top = dets.y + "px";
})

// Show custom cursor only on hero title + button; hide on navbar
// NOTE: SplitType wraps the text in spans, and `mouseenter` doesn't bubble,
// so we bind to the wrapper to make hover reliable.
const heroTitle = document.querySelector('.content .text-wrap') || document.querySelector('.content h1');
const heroButton = document.querySelector('.content button');
const navbar = document.querySelector('#navbar');

// function showCursor() {
//     if (crsr) crsr.style.opacity = 1;
// }

// function hideCursor() {
//     if (crsr) crsr.style.opacity = 0;
// }

// [heroTitle, heroButton].forEach((el) => {
//     if (!el) return;
//     el.addEventListener('mouseenter', showCursor);
//     el.addEventListener('mouseleave', hideCursor);
// });

// if (navbar) {
//     navbar.addEventListener('mouseenter', hideCursor);
// }

var arr = [
    {
        dp: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMHRvcCUyMHZpZXd8ZW58MHx8MHx8fDA%3D",
        story: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMHRvcCUyMHZpZXd8ZW58MHx8MHx8fDA%3D"
    },

    {
        dp: "https://images.unsplash.com/photo-1777994505589-75c2028c80fa?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        story: "https://images.unsplash.com/photo-1777994505589-75c2028c80fa?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        dp: "https://images.unsplash.com/photo-1777994505580-33478f04fa4a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        story: "https://images.unsplash.com/photo-1777994505580-33478f04fa4a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        dp: "https://images.unsplash.com/photo-1686909143445-ecd2595e554b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        story: "https://images.unsplash.com/photo-1686909143445-ecd2595e554b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
]

var storiyan = document.querySelector(".storiyan")
var bot = document.querySelector('.bottom')
var test = document.querySelector('.bottom button')
var card = document.querySelector('#card')
var save = document.querySelector("#card i")
card.style.transition = "height 0.3s ease";

var clutter = ""
arr.forEach((elem, idx) => {
    clutter += `<div id="story">
                    <img id="${idx}" src="${elem.dp}" alt="">
                </div>`
})


storiyan.innerHTML = clutter;

storiyan.addEventListener("click", (vets) => {
    var fullScreen = storiyan.parentElement.querySelector('.full-screen')
    fullScreen.style.display = "block"
    bot.style.display = "flex"
    card.style.height = "480px"
    fullScreen.style.backgroundImage = `url(${arr[vets.target.id].story})`
    setTimeout(() => {
        fullScreen.style.display = "none"
        bot.style.display = "none"
        card.style.height = "120px"
    }, 3000)
})

var flag = 0
test.addEventListener("click", (e) => {
    e.preventDefault();

    save.style.transform = "translate(-50%,-50%) scale(1)";
    save.style.opacity = 0.8;
    setTimeout(() => {
        save.style.opacity = 0;
    }, 1000)
    setTimeout(() => {
        save.style.transform = "translate(-50%,-50%) scale(0)";;
    }, 2000)

    if (flag == 0) {
        test.textContent = "saved"
        test.style.backgroundColor = "green"
        // test.style.border = "none"
        save.style.color = "green"
        flag = 1
    } else {
        test.textContent = "save to eatlist"
        test.style.backgroundColor = "cornflowerblue"
        // test.style.border = "1px solid white"
        save.style.color = "red"
        flag = 0
    }

});

test.addEventListener('selectstart', (e) => e.preventDefault());

gsap.to('.pack1', {
    scaleX: 1,
    // x: 200,
    opacity: 1,
    duration: 2,
    // stagger: 1,
    scrollTrigger: {
        trigger: '.pack1',
        scroller: 'body',
        // markers: true,
        start: 'top 60%',
        end: 'top 25%',
        scrub: 2

    }
})

// gsap.from('.pack2' , {
//     x: -150,
//     scaleX: 1.5,
//     opacity: 1,
//     duration: 4,
//     stagger: 1,
//     scrollTrigger: {
//         trigger: '.pack2',
//         scroller: 'body',
//         // markers: true,
//         start: 'top 20%',
//         end: 'top 20%',
//         scrub: 2

//     }
// })

gsap.to('.pack2', {
    x: -100,
    scaleX: 1.1,
    duration: 2,
    scrollTrigger: {
        trigger: '.pack2',
        start: 'top 60%',
        end: 'top 50%',
        scrub: 2
    }
})

// gsap.to('.pack2', {
//     opacity: 0,
//     scrollTrigger: {
//         trigger: '.pack2',
//         start: 'top 20%',
//         end: 'top 20%',
//         scrub: 2
//     }
// })

gsap.to('.pack3', {
    x: -330,
    scaleX: 1.1,
    duration: 2,
    scrollTrigger: {
        trigger: '.pack3',
        start: 'top 60%',
        end: 'top 50%',
        // markers: true,
        scrub: 2
    }
})

gsap.to("#card", {
    y: -80,
    opacity: 1,
    duration: 2,
    scrollTrigger: {
        trigger: '#card',
        start: 'top 60%',
        end: 'top 50%',
        // markers: true,
        scrub: 2
    }
})



function addShuffleOnHoverText(el, options = {}) {
    const letters = options.letters ?? "abcdefghijklmnopqrstuvwxyz";
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

// Apply to the whole NAVBAR (all <li> items)
document.querySelectorAll('#navbar li').forEach((li) => {
    addShuffleOnHoverText(li);
});

// gsap.to('.pack3', {
//     opacity: 0,
//     scrollTrigger: {
//         trigger: '.pack3',
//         start: 'top 20%',
//         end: 'top 20%',
//         scrub: 2
//     }
// })


const firstText = new SplitType(".first", {
    types: "chars"
});

const secondText = new SplitType(".second", {
    types: "chars"
});




gsap.set(secondText.chars, {
    yPercent: 120
});

gsap.set(".second", {
    clipPath: "inset(100% 0 0 0)"
});




const tl = gsap.timeline({
    paused: true
});




tl.to(firstText.chars, {

    yPercent: -120,

    stagger: 0.04,

    duration: 0.8,

    ease: "power4.inOut"

}, 0);




tl.to(".second", {

    clipPath: "inset(0% 0 0 0)",

    duration: 0.9,

    ease: "power4.inOut"

}, 0);




tl.to(secondText.chars, {

    yPercent: 0,

    stagger: 0.04,

    duration: 0.8,

    ease: "power4.inOut"

}, 0);


if (heroTitle) {
    heroTitle.addEventListener("mouseenter", () => {
        tl.play();
    });

    heroTitle.addEventListener("mouseleave", () => {
        tl.reverse();
    });
}


var newArr = [
    {
        item: "./assets/Jajangmyeon (Korean Black Bean Noodles) (1).jpg",
        info: {
            title: "Our Signature Dish",
            name: "jja-jang-myeon",
            desc: "A very Savory Dish known as Korean Black Bean Noodles",
        }
    },

    {
        item: "./assets/Spicy Kimchi Jjigae (Korean Kimchi Stew) 🍲🇰🇷.jpg",
        info: {
            title: "Our Signature Dish",
            name: "kim-chi Ji-gae",
            desc: "Another Warm Meal with a Stew to Enjoy",
        }
    },

    {

        item: "./assets/Japchae Is the Ultimate Korean Stir-Fried Noodle Dish.jpg",
        info: {
            title: "Our Signature Dish",
            name: "jap-chae",
            desc: "A very well known Dish called Korean Glass Noodles",
        }
    },

    {
        item: "./assets/Ramyeon Ramen Noodles Foods Recette numérique, recettes de cuisine simples.jpg",
        info: {
            title: "Our Signature Dish",
            name: "ram-yeon",
            desc: "The most popular late night Dish in Hanseong",
        }
    },
]

var dishTub = document.querySelector("#dish-tub")
// var dish = document.querySelector(".dish")
var title = document.querySelector(".descrypt h1")
var name = document.querySelector(".descrypt h3")
var desc = document.querySelector(".descrypt h4")

var clutter2 = ""

newArr.forEach((elem, idx) => {

    clutter2 += `

    <div class="dish-pocket dish">
        <img id="${idx}" src="${elem.item}" alt="">
    </div>

    `
})

dishTub.innerHTML = clutter2

var h3 = document.querySelector(".descrypt h3")
var h1 = document.querySelector(".descrypt h1")
var h4 = document.querySelector(".descrypt h4")

var allDish = dishTub.querySelectorAll(".dish")
var stackOrder = Array.from({ length: allDish.length }, (_, i) => i)

// Make dish 0 start on top (last item in the order is top)
if (stackOrder.length > 0) {
    stackOrder = stackOrder.filter((i) => i !== 0).concat(0)
}

function getDishDataIndex(dishEl) {
    var img = dishEl?.querySelector("img")
    var idx = Number(img?.id)
    return Number.isNaN(idx) ? null : idx
}

function renderDescryptForTopDish() {
    if (!stackOrder.length) return

    var topDishEl = allDish[stackOrder[stackOrder.length - 1]]
    var dataIdx = getDishDataIndex(topDishEl)
    if (dataIdx === null || !newArr[dataIdx]) return

    h3.innerHTML = newArr[dataIdx].info.title
    h1.innerHTML = newArr[dataIdx].info.name
    h4.innerHTML = newArr[dataIdx].info.desc
}

function applyStackOrder() {
    stackOrder.forEach((dishIndex, position) => {
        var dishEl = allDish[dishIndex]
        dishEl.style.zIndex = position + 1

        // Only the top card should be clickable
        dishEl.style.pointerEvents = (position === stackOrder.length - 1) ? "auto" : "none"
    })
}

applyStackOrder()
renderDescryptForTopDish()

// Click on the TOP image only: bring the one below to top, and send the old top to back.
dishTub.addEventListener("click", () => {
    if (stackOrder.length < 2) return

    // Move current top to the very back
    stackOrder.unshift(stackOrder.pop())
    applyStackOrder()
    renderDescryptForTopDish()
})

gsap.to(".marque", {
    x: -1200,
    opacity: 1,
    duration: 2,
    scrollTrigger: {
        trigger: '.marque',
        start: 'top 30%',
        end: 'top 80%',
        // markers: true,
        pin: true,
        pinSpacing: false,
        scrub: 2
    }
})

var t2 = gsap.timeline()

t2.from("#navbar .nav-center li", {
    y: 400,
    duration: 1,
    stagger: 0.1,
    delay: 0
})

t2.from(".content h1, button", {
    y: 400,
    opacity: -0.5,
    duration: 1,
    delay: 0,
    //   rotate: 45,
    stagger: 0.2,
    //   repeat: -1
})










// var con = document.querySelector("#top-section");
// var crsr = document.querySelector(".content #cursor");

// con.addEventListener("mousemove", (e) => {
//     var rect = con.getBoundingClientRect();
//     crsr.style.left = (e.clientX - rect.left) + "px";
//     crsr.style.top = (e.clientY - rect.top) + "px";
// });