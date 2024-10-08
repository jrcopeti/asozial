//Components
import PageContainer from "@/components/common/containers/PageContainer";
import ParentPost from "@/components/projectPost/ParentPost";
import ParentPostLoading from "@/components/projectPost/ParentPostLoading";
import RepliesList from "@/components/projectPost/RepliesList";
import ReplyFormOpen from "@/components/projectPost/ReplyFormOpen";

//Types
import type { ProjectPostId } from "@/types/ProjectPost";
import { Suspense } from "react";

async function PostPage({
  params,
}: {
  params: { projectPostId: ProjectPostId };
}) {
  const { projectPostId } = params;

  return (
    <PageContainer className="w-full max-w-screen-md">
      <Suspense fallback={<ParentPostLoading />}>
        {/* PostShow */}
        <ParentPost projectPostId={projectPostId} />
        {/* Reply Form */}
        <ReplyFormOpen projectPostId={projectPostId} startOpen />
        {/* Replies */}
        <RepliesList projectPostId={projectPostId} />
      </Suspense>
    </PageContainer>
  );
}

export default PostPage;
