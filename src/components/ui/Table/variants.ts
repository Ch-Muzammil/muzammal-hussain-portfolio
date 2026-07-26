import { cva } from "class-variance-authority";

export const tableVariants = cva("w-full caption-bottom text-sm", {
  variants: {
    density: {
      default: "",
      compact: "[&_th]:h-8 [&_th]:px-2 [&_td]:p-1.5 [&_td]:text-xs",
      comfortable: "[&_th]:h-12 [&_th]:px-3 [&_td]:p-3",
    },
  },
  defaultVariants: {
    density: "default",
  },
});

export const tableHeadVariants = cva(
  "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
);

export const tableCellVariants = cva(
  "p-2 align-middle [&:has([role=checkbox])]:pr-0",
  {
    variants: {
      truncate: {
        true: "max-w-0 truncate",
        false: "whitespace-nowrap",
      },
    },
    defaultVariants: {
      truncate: false,
    },
  },
);
