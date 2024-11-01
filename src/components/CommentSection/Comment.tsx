import { useState } from "react";
import { CommentType } from "../../types";

type CommentProps = {
  comment: CommentType;
};

const Comment = ({ comment }: CommentProps) => {
  const [showReplies, setShowReplies] = useState(false);

  const { author, date, content, replies } = comment;
  const hasReplies = replies.length > 0;

  const toggleReplies = () => setShowReplies((state) => !state);

  return (
    <article className="text-slate-900 p-4 mb-6 border-2 rounded-lg hover:bg-slate-50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col">
          <h3 className="font-semibold">{author}</h3>
          <p className="text-slate-700 text-sm">{date}</p>
        </div>
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
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </article>
  );
};

export default Comment;
