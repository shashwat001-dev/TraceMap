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

        const sessions = await Event.aggregate([
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
            }
        ]);

        res.json(sessions);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Failed to fetch sessions"
        });

    }

});

app.get("/analytics", async (req, res) => {

    try {

        const sessions =
            await Event.distinct("sessionId");

        const totalClicks =
            await Event.countDocuments({
                eventType: "click"
            });

        const totalDeadClicks =
            await Event.countDocuments({
                eventType: "deadclick"
            });

        const maxScrollDepth =
            await Event.findOne({
                eventType: "scroll"
            })
                .sort({ scrollY: -1 });

        const clicks = await Event.find({
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

        const sessionEvents =
            await Event.aggregate([
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
            await Event.countDocuments();

        let insights = [];

        if (totalDeadClicks > 20) {

            insights.push(
                "Users are clicking non-functional elements."
            );

        }

        if (rageClickCount > 20) {

            insights.push(
                "High user frustration detected."
            );

        }

        if (maxScrollDepth &&
            maxScrollDepth.scrollY > 1000) {

            insights.push(
                "Users are engaging deeply with content."
            );

        }

        if (averageDuration < 30000) {

            insights.push(
                "Users are leaving very quickly."
            );

        }

        res.json({

            totalSessions:
                sessions.length,

            totalEvents,

            totalClicks,

            totalDeadClicks,

            averageDuration,

            maxScrollDepth:
                maxScrollDepth
                    ? maxScrollDepth.scrollY
                    : 0,

            rageClickCount,

            insights

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