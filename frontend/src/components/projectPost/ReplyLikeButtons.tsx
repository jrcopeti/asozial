"use client";
//Actions
import { createDislikeReply, createLikeReply } from "@/actions";
//React
import { useEffect, useMemo, useState } from "react";

//Components
import ThumbsUpIcon from "../common/ui/icons/ThumbsUpIcon";
import ThumbsDownIcon from "../common/ui/icons/ThumbsDownIcon";

//Lib
import FlipNumbers from "react-flip-numbers";

//Types
import { Reply } from "@/types/ProjectPost";
import { UserId } from "@/types/User";

function ReplyLikeButtons({ reply }: { reply?: Reply }) {
  const [likes, setLikes] = useState(reply?.likes.length ?? 0);
  const [dislikes, setDislikes] = useState(reply?.dislikes.length ?? 0);
  const [userLiked, setUserLiked] = useState<boolean | undefined>(false);
  const [userDisliked, setUserDisliked] = useState<boolean | undefined>(false);

  const userId = useMemo(
    () => reply?.userId._id.toString(),
    [reply?.userId._id],
  );

  // Check if the user has already liked or disliked the post
  useEffect(() => {
    setUserLiked(reply?.likes.includes(userId as UserId));
    setUserDisliked(reply?.dislikes.includes(userId as UserId));
  }, [reply?.likes, reply?.dislikes, userId]);

  const handleLike = async () => {
    setUserLiked(true);
    setLikes((prev) => prev + 1);

    if (userDisliked) {
      setUserDisliked(false);
      setDislikes((prev) => prev - 1);
    }

    try {
      const updatedLikes = await createLikeReply(reply?._id);
      setLikes(updatedLikes);
    } catch (error) {
      setUserLiked(false);
      setLikes((prev) => prev - 1);
      if (userDisliked) {
        setUserDisliked(true);
        setDislikes((prev) => prev + 1);
      }
    }
  };

  const handleDislike = async () => {
    setUserDisliked(true);
    setDislikes((prev) => prev + 1);

    if (userLiked) {
      setUserLiked(false);
      setLikes((prev) => prev - 1);
    }

    try {
      const updatedDislikes = await createDislikeReply(reply?._id);
      setDislikes(updatedDislikes);
    } catch (error) {
      setUserDisliked(false);
      setDislikes((prev) => prev - 1);
      if (userLiked) {
        setUserLiked(true);
        setLikes((prev) => prev + 1);
      }
    }
  };

  return (
    <>
      <div className="mb-4 flex w-full items-center gap-4">
        <div className="ml-2 flex items-center gap-2 lg:ml-8">
          <ThumbsUpIcon handleLike={handleLike} userLiked={userLiked} />

          <FlipNumbers
            height={16}
            width={16}
            color="rgb(156 163 175)"
            play
            perspective={100}
            numbers={likes.toString()}
          />
        </div>
        <div className="flex items-center gap-2">
          <ThumbsDownIcon
            handleDislike={handleDislike}
            userDisliked={userDisliked}
          />

          <FlipNumbers
            height={16}
            width={16}
            color="rgb(156 163 175)"
            play
            perspective={100}
            numbers={dislikes.toString()}
          />
        </div>
      </div>
    </>
  );
}

export default ReplyLikeButtons;
