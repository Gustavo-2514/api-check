const { model, Schema } = require("mongoose");

const User = model(
  "User",
  new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    checklistId: [{ type: Schema.Types.ObjectId, ref: "Checklist" }],
  })
);

module.exports = User;
