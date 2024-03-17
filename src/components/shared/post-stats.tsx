import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikedPost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface PostStatsProps {
  post: Models.Document;
  userId: string;
}
export const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikedPost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavePost, isPending: isDeletingSaved } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };
  return (
    <div className=" flex justify-between items-center z-20">
      <div className=" flex gap-2 mr-5">
         
          <img
            src={`${
              checkIsLiked(likes, userId)
                ? "/assets/icons/liked.svg"
                : "/assets/icons/like.svg"
            }`}
            alt="like"
            width={20}
            height={20}
            onClick={handleLikePost}
            className=" cursor-pointer"
          />
        
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className=" flex gap-2">
      {isSavingPost || isDeletingSaved ? (
          <Loader2 className=" h-12 w-12 animate-spin" />
        ) :(
        <img
          src={`${
            isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"
          }`}
          width={20}
          height={20}
          onClick={handleSavePost}
          alt=""
          className="cursor-pointer"
        />)
}
      </div>
    </div>
  );
};
