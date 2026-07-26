import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PasswordField } from "@/components/ui/Input";

describe("PasswordField", () => {
  it("shows live rules while typing and marks them as they pass", async () => {
    const user = userEvent.setup();
    const onValidityChange = vi.fn();

    render(
      <PasswordField
        id="password"
        label="Password"
        onValidityChange={onValidityChange}
      />,
    );

    const input = screen.getByLabelText("Password");
    await user.click(input);
    expect(screen.getByText("At least 8 characters")).toBeInTheDocument();

    await user.type(input, "Str0ng!Pass");
    expect(onValidityChange).toHaveBeenCalledWith(true);
    expect(screen.getByText("One uppercase letter")).toBeInTheDocument();
  });
});
