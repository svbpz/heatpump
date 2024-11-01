// src/components/Comment/__tests__/CommentSection.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import CommentSection from "../CommentSection";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock localStorage to avoid actual persistence
const localStorageData: Record<string, string> = {
  comments: JSON.stringify("[]"),
}; // Internal storage for mock

vi.spyOn(window.localStorage, "setItem").mockImplementation(
  (key: string, value: string) => {
    localStorageData[key] = value; // Store the value in the internal object
  }
);

vi.spyOn(window.localStorage, "getItem").mockImplementation((key: string) => {
  return localStorageData[key] || null; // Return the stored value or null if not found
});

// You can also mock the clear method if needed
vi.spyOn(window.localStorage, "clear").mockImplementation(() => {
  for (const key in localStorageData) {
    delete localStorageData[key]; // Clear all items
  }
});

describe("CommentSection", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render with no comments if localStorage is initially empty", () => {
    render(<CommentSection title="Comments" />);

    expect(JSON.parse(localStorage.getItem("comments") || "[]")).toHaveLength(
      0
    );

    expect(screen.queryByText("Reply")).not.toBeInTheDocument();
  });

  it("adds a new comment", () => {
    render(<CommentSection title="Comments" />);

    const textarea = screen.getByPlaceholderText("Write a comment...");
    fireEvent.change(textarea, { target: { value: "Test comment" } });

    const submitButton = screen.getByRole("button", { name: "Comment" });
    fireEvent.click(submitButton);

    expect(screen.getByText("Test comment")).toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(JSON.parse(localStorage.getItem("comments") || "[]")).toHaveLength(
      1
    );
  });

  it("replies to a comment", () => {
    render(<CommentSection title="Comments" />);

    // Add parent comment
    const textarea = screen.getByPlaceholderText("Write a comment...");
    fireEvent.change(textarea, { target: { value: "Parent comment" } });

    const submitButton = screen.getByRole("button", { name: "Comment" });
    fireEvent.click(submitButton);

    // Reply to parent comment
    const replyButton = screen.getByRole("button", { name: "Reply" });
    fireEvent.click(replyButton);

    const allTextareas = screen.getAllByPlaceholderText("Write a comment...");
    const replyTextarea = allTextareas[1];
    fireEvent.change(replyTextarea, { target: { value: "Reply comment" } });

    fireEvent.click(screen.getByRole("button", { name: "Comment" }));
    expect(screen.getByText("Reply comment")).toBeInTheDocument();

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(JSON.parse(localStorage.getItem("comments") || "[]")).toHaveLength(
      1
    );
    expect(
      JSON.parse(localStorage.getItem("comments") || "[]")[0].replies
    ).toHaveLength(1);
  });

  it("deletes a comment", () => {
    render(<CommentSection title="Comments" />);

    // Add and delete a comment
    const textarea = screen.getByPlaceholderText("Write a comment...");
    fireEvent.change(textarea, { target: { value: "Deletable comment" } });
    fireEvent.click(screen.getByRole("button", { name: "Comment" }));

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(JSON.parse(localStorage.getItem("comments") || "[]")).toHaveLength(
      1
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(JSON.parse(localStorage.getItem("comments") || "[]")).toHaveLength(
      0
    );

    expect(screen.queryByText(/deletable comment/i)).not.toBeInTheDocument();
  });
});
