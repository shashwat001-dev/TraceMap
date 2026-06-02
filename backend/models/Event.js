const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    sessionId: String,
    eventType: String,
    x: Number,
    y: Number,
    scrollY: Number,
    page: String,
    pageHeight: Number,
    timestamp: Number,
});

module.exports = mongoose.model("Event", eventSchema);