function animateValue(
    elementId,
    target
) {

    const element =
        document.getElementById(
            elementId
        );

    let current = 0;

    const increment =
        Math.max(
            1,
            Math.ceil(target / 50)
        );

    const timer =
        setInterval(() => {

            current += increment;

            if (
                current >= target
            ) {

                current = target;

                clearInterval(
                    timer
                );

            }

            if (elementId === "completionRate") {

                element.textContent =
                    current + "%";

            }

            else {

                element.textContent =
                    current.toLocaleString();

            }

        }, 20);

}

async function loadAnalytics() {

    const selectedPage =
        localStorage.getItem(
            "selectedPage"
        );

    const selectedRange =
        localStorage.getItem(
            "selectedRange"
        ) || "all";

    document.getElementById(
        "rangeSelector"
    ).value =
        selectedRange;

    const response =
        await fetch(
            selectedPage
                ? `http://localhost:5000/analytics?page=${encodeURIComponent(selectedPage)}&range=${selectedRange}`
                : `http://localhost:5000/analytics?range=${selectedRange}`
        );

    const data =
        await response.json();

    console.log(
        "Rage Trend:",
        data.rageTrend
    );

    console.log(
        "Dead Click Trend:",
        data.deadClickTrend
    );

    const pageSelector =
        document.getElementById(
            "pageSelector"
        );

    data.pages.forEach(page => {

        const option =
            document.createElement(
                "option"
            );

        option.value = page;

        option.textContent = page;

        pageSelector.appendChild(
            option
        );

    });

    const savedPage =
        localStorage.getItem(
            "selectedPage"
        );

    if (savedPage) {

        pageSelector.value =
            savedPage;

    }

    animateValue(
        "sessions",
        data.totalSessions
    );

    animateValue(
        "events",
        data.totalEvents
    );

    animateValue(
        "clicks",
        data.totalClicks
    );

    animateValue(
        "deadClicks",
        data.totalDeadClicks
    );

    const deadBadge =
        document.getElementById(
            "deadBadge"
        );

    if (data.totalDeadClicks < 10) {

        deadBadge.textContent =
            "🟢 Healthy";

        deadBadge.className =
            "badge good";

    }

    else if (data.totalDeadClicks < 50) {

        deadBadge.textContent =
            "🟡 Moderate";

        deadBadge.className =
            "badge warning";

    }

    else {

        deadBadge.textContent =
            "🔴 High";

        deadBadge.className =
            "badge danger";

    }

    const totalSeconds =
        Math.floor(
            data.averageDuration / 1000
        );

    const hours =
        Math.floor(
            totalSeconds / 3600
        );

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    document.getElementById(
        "duration"
    ).textContent =
        `${hours}h ${minutes}m`;

    document.getElementById(
        "scrollDepth"
    ).textContent =
        Math.floor(
            data.maxScrollDepth
        ) + "px";

    const scrollBadge =
        document.getElementById(
            "scrollBadge"
        );

    if (data.maxScrollDepth < 500) {

        scrollBadge.textContent =
            "🔴 Low Engagement";

        scrollBadge.className =
            "badge danger";

    }

    else if (data.maxScrollDepth < 1000) {

        scrollBadge.textContent =
            "🟡 Moderate";

        scrollBadge.className =
            "badge warning";

    }

    else {

        scrollBadge.textContent =
            "🟢 Strong Engagement";

        scrollBadge.className =
            "badge good";

    }

    animateValue(
        "rageClicks",
        data.rageClickCount
    );



    // EVENT DISTRIBUTION

    const maxValue = Math.max(
        data.totalClicks,
        data.totalMouseMoves,
        data.totalScrolls,
        data.rageClickCount,
        data.totalDeadClicks
    );

    const clickWidth =
        (data.totalClicks /
            maxValue) * 100;

    const mouseWidth =
        (data.totalMouseMoves /
            maxValue) * 100;

    const scrollWidth =
        (data.totalScrolls /
            maxValue) * 100;

    const rageWidth =
        (data.rageClickCount /
            maxValue) * 100;

    const deadWidth =
        (data.totalDeadClicks /
            maxValue) * 100;

    document
        .getElementById(
            "clickBar"
        )
        .style.width =
        clickWidth + "%";

    document
        .getElementById(
            "mouseBar"
        )
        .style.width =
        mouseWidth + "%";

    document
        .getElementById(
            "scrollBar"
        )
        .style.width =
        scrollWidth + "%";

    document
        .getElementById(
            "rageBar"
        )
        .style.width =
        rageWidth + "%";

    document
        .getElementById(
            "deadBar"
        )
        .style.width =
        deadWidth + "%";

    animateCounter(
        "clickCount",
        data.totalClicks
    );

    animateCounter(
        "mouseCount",
        data.totalMouseMoves
    );

    animateCounter(
        "scrollCount",
        data.totalScrolls
    );

    animateCounter(
        "rageCount",
        data.rageClickCount
    );

    animateCounter(
        "deadCount",
        data.totalDeadClicks
    );

    function animateCounter(
        elementId,
        target
    ) {

        const element =
            document.getElementById(
                elementId
            );

        let current = 0;

        const increment =
            Math.ceil(
                target / 50
            );

        const timer =
            setInterval(() => {

                current += increment;

                if (
                    current >= target
                ) {

                    current = target;

                    clearInterval(
                        timer
                    );

                }

                element.textContent =
                    current.toLocaleString();

            }, 20);

    }



    document.getElementById(
        "eventSubtitle"
    ).textContent =
        `Total Events: ${data.totalEvents.toLocaleString()}`;

    animateValue(
        "formStarts",
        data.totalFormStarts
    );

    animateValue(
        "formSubmits",
        data.totalFormSubmits
    );

    animateValue(
        "completionRate",
        data.formCompletionRate
    );


    document.getElementById(
        "avgFormTime"
    ).textContent =
        (
            data.averageFormCompletionTime / 1000
        ).toFixed(1) + "s";



    // FORM STARTS BADGE

    const formStartBadge =
        document.getElementById(
            "formStartBadge"
        );

    if (data.totalFormStarts < 5) {

        formStartBadge.textContent =
            "🟡 Low Data";

        formStartBadge.className =
            "badge warning";

    } else {

        formStartBadge.textContent =
            "🟢 Active";

        formStartBadge.className =
            "badge good";

    }



    // FORM SUBMITS BADGE

    const formSubmitBadge =
        document.getElementById(
            "formSubmitBadge"
        );

    if (data.totalFormSubmits < 5) {

        formSubmitBadge.textContent =
            "🟡 Low Data";

        formSubmitBadge.className =
            "badge warning";

    } else {

        formSubmitBadge.textContent =
            "🟢 Active";

        formSubmitBadge.className =
            "badge good";

    }



    // COMPLETION RATE BADGE

    const completionBadge =
        document.getElementById(
            "completionBadge"
        );

    if (data.formCompletionRate < 40) {

        completionBadge.textContent =
            "🔴 Poor";

        completionBadge.className =
            "badge danger";

    } else if (
        data.formCompletionRate < 70
    ) {

        completionBadge.textContent =
            "🟡 Average";

        completionBadge.className =
            "badge warning";

    } else {

        completionBadge.textContent =
            "🟢 Strong";

        completionBadge.className =
            "badge good";

    }



    // FORM TIME BADGE

    const formTimeBadge =
        document.getElementById(
            "formTimeBadge"
        );

    const avgSeconds =
        data.averageFormCompletionTime / 1000;

    if (avgSeconds < 15) {

        formTimeBadge.textContent =
            "🟢 Quick";

        formTimeBadge.className =
            "badge good";

    } else if (
        avgSeconds < 45
    ) {

        formTimeBadge.textContent =
            "🟡 Moderate";

        formTimeBadge.className =
            "badge warning";

    } else {

        formTimeBadge.textContent =
            "🔴 Slow";

        formTimeBadge.className =
            "badge danger";

    }




    const rageBadge =
        document.getElementById(
            "rageBadge"
        );

    if (data.rageClickCount < 20) {

        rageBadge.textContent =
            "🟢 Healthy";

        rageBadge.className =
            "badge good";

    }

    else if (data.rageClickCount < 100) {

        rageBadge.textContent =
            "🟡 Moderate";

        rageBadge.className =
            "badge warning";

    }

    else {

        rageBadge.textContent =
            "🔴 High";

        rageBadge.className =
            "badge danger";

    }

    const rageTrend =
        document.getElementById(
            "rageTrend"
        );

    if (data.rageTrend > 0) {

        rageTrend.textContent =
            `↑ ${data.rageTrend}% vs Last 24 hrs`;

        rageTrend.className =
            "trend trend-bad";

    }

    else if (data.rageTrend < 0) {

        rageTrend.textContent =
            `↓ ${Math.abs(data.rageTrend)}% vs Last 24 hrs`;

        rageTrend.className =
            "trend trend-good";

    }

    else {

        rageTrend.textContent =
            "→ 0% vs Last 24 hrs";

        rageTrend.className =
            "trend trend-neutral";

    }

    const deadTrend =
        document.getElementById(
            "deadTrend"
        );

    if (data.deadClickTrend > 0) {

        deadTrend.textContent =
            `↑ ${data.deadClickTrend}% vs Last 24 hrs`;

        deadTrend.className =
            "trend trend-bad";

    }

    else if (data.deadClickTrend < 0) {

        deadTrend.textContent =
            `↓ ${Math.abs(data.deadClickTrend)}% vs Last 24 hrs`;

        deadTrend.className =
            "trend trend-good";

    }

    else {

        deadTrend.textContent =
            "→ 0% vs Last 24 hrs";

        deadTrend.className =
            "trend trend-neutral";

    }

    const insightsList =
        document.getElementById(
            "insightsList"
        );

    insightsList.innerHTML = "";

    data.insights.forEach(insight => {

        const li =
            document.createElement("li");

        // li.textContent =
        //     insight;

        if (
            insight.type === "critical"
        ) {

            li.innerHTML =
                "🔴 " +
                (insight.text || insight);

        }

        else if (
            insight.type === "warning"
        ) {

            li.innerHTML =
                "🟡 " +
                (insight.text || insight);

        }

        else if (
            insight.type === "positive"
        ) {

            li.innerHTML =
                "🟢 " +
                (insight.text || insight);
        }

        else {

            li.innerHTML =
                "🔵 " +
                (insight.text || insight);

        }

        insightsList.appendChild(li);

    });

}

