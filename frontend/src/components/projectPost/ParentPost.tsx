//Actions
import { fetchPostByIdAndReplies } from "@/actions";

//Components
import UserAvatar from "../common/UserAvatar";
import ProjectPostContent from "./ProjectPostContent";
import ProjectPostButtons from "./ProjectPostButtons";
import ReplyCount from "./ReplyCount";
import ProjectPostContainer from "./ProjectPostContainer";

//Types
import type { ProjectPostId } from "@/types/ProjectPost";
import ParentProjectPostContent from "./ParentProjectPostContent";

async function ParentPost({ projectPostId }: { projectPostId: ProjectPostId }) {
  const { post, replies } = await fetchPostByIdAndReplies(projectPostId);
  console.log("ParentPost:||||||||||||||||||", post);

  return (
    <ProjectPostContainer>
      <ParentProjectPostContent
        post={post}
        isProjectPage={false}
        replies={replies}
      />
    </ProjectPostContainer>
  );
}

export default ParentPost;
