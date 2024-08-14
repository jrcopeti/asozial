import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    pitch: { type: String, required: true },
    githubRepo: { type: String },
    techStack: [{ type: String }],
    mainLanguage: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    membersJoined: [{ type: Schema.Types.ObjectId, ref: "User" }],
    membersApplied: [{ type: Schema.Types.ObjectId, ref: "User" }],
    membersInvited: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: [
      {
        type: String,
        enum: ["active", "inactive", "completed"],
        default: "active",
      },
    ],
  },
  {
    collection: "Project",
    timestamps: true,
  }
);

export default model("Project", projectSchema);
