const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Event = require("./models/Event");
const multer = require("multer");
const path = require("path");

const Screenshot =
    require("./models/Screenshot");


const app = express();

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, "uploads/");

    },

    filename: function (req, file, cb) {

        cb(
            null,
            Date.now() + ".png"
        );

    }

});


const upload = multer({
    storage
});

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use(
    "/uploads",
    express.static("uploads")
);



mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/", (req, res) => {
    res.send("TraceMap Backend Running");
});

const PORT = process.env.PORT || 5000;

app.post("/track", async (req, res) => {

    console.log(req.body);

    try {
        const newEvent = new Event(req.body);

        await newEvent.save();

        res.status(201).json({
            message: "Event Saved",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Server Error",
        });
    }
});

app.get("/session/:sessionId", async (req, res) => {

    try {

        const sessionId = req.params.sessionId;

        const events = await Event.find({
            sessionId: sessionId
        }).sort({ timestamp: 1 });

        res.json(events);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Failed to fetch session"
        });
    }

});

app.get("/heatmap/:sessionId", async (req, res) => {

    try {

        const events = await Event.find({
            sessionId: req.params.sessionId
        });

        res.json(events);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Failed to fetch heatmap data"
        });

    }

});

app.get("/rage-clicks/:sessionId", async (req, res) => {

    try {

        const clicks = await Event.find({
            sessionId: req.params.sessionId,
            eventType: "click"
        }).sort({ timestamp: 1 });

        const rageClicks = [];

        for (let i = 2; i < clicks.length; i++) {

            const c1 = clicks[i - 2];
            const c2 = clicks[i - 1];
            const c3 = clicks[i];

            const timeDiff =
                c3.timestamp - c1.timestamp;

            const distance1 =
                Math.hypot(
                    c2.x - c1.x,
                    c2.y - c1.y
                );

            const distance2 =
                Math.hypot(
                    c3.x - c2.x,
                    c3.y - c2.y
                );

            if (
                timeDiff <= 1000 &&
                distance1 <= 50 &&
                distance2 <= 50
            ) {

                rageClicks.push({
                    x: c3.x,
                    y: c3.y,
                    scrollY: c3.scrollY,
                    timestamp: c3.timestamp
                });

            }

        }

        res.json(rageClicks);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Failed to detect rage clicks"
        });

    }

});

app.get("/sessions", async (req, res) => {

    try {
        const selectedPage = req.query.page;

        const matchStage =
            selectedPage
                ? { page: selectedPage }
                : {};

        const sessions = await Event.aggregate([
            {
                $match: matchStage
            },
            {
                $group: {
                    _id: "$sessionId",
                    totalEvents: { $sum: 1 },
                    lastActivity: { $max: "$timestamp" }
                }
            },
            {
                $sort: {
                    lastActivity: -1
                }
            },
            {
                $limit: 10
            }
        ]);

        const pages =
            await Event.distinct("page");

        res.json({
            sessions,
            pages
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Failed to fetch sessions"
        });

    }

});

