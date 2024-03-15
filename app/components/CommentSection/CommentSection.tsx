import { authOptions } from "@/app/lib/auth";
import CommentCard from "@/app/ui/CommentCard";
import DeleteModal from "@/app/ui/DeleteModal";
import { getAllComments } from "@/services";
import { getServerSession } from "next-auth";

async function CommentSection({ slug }: { slug: string }) {
  const comments = await getAllComments(slug);
  const data = await getServerSession(authOptions);

  return (
    <div>
      <h1 className="mt-5 text-2xl font-semibold">Comments</h1>
      {comments.map((comment: any, index: any) => {
        return (
          <div key={index}>
            <CommentCard comment={comment} data={data} />
          </div>
        );
      })}
    </div>
  );
}

export default CommentSection;
