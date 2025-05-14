import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
    trim: true
  },
  teamMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  status: {
    type: String,
    enum: ['Active', 'On Hold', 'Planning', 'Completed', 'Delayed', 'Behind Schedule'],
    default: 'Planning'
  },
  priority: { 
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  color: { type: String }, 
  estimatedHours: { type: Number, default: 0, min: 0 },
  hoursLogged: {
    type: Number,
    default: 0,
    min: 0
  },
  description: {
    type: String,
  },
  category: { type: String },
  startDate: {
    type: Date
  },
  progressPercent: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  endDate : {
    type : Date
  },
  dueDate: {
    type: Date
  }
}, {
  timestamps: true
});


projectSchema.methods.calculateProgress = function () {
  if (this.estimatedHours > 0) {
    const progress = (this.hoursLogged / this.estimatedHours) * 100;
    this.progressPercent = Math.min(100, Math.max(0, Math.round(progress))); // Ensure between 0 and 100
  } else {
    this.progressPercent = 0; // If estimatedHours is 0, progress is 0
  }
  return this.progressPercent;
};

// Pre-save hook to calculate progressPercent before saving
projectSchema.pre("save", function (next) {
  this.calculateProgress();
  next();
});
//
//
const Project = mongoose.model("Project", projectSchema);

export default Project;



// projectSchema.index({ status: 1 });
// projectSchema.index({ category: 1 });