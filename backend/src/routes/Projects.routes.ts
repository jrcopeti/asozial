import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import Project from "../models/Project.models";
import User from "../models/User.models";

const projectsRouter = express.Router();

dotenv.config();

// GET request to create a project after retrieving information from github repo

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

// GET all projects

projectsRouter.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.find();
      res.json(project);
    } catch (error) {
      next(error);
    }
  }
);

// GET 1 project

projectsRouter.get(
  "/:projectId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      next(error);
    }
  }
);




// POST request to join a project

projectsRouter.post(
  "/:projectId/join",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.findById(req.params.projectId);
      console.log("Project", project);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      const user = await User.findById(req.body.userId);
      console.log("User", user);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (
        project.membersJoined.includes(user._id) ||
        project.membersApplied.includes(user._id)
      ) {
        return res
          .status(400)
          .json({ error: "User is already a member of this project" });
      }

      project.membersApplied.push(user._id);
      await project.save();

      res.json(project);
    } catch (error) {
      next(error);
    }
  }
);

// GET all projects that a user is a member of

// GET check if user is a member of a project

export default projectsRouter;
