const mongoose = require("mongoose");

const screenshotSchema = new mongoose.Schema({

    sessionId: String,

    imagePath: String,

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports =
    mongoose.model(
        "Screenshot",
        screenshotSchema
    );