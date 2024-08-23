"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { CreateUpdateProject } from "@/types/Project";
import { redirect } from "next/navigation";

// POST create a new project
const createProject = async (data: CreateUpdateProject) => {
  const session = await auth();
  console.log("GITHUB REPO", data);
  let project;
  try {
    const response = await fetch(`${baseUrl}/api/projects/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, userId: session?.user?.id }),
    });

    project = await response.json();
    console.log("project", project);
  } catch (error) {
    console.error("Error creating project:", error);
    return "Error creating project";
  }
  redirect(`/projects/${project._id}`);
};

export { createProject };