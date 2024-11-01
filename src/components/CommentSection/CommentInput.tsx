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
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {isValidContent && <button type="submit">Comment</button>}
    </form>
  );
};

export default CommentInput;
