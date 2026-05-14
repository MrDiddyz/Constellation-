import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders baseline readiness content", () => {
    render(<Home />);

    expect(screen.getByText(/baseline readiness checklist/i)).toBeInTheDocument();
    expect(screen.getByText(/quality gate coverage/i)).toBeInTheDocument();
  });
});
