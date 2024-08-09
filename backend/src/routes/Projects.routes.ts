import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import Project from "../models/Project.models";
import User from "../models/User.models";

const projectsRouter = express.Router();

dotenv.config();

projectsRouter.get(
  "/new",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repoUrl = req.query.repoUrl as string;
      const ownerId = repoUrl.split("/")[0];
      console.log("Request Query", req.query.repoUrl);

      if (!repoUrl) {
        return res
          .status(400)
          .json({ error: "repoUrl query parameter is required" });
      }
      if (!ownerId) {
        return res
          .status(400)
          .json({ error: "ownerId query parameter is required" });
      }

      const repoInfo = await axios.get(
        `https://api.github.com/repos/${repoUrl}`
      );
      if (repoInfo.status !== 200) {
        return res
          .status(repoInfo.status)
          .json({ error: "Failed to fetch repository information" });
      }

      const owner = await User.findOne({ username: ownerId });
      if (!owner) {
        return res.status(404).json({ error: "User not found" });
      }

      const { name, description, html_url, language } = repoInfo.data;

      const createProject = await Project.create({
        title: name,
        description: description,
        githubRepo: html_url,
        techStack: [language],
        owner: owner._id,
        membersApplied: [],
        membersInvited: [],
        membersJoined: [],
        status: "active",
        posts: [],
      });

      res.status(201).json(createProject);
    } catch (error) {
      next(error);
    }
  }
);

// GET all projects only backend request

projectsRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.find();
      res.json(project);
    } catch (error) {
      next(error);
    }
  }
);

export default projectsRouter;