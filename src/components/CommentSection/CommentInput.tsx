import { useState } from "react";

type CommentInputProps = {
  onSubmit: (content: string) => void;
};

const CommentInput = ({ onSubmit }: CommentInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText("");
    }
  };

  const isValidContent = text && text.trim();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col my-4">
      <textarea
        className="text-slate-900 p-2 rounded-lg resize-none h-20 border-2 border-slate-200 bg-transparent"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {isValidContent && (
        <button
          type="submit"
          className="bg-slate-800 text-white py-2 px-4 rounded-lg mt-2 hover:bg-slate-950"
        >
          Comment
        </button>
      )}
    </form>
  );
};

export default CommentInput;
