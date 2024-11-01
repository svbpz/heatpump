import { render, screen, fireEvent } from "@testing-library/react";
import CommentInput from "../CommentInput";
import { vi, describe, it, expect } from "vitest";

describe("CommentInput Component", () => {
  const onSubmitMock = vi.fn();

  it("renders the input form", () => {
    render(<CommentInput onSubmit={onSubmitMock} />);
    const textarea = screen.getByPlaceholderText("Write a comment...");
    expect(textarea).toBeInTheDocument();
  });

  it("enables the submit button only when text is entered", () => {
    render(<CommentInput onSubmit={onSubmitMock} />);
    const textarea = screen.getByPlaceholderText("Write a comment...");
    const submitButton = screen.queryByRole("button", { name: "Comment" });

    expect(submitButton).not.toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: "Test input" } });
    const submitButtonAfterInput = screen.getByRole("button", {
      name: "Comment",
    });
    expect(submitButtonAfterInput).toBeInTheDocument();
  });

  it("calls onSubmit with the input content and clears the input on submit", () => {
    render(<CommentInput onSubmit={onSubmitMock} />);
    const textarea = screen.getByPlaceholderText("Write a comment...");

    fireEvent.change(textarea, { target: { value: "New comment" } });
    fireEvent.submit(screen.getByRole("button", { name: "Comment" }));

    expect(onSubmitMock).toHaveBeenCalledWith("New comment");
    expect(textarea).toHaveValue("");
  });
});
