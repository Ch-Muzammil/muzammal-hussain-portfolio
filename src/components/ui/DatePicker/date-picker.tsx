"use client";

import * as React from "react";
import { format as formatDate, type Locale } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange, Matcher } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import { Field } from "@/components/ui/Field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { buildDisabledMatchers } from "./date-bounds";
export type DatePickerPreset = {
  label: string;
  value: Date | (() => Date);
};

export type DatePickerProps = {
  /** Controlled value (single mode) */
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  /** Uncontrolled initial value */
  defaultValue?: Date;
  /** Range mode */
  mode?: "single" | "range";
  rangeValue?: DateRange;
  onRangeChange?: (range: DateRange | undefined) => void;
  defaultRangeValue?: DateRange;
  placeholder?: string;
  /** date-fns format string. Default: PPP (single) / LL..LL (range) */
  format?: string;
  rangeFormat?: string;
  disabled?: boolean;
  /** Disable calendar days */
  disabledDays?: Matcher | Matcher[];
  fromDate?: Date;
  toDate?: Date;
  /** Month/year dropdowns — great for DOB */
  captionLayout?: React.ComponentProps<typeof Calendar>["captionLayout"];
  numberOfMonths?: number;
  showOutsideDays?: boolean;
  /** Close popover after selecting a date (single mode). Default: true */
  closeOnSelect?: boolean;
  /** Quick presets shown beside/above the calendar */
  presets?: DatePickerPreset[];
  align?: React.ComponentProps<typeof PopoverContent>["align"];
  side?: React.ComponentProps<typeof PopoverContent>["side"];
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  /** Custom trigger — receives formatted label */
  trigger?: React.ReactElement;
  id?: string;
  name?: string;
  locale?: Locale;
  timeZone?: string;
  /** Full width trigger */
  fullWidth?: boolean;
  /** Optional label above the picker */
  label?: React.ReactNode;
  /** Optional error message below the picker */
  error?: React.ReactNode;
  fieldClassName?: string;
};

function resolvePreset(preset: DatePickerPreset): Date {
  return typeof preset.value === "function" ? preset.value() : preset.value;
}

/**
 * Production DatePicker — Popover + Calendar (shadcn composition).
 *
 * HOW TO USE:
 *   <DatePicker value={date} onChange={setDate} />
 *   <DatePicker mode="range" rangeValue={range} onRangeChange={setRange} numberOfMonths={2} />
 *   <DatePicker captionLayout="dropdown" fromDate={new Date(1960,0,1)} toDate={new Date()} />
 */
export function DatePicker({
  value: controlledValue,
  onChange,
  defaultValue,
  mode = "single",
  rangeValue: controlledRange,
  onRangeChange,
  defaultRangeValue,
  placeholder = "Pick a date",
  format = "PPP",
  rangeFormat,
  disabled = false,
  disabledDays,
  fromDate,
  toDate,
  captionLayout = "label",
  numberOfMonths = 1,
  showOutsideDays = true,
  closeOnSelect = true,
  presets,
  align = "start",
  side = "bottom",
  className,
  triggerClassName,
  contentClassName,
  trigger,
  id,
  name,
  locale,
  timeZone,
  fullWidth = false,
  label,
  error,
  fieldClassName,
}: DatePickerProps) {
  const autoId = React.useId();
  const fieldId = id ?? (label != null && label !== "" ? autoId : undefined);
  const [open, setOpen] = React.useState(false);

  const isSingleControlled = onChange != null;
  const [uncontrolled, setUncontrolled] = React.useState<Date | undefined>(
    defaultValue,
  );
  const value = isSingleControlled ? controlledValue : uncontrolled;
  const setValue = (next: Date | undefined) => {
    if (isSingleControlled) onChange?.(next);
    else setUncontrolled(next);
  };

  const isRangeControlled = onRangeChange != null;
  const [uncontrolledRange, setUncontrolledRange] = React.useState<
    DateRange | undefined
  >(defaultRangeValue);
  const range = isRangeControlled ? controlledRange : uncontrolledRange;
  const setRange = (next: DateRange | undefined) => {
    if (isRangeControlled) onRangeChange?.(next);
    else setUncontrolledRange(next);
  };

  const displayValue = React.useMemo(() => {
    if (mode === "range") {
      if (!range?.from) return null;
      const fmt = rangeFormat ?? format;
      if (range.to) {
        return `${formatDate(range.from, fmt, { locale })} – ${formatDate(range.to, fmt, { locale })}`;
      }
      return formatDate(range.from, fmt, { locale });
    }
    if (!value) return null;
    return formatDate(value, format, { locale });
  }, [mode, range, rangeFormat, format, value, locale]);

  const startMonth = fromDate;
  const endMonth = toDate;
  const disabledMatchers = buildDisabledMatchers(
    disabledDays,
    fromDate,
    toDate,
  );

  const defaultTrigger = (
    <Button
      id={fieldId}
      type="button"
      variant="outline"
      disabled={disabled}
      data-empty={!displayValue}
      aria-invalid={Boolean(error)}
      className={cn(
        "justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
        fullWidth && "w-full",
        triggerClassName,
      )}
      icon={<CalendarIcon />}
      iconPosition="left"
    >
      {displayValue ?? <span>{placeholder}</span>}
    </Button>
  );

  return (
    <Field id={fieldId} label={label} error={error} className={fieldClassName}>
      <div className={cn(fullWidth && "w-full", className)}>
        {name ? (
          <input
            type="hidden"
            name={name}
            value={
              mode === "range"
                ? range?.from && range?.to
                  ? `${range.from.toISOString()}|${range.to.toISOString()}`
                  : ""
                : value?.toISOString() ?? ""
            }
          />
        ) : null}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            disabled={disabled}
            render={(trigger as React.ReactElement) ?? defaultTrigger}
          />
          <PopoverContent
            align={align}
            side={side}
            className={cn("w-auto p-0", contentClassName)}
          >
            <div
              className={cn(
                "flex flex-col sm:flex-row",
                presets?.length ? "sm:divide-x" : undefined,
              )}
            >
              {presets?.length ? (
                <div className="flex flex-row gap-1 overflow-x-auto p-3 sm:w-40 sm:flex-col sm:overflow-visible">
                  {presets.map((preset) => (
                    <Button
                      key={preset.label}
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="justify-start"
                      onClick={() => {
                        const date = resolvePreset(preset);
                        if (mode === "range") {
                          setRange({ from: date, to: date });
                        } else {
                          setValue(date);
                          if (closeOnSelect) setOpen(false);
                        }
                      }}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              ) : null}

              {mode === "range" ? (
                <Calendar
                  mode="range"
                  selected={range}
                  onSelect={(next) => {
                    setRange(next);
                    if (closeOnSelect && next?.from && next?.to) setOpen(false);
                  }}
                  disabled={disabledMatchers}
                  captionLayout={captionLayout}
                  numberOfMonths={numberOfMonths}
                  showOutsideDays={showOutsideDays}
                  startMonth={startMonth}
                  endMonth={endMonth}
                  locale={locale}
                  timeZone={timeZone}
                  autoFocus
                />
              ) : (
                <Calendar
                  mode="single"
                  selected={value}
                  onSelect={(next) => {
                    setValue(next);
                    if (closeOnSelect) setOpen(false);
                  }}
                  disabled={disabledMatchers}
                  captionLayout={captionLayout}
                  numberOfMonths={numberOfMonths}
                  showOutsideDays={showOutsideDays}
                  startMonth={startMonth}
                  endMonth={endMonth}
                  locale={locale}
                  timeZone={timeZone}
                  autoFocus
                />
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </Field>
  );
}