loadAnalytics();

document
    .getElementById("sessionsBtn")
    .addEventListener("click", () => {

        window.location.href = "../sessions.html";

    });

document
    .getElementById("pageSelector")
    .addEventListener("change", (e) => {

        localStorage.setItem(
            "selectedPage",
            e.target.value
        );

        location.reload();

    });

document
    .getElementById("rangeSelector")
    .addEventListener("change", (e) => {

        localStorage.setItem(
            "selectedRange",
            e.target.value
        );

        location.reload();

    });



document
    .getElementById("openPageBtn")
    .addEventListener("click", () => {

        const selectedPage =
            document.getElementById(
                "pageSelector"
            ).value;

        if (!selectedPage) return;

        window.open(
            selectedPage,
            "_blank"
        );

    });

const themeToggle =
    document.getElementById(
        "themeToggle"
    );

const savedTheme =
    localStorage.getItem(
        "dashboardTheme"
    );

if (savedTheme === "light") {

    document.body.classList.add(
        "light-mode"
    );

}

themeToggle.textContent =
    document.body.classList.contains(
        "light-mode"
    )
        ? "🌙 Dark Mode"
        : "☀️ Light Mode";


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light-mode"
        );

        const isLight =
            document.body.classList.contains(
                "light-mode"
            );

        localStorage.setItem(
            "dashboardTheme",
            isLight
                ? "light"
                : "dark"
        );

        themeToggle.textContent =
            isLight
                ? "🌙 Dark Mode"
                : "☀️ Light Mode";

    }
);