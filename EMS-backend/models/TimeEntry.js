import mongoose from "mongoose";

const timeEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    hours: {
      type: Number,
      min: [0, "Hours logged must be a positive value"],
      default: 0,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      default: null, 
    },
    description: {
      type: String,
    },
    entryMode: {
      type: String,
      enum: ["Timer"], 
      default: "Timer",
    },
    activityType: {
      type: String,
      enum: ["Productive", "Research", "Other"],
      default: "Productive",
    },
    status: {
      type: String,
      enum: ["Running", "Completed"],
      default: "Running",
    },
    duration: {
      type: Number,
      default: function () {
        if (this.startTime && this.endTime) {
          return (this.endTime - this.startTime) / 3600000; // Convert ms to hours
        }
        return 0;
      },
    },
  },
  {
    timestamps: true,
  }
);

// Validation: Ensure startTime is before endTime (if endTime exists)
timeEntrySchema.pre("validate", function (next) {
  if (this.startTime && this.endTime && this.startTime >= this.endTime) {
    return next(new Error("startTime must be before endTime"));
  }
  next();
});

// Index for efficient querying by user, date, and status
timeEntrySchema.index({ user: 1, date: 1, status: 1 });

const TimeEntry = mongoose.model("TimeEntry", timeEntrySchema);

export default TimeEntry;