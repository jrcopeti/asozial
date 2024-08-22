"use client";
//Next
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

//React
import { useState } from "react";

//Actions
import { deleteProjectPost } from "@/actions";

//Components
import UserAvatar from "../common/ui/UserAvatar";
import PostLikeButtons from "./PostLikeButtons";
import ProjectPostContent from "./ProjectPostContent";
import ReplyCount from "./ReplyCount";
import EditIcon from "../common/ui/EditIcon";
import DeleteIcon from "../common/ui/DeleteIcon";
import CancelIcon from "../common/ui/CancelIcon";
import CustomDialog from "../common/ui/CustomDialog";
import { ImageT } from "../common/ui/ImageUploader";

//Ui
import { FaRegArrowAltCircleRight } from "react-icons/fa";
//lib
import { useSession } from "next-auth/react";
//Types
import { ProjectPost, Reply } from "@/types/ProjectPost";

type ParentProjectPostContent = {
  post: ProjectPost;
  isProjectPage: boolean;
  replies?: Reply[];
};

function ParentProjectPostContent({
  post,
  isProjectPage,
  replies,
}: ParentProjectPostContent) {
  const session = useSession();
  const userId = session.data?.user?.id;
  const isAuthor = userId === post.userId._id.toString();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [image, setImage] = useState<ImageT | undefined>(undefined);
  const [error, setError] = useState("");

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const handleDeletePost = async () => {
    const result = await deleteProjectPost(post._id);
    console.log("Result", result);
    if (result.error) {
      console.error("Error deleting post", result.error);
      setError(result.message);
    } else {
      router.push(`/projects/${post.projectId}`);
    }
  };

  const repliesCount = replies
    ? replies.filter((reply) => !reply.deleted).length
    : 0;
  return (
    <>
      <div className="flex w-full items-start gap-4">
        {/* Avatar  */}
        <div className="flex w-full flex-col gap-3 pl-2 lg:contents">
          <UserAvatar
            src={post.userId.image}
            username={post.userId.username}
            userId={post.userId._id}
          />

          {/* Post Title and Content */}
          <ProjectPostContent
            projectPost={post}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isProjectPage={isProjectPage}
            image={image}
            setImage={setImage}
          />
        </div>
      </div>

      {/* Image */}
      {post.image && !isEditing && (
        <div className="mb-8 px-6 lg:px-14">
          <Image
            src={post.image}
            alt={post.title}
            width={600}
            height={600}
            blurDataURL={post.placeholder}
            placeholder="blur"
            className="rounded-lg"
          />
        </div>
      )}

      {/* Post Buttons */}
      <div className="flex items-center gap-5">
        <ReplyCount replies={post.replyCount || repliesCount} />
        <PostLikeButtons projectPost={post} />
        {isAuthor && (
          <div className="flex items-start gap-5">
            {!isEditing ? (
              <EditIcon toggleEditing={toggleEditing} key="edit-post" />
            ) : (
              <CancelIcon handler={toggleEditing} key="edit-post" />
            )}

            {!isProjectPage && (
              <>
                <CustomDialog
                  trigger={<DeleteIcon key="delete-post" />}
                  title="Are you sure?"
                  description="There's no turning back once you delete this post"
                  handler={handleDeletePost}
                  asChild={false}
                />

                {error && (
                  <span className="text-base font-light text-red-500">
                    {error}
                  </span>
                )}
              </>
            )}
          </div>
        )}
        {/* Arrow Button */}
        {isProjectPage && (
          <>
            <Link
              className="mb-3 ml-4 font-semibold hover:opacity-75"
              key={post._id.toString()}
              href={`/projects/${post.projectId}/posts/${post._id}`}
            >
              <span>
                <FaRegArrowAltCircleRight size={30} />
              </span>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default ParentProjectPostContent;
