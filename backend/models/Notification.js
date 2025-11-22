const mongoose = require('mongoose')
const {Schema} = mongoose;

const NotificationSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
},
{ timestamps: true }
)
module.exports = mongoose.model('notification', NotificationSchema)