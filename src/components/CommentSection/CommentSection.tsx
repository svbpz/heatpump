import { CommentType } from "../../types";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { initialComments } from "../../data";
import { useLocalStorage } from "../../hooks";

type CommentSectionProps = {
  title: string;
  useMockData?: boolean;
};

const CommentSection = ({
  title,
  useMockData = false,
}: CommentSectionProps) => {
  const [comments, setComments] = useLocalStorage<CommentType[]>(
    "comments",
    useMockData ? initialComments : []
  );

  const onComment = (content: string): void => {
    const newComment: CommentType = {
      id: Date.now(),
      author: "You",
      date: new Date().toLocaleDateString(),
      content,
      replies: [],
    };
    setComments([...comments, newComment]);
  };

  const onDelete = (commentId: number) => {
    const deleteCommentRecursively = (comments: CommentType[]): CommentType[] =>
      comments
        .map((comment) => ({
          ...comment,
          replies: deleteCommentRecursively(comment.replies),
        }))
        .filter((comment) => comment.id !== commentId);
    setComments(deleteCommentRecursively(comments));
  };

  const onReply = (parentId: number, content: string): void => {
    const newReply: CommentType = {
      id: Date.now(),
      author: "You",
      date: new Date().toLocaleDateString(),
      content,
      replies: [],
    };

    const addReplyRecursively = (comments: CommentType[]): CommentType[] =>
      comments.map((comment) => {
        if (comment.id === parentId) {
          return { ...comment, replies: [...comment.replies, newReply] };
        }
        return { ...comment, replies: addReplyRecursively(comment.replies) };
      });

    setComments(addReplyRecursively(comments));
  };

  return (
    <div className="container mx-auto p-6 pb-1 rounded-lg border-2">
      <h2 className="text-xl mb-4">{title}</h2>
      <CommentInput onSubmit={onComment} />
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onDelete={onDelete}
          onReply={onReply}
        />
      ))}
    </div>
  );
};

export default CommentSection;
