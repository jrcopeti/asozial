"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

const matchUserToProject = async (actualUserId: string, projectId: string) => {
  const session = await auth();
  try {
    const response = await fetch(`${baseUrl}/api/match/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        actualUserId: session?.user.id,
        projectId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { error: errorText };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error matching user to project:", error.message);
    return { error: error.message };
  }
};

export { matchUserToProject };
