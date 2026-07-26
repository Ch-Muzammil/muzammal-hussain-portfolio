import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "@/components/ui/Checkbox";
import { Switch } from "@/components/ui/Switch";
import { Label } from "@/components/ui/Label";
import { Separator } from "@/components/ui/Separator";
import { UserAvatar } from "@/components/ui/Avatar";
import { AppHeader } from "@/components/ui/Header";
import { SimpleTooltip, TooltipProvider } from "@/components/ui/Tooltip";
import { Modal } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

describe("Checkbox", () => {
  it("toggles checked state", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Checkbox
        aria-label="Accept terms"
        onCheckedChange={onCheckedChange}
      />,
    );
    await user.click(screen.getByRole("checkbox", { name: "Accept terms" }));
    expect(onCheckedChange).toHaveBeenCalled();
  });
});

describe("Switch", () => {
  it("toggles on click", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Switch aria-label="Compact mode" onCheckedChange={onCheckedChange} />,
    );
    await user.click(screen.getByRole("switch", { name: "Compact mode" }));
    expect(onCheckedChange).toHaveBeenCalled();
  });
});

describe("Label", () => {
  it("renders text", () => {
    render(<Label htmlFor="name">Name</Label>);
    expect(screen.getByText("Name")).toBeInTheDocument();
  });
});

describe("Separator", () => {
  it("renders with separator slot", () => {
    const { container } = render(<Separator />);
    expect(container.querySelector('[data-slot="separator"]')).toBeTruthy();
  });
});

describe("UserAvatar", () => {
  it("shows initials from name", () => {
    render(<UserAvatar name="Ayesha Khan" />);
    expect(screen.getByText("AK")).toBeInTheDocument();
  });
});

describe("AppHeader", () => {
  it("renders title, description, and actions", () => {
    render(
      <AppHeader
        title="Users"
        description="Manage accounts"
        actions={<button type="button">Add</button>}
      />,
    );
    expect(screen.getByRole("heading", { name: "Users" })).toBeInTheDocument();
    expect(screen.getByText("Manage accounts")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });
});

describe("SimpleTooltip", () => {
  it("wraps the trigger element", () => {
    render(
      <TooltipProvider>
        <SimpleTooltip content="Delete item" side="top">
          <button type="button">Trash</button>
        </SimpleTooltip>
      </TooltipProvider>,
    );
    expect(screen.getByRole("button", { name: "Trash" })).toBeInTheDocument();
  });
});

describe("Modal", () => {
  it("opens from trigger and shows title", async () => {
    const user = userEvent.setup();
    render(
      <Modal
        trigger={<Button>Open modal</Button>}
        title="Invite user"
        description="Send an invite email"
      >
        <p>Modal body</p>
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "Open modal" }));
    expect(await screen.findByText("Invite user")).toBeInTheDocument();
    expect(screen.getByText("Send an invite email")).toBeInTheDocument();
    expect(screen.getByText("Modal body")).toBeInTheDocument();
  });
});
