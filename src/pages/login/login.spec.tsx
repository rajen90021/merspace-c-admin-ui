import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "./login";

describe("Login Page", () => {
  it("should render with required fields", () => {
    render(<Login />);

    // Match actual placeholders and labels
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();

    // Match actual button text
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();

    // Match checkbox label
    expect(screen.getByText("Remember me")).toBeInTheDocument();

    // Match link text
    expect(screen.getByText("Forgot password?")).toBeInTheDocument();
  });
});
