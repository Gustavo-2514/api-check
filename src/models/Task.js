const { model, Schema } = require("mongoose");

const Task = model(
  "Task",
  new Schema(
    {
      title: { type: String, required: true },
      done: { type: Boolean, default: false },
      checklistId: {
        type: Schema.Types.ObjectId,
        ref: "Checklist",
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Task;
