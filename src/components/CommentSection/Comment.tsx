import { CommentType } from "../../types";

type CommentProps = {
  comment: CommentType;
};

const Comment = ({ comment }: CommentProps) => {
  const { author, date, content } = comment;

  return (
    <article className="text-slate-900 p-4 mb-6 border-2 rounded-lg hover:bg-slate-50">
      <div>
        <h3>{author}</h3>
        <p>{date}</p>
      </div>
      <p>{content}</p>
    </article>
  );
};

export default Comment;
