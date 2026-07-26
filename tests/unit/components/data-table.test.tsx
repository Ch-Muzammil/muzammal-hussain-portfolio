import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable, type DataTableColumn } from "@/components/ui/Table";

type Row = { id: string; name: string; score: number };

const rows: Row[] = [
  { id: "1", name: "Beta", score: 2 },
  { id: "2", name: "Alpha", score: 10 },
];

const columns: DataTableColumn<Row>[] = [
  { id: "name", header: "Name", accessor: "name", sortable: true },
  { id: "score", header: "Score", accessor: "score", sortable: true },
];

describe("DataTable", () => {
  it("renders headers and rows", () => {
    render(
      <DataTable columns={columns} data={rows} getRowId={(r) => r.id} />,
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Score")).toBeInTheDocument();
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("shows empty state message", () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        emptyMessage="No rows found."
      />,
    );
    expect(screen.getByText("No rows found.")).toBeInTheDocument();
  });

  it("sorts when enableSort is on", async () => {
    const user = userEvent.setup();

    render(
      <DataTable
        columns={columns}
        data={rows}
        enableSort
        getRowId={(r) => r.id}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Name/i }));

    await waitFor(() => {
      const bodyRows = screen.getAllByRole("row").slice(1);
      expect(bodyRows[0]).toHaveTextContent("Alpha");
      expect(bodyRows[1]).toHaveTextContent("Beta");
    });
  }, 15_000);

  it("renders loading skeletons", () => {
    const { container } = render(
      <DataTable columns={columns} data={rows} isLoading loadingRows={3} />,
    );
    expect(container.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(
      6,
    );
  });
});