app.get("/analytics", async (req, res) => {

    try {

        const selectedPage =
            req.query.page;

        const range =
            req.query.range || "all";

        let previousFilter = {};

        const filter =
            selectedPage
                ? { page: selectedPage }
                : {};

        if (selectedPage) {

            previousFilter.page =
                selectedPage;

        }

        if (range !== "all") {

            const now = Date.now();

            let startTime;

            let previousStartTime;

            let previousEndTime;

            if (range === "today") {

                startTime =
                    now - (24 * 60 * 60 * 1000);

                previousStartTime =
                    now - (48 * 60 * 60 * 1000);

                previousEndTime =
                    startTime;

            }

            else if (range === "7d") {

                startTime =
                    now - (7 * 24 * 60 * 60 * 1000);

            }

            else if (range === "30d") {

                startTime =
                    now - (30 * 24 * 60 * 60 * 1000);

            }

            filter.timestamp = {
                $gte: startTime
            };

            previousFilter.timestamp = {
                $gte: previousStartTime,
                $lt: previousEndTime
            };

        }

        const sessions =
            await Event.distinct(
                "sessionId",
                filter
            );

        const totalClicks =
            await Event.countDocuments({
                ...filter,
                eventType: "click"
            });

        const totalMouseMoves =
            await Event.countDocuments({
                ...filter,
                eventType: "mousemove"
            });

        const totalScrolls =
            await Event.countDocuments({
                ...filter,
                eventType: "scroll"
            });

        const formStartSessions =
            await Event.distinct(
                "sessionId",
                {
                    ...filter,
                    eventType: "formstart"
                }
            );

        const formSubmitSessions =
            await Event.distinct(
                "sessionId",
                {
                    ...filter,
                    eventType: "formsubmit"
                }
            );

        const totalFormStarts =
            formStartSessions.length;

        const totalFormSubmits =
            formSubmitSessions.length;

        const formSubmissions =
            await Event.find({
                ...filter,
                eventType: "formsubmit"
            });

        let averageFormCompletionTime = 0;

        if (formSubmissions.length > 0) {

            const totalTime =
                formSubmissions.reduce(
                    (sum, event) =>
                        sum + (event.completionTime || 0),
                    0
                );

            averageFormCompletionTime =
                Math.floor(
                    totalTime /
                    formSubmissions.length
                );

        }

        let formCompletionRate = 0;

        if (totalFormStarts > 0) {

            formCompletionRate =
                Math.min(
                    100,
                    Math.round(
                        (
                            totalFormSubmits /
                            totalFormStarts
                        ) * 100
                    )
                );

        }

        const totalDeadClicks =
            await Event.countDocuments({
                ...filter,
                eventType: "deadclick"
            });

        const previousDeadClicks =
            await Event.countDocuments({
                ...previousFilter,
                eventType: "deadclick"
            });

        const maxScrollDepth =
            await Event.findOne({
                ...filter,
                eventType: "scroll"
            })
                .sort({ scrollY: -1 });

        const clicks = await Event.find({
            ...filter,
            eventType: "click"
        }).sort({ timestamp: 1 });

        const previousClicks = await Event.find({
            ...previousFilter,
            eventType: "click"
        }).sort({ timestamp: 1 });

        let rageClickCount = 0;

        for (let i = 2; i < clicks.length; i++) {

            const c1 = clicks[i - 2];
            const c2 = clicks[i - 1];
            const c3 = clicks[i];

            const timeDiff =
                c3.timestamp - c1.timestamp;

            const distance1 =
                Math.hypot(
                    c2.x - c1.x,
                    c2.y - c1.y
                );

            const distance2 =
                Math.hypot(
                    c3.x - c2.x,
                    c3.y - c2.y
                );

            if (
                timeDiff <= 1000 &&
                distance1 <= 50 &&
                distance2 <= 50
            ) {

                rageClickCount++;

            }

        }

        let previousRageClickCount = 0;

        for (let i = 2; i < previousClicks.length; i++) {

            const c1 = previousClicks[i - 2];
            const c2 = previousClicks[i - 1];
            const c3 = previousClicks[i];

            const timeDiff =
                c3.timestamp - c1.timestamp;

            const distance1 =
                Math.hypot(
                    c2.x - c1.x,
                    c2.y - c1.y
                );

            const distance2 =
                Math.hypot(
                    c3.x - c2.x,
                    c3.y - c2.y
                );

            if (
                timeDiff <= 1000 &&
                distance1 <= 50 &&
                distance2 <= 50
            ) {

                previousRageClickCount++;

            }

        }

        let rageTrend = 0;

        if (previousRageClickCount > 0) {

            rageTrend = Math.round(
                (
                    (rageClickCount -
                        previousRageClickCount)
                    /
                    previousRageClickCount
                ) * 100
            );

        }

        let deadClickTrend = 0;

        if (previousDeadClicks > 0) {

            deadClickTrend = Math.round(
                (
                    (totalDeadClicks -
                        previousDeadClicks)
                    /
                    previousDeadClicks
                ) * 100
            );

        }

        const sessionEvents =
            await Event.aggregate([

                {
                    $match: filter
                },

                {
                    $group: {
                        _id: "$sessionId",
                        firstVisit: {
                            $min: "$timestamp"
                        },
                        lastVisit: {
                            $max: "$timestamp"
                        }
                    }
                }

            ]);

        let totalDuration = 0;

        sessionEvents.forEach(session => {

            totalDuration +=
                session.lastVisit -
                session.firstVisit;

        });

        const averageDuration =
            sessionEvents.length
                ? Math.floor(
                    totalDuration /
                    sessionEvents.length
                )
                : 0;

        const totalEvents =
            await Event.countDocuments(
                filter
            );

        let insights = [];

        if (totalDeadClicks < 10) {

            insights.push(
                "Users are interacting with the interface successfully."
            );

        }

        else if (totalDeadClicks < 50) {

            insights.push(
                "Some users are clicking non-functional elements."
            );

        }

        else {

            insights.push(
                "Many users are clicking non-functional elements."
            );

        }

        if (rageClickCount < 20) {

            insights.push(
                `User interactions appear healthy.`
            );

        }

        else if (rageClickCount < 100) {

            insights.push(
                `Some frustration signals detected.`
            );

        }

        else {

            insights.push(
                `High user frustration detected.`
            );

        }

        if (maxScrollDepth &&
            maxScrollDepth.scrollY < 500) {

            insights.push(
                "Users rarely scroll beyond the top section."
            );

        }

        else if (
            maxScrollDepth &&
            maxScrollDepth.scrollY < 1000
        ) {

            insights.push(
                `Users engage with some content.`
            );

        }

        else {

            insights.push(
                `Users are engaging deeply with content.`
            );
        }

        if (averageDuration < 30000) {

            insights.push(
                `Users leave the site quickly.`
            );

        }

        else if (averageDuration < 120000) {

            insights.push(
                "Users spend a moderate amount of time on the site."
            );

        }

        else {

            insights.push(
                `Users are spending significant time on the site.`
            );

        }

        const pages =
            await Event.distinct("page");

        if (formCompletionRate < 40) {

            insights.push(
                `Many users abandon forms before submitting.`
            );

        }
        else if (formCompletionRate < 70) {

            insights.push(
                "Form completion rate is moderate and could be improved."
            );

        }
        else {

            insights.push(
                "Users successfully complete forms at a healthy rate."
            );

        }



        if (averageFormCompletionTime < 15000) {

            insights.push(
                "Users complete forms quickly with minimal friction."
            );

        }
        else if (averageFormCompletionTime < 45000) {

            insights.push(
                "Form completion time is within an acceptable range."
            );

        }
        else {

            insights.push(
                `Users spend significant time completing forms.`
            );

        }

        res.json({

            totalSessions:
                sessions.length,

            totalEvents,

            totalClicks,

            totalMouseMoves,

            totalScrolls,

            totalDeadClicks,

            totalFormStarts,

            totalFormSubmits,

            averageFormCompletionTime,

            formCompletionRate,

            averageDuration,

            maxScrollDepth:
                maxScrollDepth
                    ? maxScrollDepth.scrollY
                    : 0,

            rageClickCount,

            rageTrend,

            deadClickTrend,

            insights,

            pages

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error:
                "Failed to fetch analytics"
        });

    }

});

app.get("/test", async (req, res) => {
    const events = await Event.find();

    res.json(events);
});

app.get("/events", async (req, res) => {
    try {
        const events = await Event.find();

        res.json(events);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch events",
        });
    }
});

app.get("/clear", async (req, res) => {
    await Event.deleteMany({});

    res.json({
        message: "All events cleared",
    });
});

app.get("/screenshot/:sessionId", async (req, res) => {

    try {

        const screenshot =
            await Screenshot.findOne({
                sessionId: req.params.sessionId
            }).sort({ createdAt: -1 });

        res.json(screenshot);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Failed to fetch screenshot"
        });

    }

});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.post(
    "/screenshot",
    upload.single("image"),
    async (req, res) => {

        try {

            const screenshot =
                new Screenshot({

                    sessionId:
                        req.body.sessionId,

                    imagePath:
                        req.file.filename

                });

            await screenshot.save();

            res.json({
                success: true
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                error: "Upload failed"
            });

        }

    }
);