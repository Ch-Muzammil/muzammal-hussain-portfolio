import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/Spinner"
import { buttonVariants } from "./variants"

type IconPosition = "left" | "right"

export interface ButtonProps
  extends Omit<ButtonPrimitive.Props, "onClick">,
    VariantProps<typeof buttonVariants> {
  /** Icon element, e.g. <Trash2 /> — sizing is handled automatically. */
  icon?: React.ReactNode
  /** Which side the icon renders on. Ignored if `icon` isn't passed. Default: "left". */
  iconPosition?: IconPosition
  /** Shows a spinner and disables the button. Overrides `icon` on that side while true. */
  loading?: boolean
  /** Optional text swap while loading, e.g. "Saving...". Defaults to children unchanged. */
  loadingText?: React.ReactNode
  /**
   * Supports sync AND async onClick. If the handler returns a Promise, the
   * button automatically disables itself until it resolves — this is what
   * stops double/triple submit clicks without you managing loading state
   * by hand on every single button.
   */
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void | Promise<void>
}

function Button({
  className,
  variant = "default",
  size = "default",
  fullWidth,
  icon,
  iconPosition = "left",
  loading = false,
  loadingText,
  disabled,
  type = "button", // deliberate: prevents accidental form-submit behavior
  onClick,
  children,
  ...props
}: ButtonProps) {
  // Internal guard for async onClick handlers — separate from the
  // external `loading` prop so this works even if the caller never
  // wires up loading state themselves.
  const [isProcessing, setIsProcessing] = React.useState(false)

  const isBusy = loading || isProcessing
  const isDisabled = disabled || isBusy

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled || !onClick) return

    const result = onClick(event)

    // Only engage the guard if the handler is actually async — a plain
    // sync handler (e.g. toggling a menu) shouldn't get a busy state.
    if (result instanceof Promise) {
      setIsProcessing(true)
      try {
        await result
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const iconNode = isBusy ? (
    <Spinner
      size="sm"
      className="text-current"
      data-icon={iconPosition === "left" ? "inline-start" : "inline-end"}
    />
  ) : icon ? (
    <span data-icon={iconPosition === "left" ? "inline-start" : "inline-end"}>
      {icon}
    </span>
  ) : null

  return (
    <ButtonPrimitive
      data-slot="button"
      type={type}
      disabled={isDisabled}
      aria-busy={isBusy}
      onClick={handleClick}
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    >
      {iconPosition === "left" && iconNode}
      {isBusy && loadingText ? loadingText : children}
      {iconPosition === "right" && iconNode}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
