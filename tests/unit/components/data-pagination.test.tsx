import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataPagination } from "@/components/ui/Pagination";

describe("DataPagination", () => {
  it("calls onPageChange for next and previous", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    const { rerender } = render(
      <DataPagination page={2} pageCount={5} onPageChange={onPageChange} />,
    );

    await user.click(
      screen.getByRole("button", { name: "Go to next page" }),
    );
    expect(onPageChange).toHaveBeenCalledWith(3);

    onPageChange.mockClear();
    rerender(
      <DataPagination page={2} pageCount={5} onPageChange={onPageChange} />,
    );
    await user.click(
      screen.getByRole("button", { name: "Go to previous page" }),
    );
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("marks the active page", () => {
    render(
      <DataPagination page={3} pageCount={5} onPageChange={() => undefined} />,
    );
    const active = document.querySelector(
      '[data-slot="pagination-link"][aria-current="page"]',
    );
    expect(active).toHaveTextContent("3");
  });

  it("does not navigate when already at bounds", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <DataPagination page={1} pageCount={1} onPageChange={onPageChange} />,
    );

    const prev = screen.getByRole("button", { name: "Go to previous page" });
    const next = screen.getByRole("button", { name: "Go to next page" });
    await user.click(prev);
    await user.click(next);
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
