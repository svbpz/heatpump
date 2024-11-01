import { useState } from "react";
import { CommentType } from "../../types";

type CommentProps = {
  comment: CommentType;
  onDelete: (id: number) => void;
  nested?: boolean;
};

const Comment = ({ comment, onDelete, nested = false }: CommentProps) => {
  const [showReplies, setShowReplies] = useState(false);

  const { id, author, date, content, replies } = comment;
  const hasReplies = replies.length > 0;
  const isOwner = author === "You";

  const toggleReplies = () => setShowReplies((state) => !state);

  const containerStyles = nested
    ? `text-slate-900 py-2 pl-4 mb-4 border-l-2 hover:bg-slate-100 ${
        isOwner ? "border-blue-500" : ""
      }`
    : "text-slate-900 p-4 mb-6 border-2 rounded-lg hover:bg-slate-50 ";

  return (
    <article className={containerStyles}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col">
          <h3 className={`font-semibold ${isOwner ? "text-blue-700" : ""}`}>
            {author}
          </h3>
          <p className="text-slate-700 text-sm">{date}</p>
        </div>
        {isOwner && (
          <button
            onClick={() => onDelete(id)}
            className="text-sm text-slate-700 hover:underline mx-2"
          >
            Delete
          </button>
        )}
      </div>
      <p className="mb-2">{content}</p>
      <div className="flex items-center text-slate-700 text-sm justify-between">
        {hasReplies && (
          <button onClick={toggleReplies} className="hover:underline mx-2">
            {showReplies ? "Hide replies" : `Show ${replies.length} Replies`}
          </button>
        )}
      </div>
      {showReplies && (
        <div className="ml-2 mt-4">
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onDelete={onDelete}
              nested
            />
          ))}
        </div>
      )}
    </article>
  );
};

export default Comment;
