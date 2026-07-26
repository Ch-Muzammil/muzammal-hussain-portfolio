import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { Loader } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/ui/Empty";
import { SkeletonGroup } from "@/components/ui/Skeleton";

describe("Input", () => {
  it("renders with accessible label association via id", () => {
    render(
      <>
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </>,
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
  });

  it("renders a leading icon", () => {
    const { container } = render(
      <Input id="email" type="email" icon={<span data-testid="mail-icon" />} />,
    );
    expect(container.querySelector('[data-slot="input-icon"]')).toBeTruthy();
    expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
  });

  it("toggles password visibility", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();

    render(
      <>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" defaultValue="secret" />
      </>,
    );

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button", { name: "Show password" }));
    expect(input).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: "Hide password" }));
    expect(input).toHaveAttribute("type", "password");
  }, 15_000);
});

describe("Spinner / Loader", () => {
  it("exposes an accessible loading status", () => {
    render(<Spinner label="Loading users" />);
    expect(screen.getByRole("status", { name: "Loading users" })).toBeInTheDocument();
  });

  it("renders bouncing dots variant", () => {
    render(<Loader variant="dots" label="Please wait" />);
    expect(screen.getByRole("status", { name: "Please wait" })).toBeInTheDocument();
  });
});

describe("EmptyState", () => {
  it("renders title, description, and action", () => {
    render(
      <EmptyState
        title="No users"
        description="Invite someone to get started."
        action={<button type="button">Invite</button>}
      />,
    );
    expect(screen.getByText("No users")).toBeInTheDocument();
    expect(screen.getByText("Invite someone to get started.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Invite" })).toBeInTheDocument();
  });
});

describe("SkeletonGroup", () => {
  it("renders the requested count of skeletons", () => {
    const { container } = render(
      <SkeletonGroup count={4} shape="text" itemClassName="w-20" />,
    );
    expect(container.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(4);
  });
});
