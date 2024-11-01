// src/components/Comment/__tests__/Comment.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Comment from "../Comment";
import { CommentType } from "../../../types";
import { describe, expect, it, vi } from "vitest";

describe("Comment Component", () => {
  const mockComment: CommentType = {
    id: 1,
    author: "Test User",
    date: "2024-11-01",
    content: "This is a test comment",
    replies: [],
  };

  const onReplyMock = vi.fn();
  const onDeleteMock = vi.fn();

  it("renders the comment content", () => {
    render(
      <Comment
        comment={mockComment}
        onReply={onReplyMock}
        onDelete={onDeleteMock}
      />
    );

    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("2024-11-01")).toBeInTheDocument();
  });

  it("shows a reply input when the Reply button is clicked", () => {
    render(
      <Comment
        comment={mockComment}
        onReply={onReplyMock}
        onDelete={onDeleteMock}
      />
    );

    const replyButton = screen.getByRole("button", { name: "Reply" });
    fireEvent.click(replyButton);

    const replyTextarea = screen.getByPlaceholderText("Write a comment...");
    expect(replyTextarea).toBeInTheDocument();
  });

  it("calls the onDelete callback when Delete button is clicked", () => {
    render(
      <Comment
        comment={{ ...mockComment, author: "You" }}
        onReply={onReplyMock}
        onDelete={onDeleteMock}
      />
    );

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledWith(mockComment.id);
  });
});
