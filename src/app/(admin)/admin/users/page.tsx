"use client";

import { useMemo, useState } from "react";
import { Info, Plus, Trash2 } from "lucide-react";
import {
  DataTable,
  type DataTableColumn,
} from "@/components/ui/Table";
import { SimpleTooltip } from "@/components/ui/Tooltip";
import { Button } from "@/components/ui/Button";
import { AppHeader } from "@/components/ui/Header";
import { UserAvatar } from "@/components/ui/Avatar";
import { DataPagination } from "@/components/ui/Pagination";
import { Modal } from "@/components/ui/Dialog";
import { ConfirmDialog } from "@/components/ui/AlertDialog";
import { Switch } from "@/components/ui/Switch";
import { Checkbox } from "@/components/ui/Checkbox";
import { Separator } from "@/components/ui/Separator";
import { Label } from "@/components/ui/Label";
import { Loader } from "@/components/ui/Spinner";
import { Input } from "@/components/ui/Input";

type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "invited" | "disabled";
};

const DEMO_USERS: DemoUser[] = [
  {
    id: "1",
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: "2",
    name: "Bilal Ahmed",
    email: "bilal@example.com",
    role: "Freelancer",
    status: "invited",
  },
  {
    id: "3",
    name: "Sara Malik",
    email: "sara@example.com",
    role: "Client",
    status: "active",
  },
  {
    id: "4",
    name: "Omar Sheikh",
    email: "omar@example.com",
    role: "Freelancer",
    status: "disabled",
  },
];

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [compact, setCompact] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const columns = useMemo<DataTableColumn<DemoUser>[]>(
    () => [
      {
        id: "select",
        header: (
          <Checkbox
            aria-label="Select all"
            checked={selected.length === DEMO_USERS.length}
            onCheckedChange={(checked) => {
              setSelected(checked ? DEMO_USERS.map((u) => u.id) : []);
            }}
          />
        ),
        width: 44,
        cell: (row) => (
          <Checkbox
            aria-label={`Select ${row.name}`}
            checked={selected.includes(row.id)}
            onCheckedChange={(checked) => {
              setSelected((prev) =>
                checked
                  ? [...prev, row.id]
                  : prev.filter((id) => id !== row.id),
              );
            }}
            onClick={(e) => e.stopPropagation()}
          />
        ),
      },
      {
        id: "name",
        header: "Name",
        accessor: "name",
        sortable: true,
        width: 200,
        minWidth: 160,
        sticky: true,
        cell: (row) => (
          <div className="flex items-center gap-2">
            <UserAvatar name={row.name} size="sm" />
            <span className="font-medium">{row.name}</span>
          </div>
        ),
      },
      {
        id: "email",
        header: "Email",
        accessor: "email",
        sortable: true,
        minWidth: 200,
        truncate: true,
        hideBelow: "md",
      },
      {
        id: "role",
        header: "Role",
        accessor: "role",
        sortable: true,
        width: 120,
      },
      {
        id: "status",
        header: (
          <span className="inline-flex items-center gap-1">
            Status
            <SimpleTooltip content="Account status from the backend" side="top">
              <span className="inline-flex text-muted-foreground">
                <Info className="size-3.5" />
              </span>
            </SimpleTooltip>
          </span>
        ),
        accessor: "status",
        sortable: true,
        width: 110,
        cell: (row) => (
          <span className="capitalize text-muted-foreground">{row.status}</span>
        ),
      },
      {
        id: "actions",
        header: "",
        width: 56,
        align: "right",
        cell: (row) => (
          <ConfirmDialog
            trigger={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Delete ${row.name}`}
              >
                <Trash2 />
              </Button>
            }
            title={`Delete ${row.name}?`}
            description="This is a demo confirm dialog — nothing is deleted."
            confirmLabel="Delete"
            destructive
            onConfirm={async () => {
              await new Promise((r) => setTimeout(r, 400));
            }}
          />
        ),
      },
    ],
    [selected],
  );

  return (
    <div className="space-y-4">
      <AppHeader
        bordered={false}
        className="py-0"
        title="Users"
        description="DataTable + loaders, pagination, modal, confirm, switch."
        actions={
          <>
            <div className="flex items-center gap-2">
              <Switch
                id="compact"
                checked={compact}
                onCheckedChange={setCompact}
                size="sm"
              />
              <Label htmlFor="compact" className="text-xs text-muted-foreground">
                Compact
              </Label>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                setLoading(true);
                await new Promise((r) => setTimeout(r, 700));
                setLoading(false);
              }}
            >
              Simulate loading
            </Button>
            <Modal
              trigger={
                <Button size="sm" icon={<Plus />}>
                  Invite
                </Button>
              }
              title="Invite user"
              description="Demo modal — wire to your API later."
              size="md"
              footer={
                <Button type="submit" form="invite-form">
                  Send invite
                </Button>
              }
            >
              <form id="invite-form" className="grid gap-3" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-1.5">
                  <Label htmlFor="invite-email">Email</Label>
                  <Input id="invite-email" type="email" placeholder="name@company.com" />
                </div>
              </form>
            </Modal>
          </>
        }
      />

      <Separator />

      <DataTable
        columns={columns}
        data={DEMO_USERS}
        getRowId={(row) => row.id}
        enableSort
        stickyHeader
        maxHeight={420}
        isLoading={loading}
        density={compact ? "compact" : "default"}
        minTableWidth={720}
        emptyMessage="No users found."
      />

      <DataPagination page={page} pageCount={5} onPageChange={setPage} />

      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          Spinner <Loader variant="spinner" size="sm" />
        </span>
        <span className="inline-flex items-center gap-2">
          Dots <Loader variant="dots" />
        </span>
        <span className="inline-flex items-center gap-2">
          Skeleton{" "}
          <Loader
            variant="skeleton"
            skeleton={{ count: 2, shape: "text", itemClassName: "w-16 h-3" }}
          />
        </span>
      </div>
    </div>
  );
}
