import { CommentType } from "../types";

export const initialComments: CommentType[] = [
  {
    id: 1,
    author: "You",
    date: "2023-12-18",
    content:
      "Wow, this is amazing! Great work! I dreamed of this feature for so long.",
    replies: [
      {
        id: 5,
        author: "Another User",
        date: "2023-12-19",
        content: "I agree, this is a great feature! What a time to be alive!",
        replies: [],
      },
    ],
  },
  {
    id: 2,
    author: "Some User",
    date: "2023-12-23",
    content: "Thanks for implementing this so quickly! I love it!",
    replies: [],
  },
];
