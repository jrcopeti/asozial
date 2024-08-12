"use server";

import { baseUrl } from "@/constants";

// Get all projects
const fetchAllProjects = async () => {
  try {
    const response = await fetch(`${baseUrl}/my-projects`);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    const projects = await response.json();
    console.log("Fetched projects:", projects);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return "Error fetching projects";
  }
};

// Get 1 project

const fetchProjectById = async (projectId: string) => {
  try {
    const response = await fetch(`${baseUrl}/projects/${projectId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${response.statusText}`);
    }
    const project = await response.json();
    console.log("Fetched project:", project);
    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return "Error fetching project";
  }
};

const handleJoinProject = async (formData: FormData) => {
  const projectId = formData.get("projectId") as string;

  const response = await fetch(
    `http://localhost:5005/projects/${projectId}/join`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: "60d4f4d2d243f80015f7b3f9" }),
    },
  );

  const result = await response.json();
  console.log("result:", result);
};

export { fetchAllProjects, fetchProjectById, handleJoinProject };