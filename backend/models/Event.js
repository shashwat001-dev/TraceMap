const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    sessionId: String,
    eventType: String,
    x: Number,
    y: Number,
    scrollY: Number,
    page: String,
    timestamp: Number,
});

module.exports = mongoose.model("Event", eventSchema);