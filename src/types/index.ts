export type CommentType = {
  id: number;
  author: string;
  date: string;
  content: string;
  replies: CommentType[];
};
