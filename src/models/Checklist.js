const { model, Schema } = require("mongoose");
const Task = require("./Task");

const checklistSchema = new Schema(
  {
    name: { type: String, required: true },
    taskId: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

checklistSchema.pre("findOneAndDelete", async function (next) {
  const checklistId = this.getFilter()._id; 
  await Task.deleteMany({ checklistId: checklistId });
  next();
});

const Checklist = model("Checklist", checklistSchema);

module.exports = Checklist;
