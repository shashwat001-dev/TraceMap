async function loadAnalytics() {

    const selectedPage =
        localStorage.getItem(
            "selectedPage"
        );

    const response =
        await fetch(
            selectedPage
                ? `http://localhost:5000/analytics?page=${encodeURIComponent(selectedPage)}`
                : "http://localhost:5000/analytics"
        );

    const data =
        await response.json();

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

    document.getElementById(
        "sessions"
    ).textContent =
        data.totalSessions;

    document.getElementById(
        "events"
    ).textContent =
        data.totalEvents;

    document.getElementById(
        "clicks"
    ).textContent =
        data.totalClicks;

    document.getElementById(
        "deadClicks"
    ).textContent =
        data.totalDeadClicks;

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

    document.getElementById(
        "rageClicks"
    ).textContent =
        data.rageClickCount;

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

        if (insight.includes("frustration")) {

            li.innerHTML =
                "🔴 " + insight;

        }

        else if (
            insight.includes("non-functional")
        ) {

            li.innerHTML =
                "🟡 " + insight;

        }

        else {

            li.innerHTML =
                "🟢 " + insight;

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