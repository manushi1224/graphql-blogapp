"use client";

import { useState } from "react";
import DeleteModal from "./DeleteModal";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

function CommentCard({ comment, data }: { comment: CommentUser; data: any }) {
  const router = useRouter();
  const [deleteComment, setDeleteComment] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newComment, setNewComment] = useState(comment.node.comment);

  const editHandler = async (commentId: string) => {
    try {
      const response: any = await axios.patch(
        `${process.env.NEXT_PUBLIC_API}/api/comment/handleComment/${commentId}`,
        {
          comment: newComment,
        }
      );
      if (response.data.status !== 200) {
        toast.error("Error updating comment");
      }
      setEditMode(false);
      toast.success("Comment updated successfully!");
      router.refresh();
    } catch (error) {}
  };

  const closePopup = (status: boolean) => {
    setDeleteComment(status);
  };

  const deletePostHandler = (status: boolean) => {
    if (status) {
      toast.success("Post deleted successfully!");
    }
  };

  return (
    <div>
      <Toaster />
      {deleteComment && (
        <DeleteModal
          id={comment.node.id}
          closePopup={closePopup}
          deletePostHandler={deletePostHandler}
          isComment={true}
          authId={comment.node.authors[0].id}
          postId={comment.node.post.id}
        />
      )}

      <article className="p-6 mt-5 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
              {comment.node.authors[0].name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {comment.node.createdAt.split("T")[0]}
            </p>
          </div>
          {data?.user && data?.user.email === comment.node.authors[0].email && (
            <div className="grid grid-cols-2 gap-5">
              {editMode ? (
                <>
                  <button
                    className="text-slate-500 dark:text-slate-400"
                    onClick={() => editHandler(comment.node.id)}
                  >
                    Save
                  </button>
                  <button
                    className="text-red-500 dark:text-red-400"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-slate-500 dark:text-slate-400"
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 dark:text-red-400"
                    onClick={() => setDeleteComment(true)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          )}
        </footer>
        {editMode ? (
          <form>
            <textarea
              name="comment"
              id="comment"
              className="h-20 w-full rounded-lg p-4 dark:bg-gray-800 dark:text-white"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
          </form>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            {comment.node.comment}
          </p>
        )}
      </article>
    </div>
  );
}

export default CommentCard;
