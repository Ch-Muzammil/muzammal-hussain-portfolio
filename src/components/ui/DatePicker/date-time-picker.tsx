"use client";

import * as React from "react";
import {
  format as formatDate,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  type Locale,
} from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";
import type { Matcher } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { buildDisabledMatchers } from "./date-bounds";
export type DateTimePickerProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  defaultValue?: Date;
  placeholder?: string;
  /** Combined date+time display format. Default: PPp */
  format?: string;
  disabled?: boolean;
  disabledDays?: Matcher | Matcher[];
  fromDate?: Date;
  toDate?: Date;
  captionLayout?: React.ComponentProps<typeof Calendar>["captionLayout"];
  /** 12 or 24 hour clock. Default: 24 */
  hourCycle?: 12 | 24;
  /** Minute step (1, 5, 10, 15, 30…). Default: 5 */
  minuteStep?: number;
  /** Show seconds. Default: false */
  showSeconds?: boolean;
  /** Prefer native time input instead of selects. Default: false */
  nativeTimeInput?: boolean;
  closeOnSelect?: boolean;
  align?: React.ComponentProps<typeof PopoverContent>["align"];
  side?: React.ComponentProps<typeof PopoverContent>["side"];
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  id?: string;
  name?: string;
  locale?: Locale;
  timeZone?: string;
  fullWidth?: boolean;
  /** Min/max time on the selected day (HH:mm) */
  minTime?: string;
  maxTime?: string;
  /** Optional label above the picker */
  label?: React.ReactNode;
  /** Optional error message below the picker */
  error?: React.ReactNode;
  fieldClassName?: string;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function parseTimeBound(bound?: string): { h: number; m: number } | null {
  if (!bound) return null;
  const [h, m] = bound.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return { h: h!, m: m! };
}

function applyTime(base: Date, hours: number, minutes: number, seconds = 0) {
  return setMilliseconds(
    setSeconds(setMinutes(setHours(base, hours), minutes), seconds),
    0,
  );
}

function to12Hour(hours24: number): { hour: number; period: "AM" | "PM" } {
  const period = hours24 >= 12 ? "PM" : "AM";
  const hour = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return { hour, period };
}

function from12Hour(hour: number, period: "AM" | "PM"): number {
  if (period === "AM") return hour === 12 ? 0 : hour;
  return hour === 12 ? 12 : hour + 12;
}

/**
 * Date + time picker (shadcn Calendar + Popover + time controls).
 *
 * HOW TO USE:
 *   <DateTimePicker value={dt} onChange={setDt} />
 *   <DateTimePicker hourCycle={12} minuteStep={15} showSeconds />
 *   <DateTimePicker nativeTimeInput />
 */
export function DateTimePicker({
  value: controlledValue,
  onChange,
  defaultValue,
  placeholder = "Pick date & time",
  format = "PPp",
  disabled = false,
  disabledDays,
  fromDate,
  toDate,
  captionLayout = "dropdown",
  hourCycle = 24,
  minuteStep = 5,
  showSeconds = false,
  nativeTimeInput = false,
  closeOnSelect = false,
  align = "start",
  side = "bottom",
  className,
  triggerClassName,
  contentClassName,
  id,
  name,
  locale,
  timeZone,
  fullWidth = false,
  minTime,
  maxTime,
  label,
  error,
  fieldClassName,
}: DateTimePickerProps) {
  const autoId = React.useId();
  const fieldId = id ?? (label != null && label !== "" ? autoId : undefined);
  const [open, setOpen] = React.useState(false);
  const isControlled = onChange != null;
  const [uncontrolled, setUncontrolled] = React.useState<Date | undefined>(
    defaultValue,
  );
  const value = isControlled ? controlledValue : uncontrolled;

  const commit = (next: Date | undefined) => {
    if (isControlled) onChange?.(next);
    else setUncontrolled(next);
  };

  const hours24 = value?.getHours() ?? 0;
  const minutes = value?.getMinutes() ?? 0;
  const seconds = value?.getSeconds() ?? 0;
  const { hour: hour12, period } = to12Hour(hours24);

  const minuteOptions = React.useMemo(() => {
    const step = Math.max(1, minuteStep);
    const opts: number[] = [];
    for (let m = 0; m < 60; m += step) opts.push(m);
    if (!opts.includes(minutes)) opts.push(minutes);
    return opts.sort((a, b) => a - b);
  }, [minuteStep, minutes]);

  const minBound = parseTimeBound(minTime);
  const maxBound = parseTimeBound(maxTime);

  const isTimeDisabled = (h: number, m: number) => {
    const total = h * 60 + m;
    if (minBound && total < minBound.h * 60 + minBound.m) return true;
    if (maxBound && total > maxBound.h * 60 + maxBound.m) return true;
    return false;
  };

  const ensureDate = (base?: Date) => base ?? new Date();

  const updateTime = (nextH: number, nextM: number, nextS = seconds) => {
    const base = ensureDate(value);
    commit(applyTime(base, nextH, nextM, nextS));
  };

  const onSelectDate = (date: Date | undefined) => {
    if (!date) {
      commit(undefined);
      return;
    }
    const next = applyTime(date, hours24, minutes, showSeconds ? seconds : 0);
    commit(next);
    if (closeOnSelect) setOpen(false);
  };

  const displayValue = value ? formatDate(value, format, { locale }) : null;

  const timeValueForNative = `${pad(hours24)}:${pad(minutes)}${
    showSeconds ? `:${pad(seconds)}` : ""
  }`;

  return (
    <Field id={fieldId} label={label} error={error} className={fieldClassName}>
      <div className={cn(fullWidth && "w-full", className)}>
        {name ? (
          <input type="hidden" name={name} value={value?.toISOString() ?? ""} />
        ) : null}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            disabled={disabled}
            render={
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
              >
                {displayValue ?? <span>{placeholder}</span>}
              </Button>
            }
          />
        <PopoverContent
          align={align}
          side={side}
          className={cn("w-auto p-0", contentClassName)}
        >
          <Calendar
            mode="single"
            selected={value}
            onSelect={onSelectDate}
            disabled={buildDisabledMatchers(disabledDays, fromDate, toDate)}
            captionLayout={captionLayout}
            showOutsideDays
            startMonth={fromDate}
            endMonth={toDate}
            locale={locale}
            timeZone={timeZone}
            autoFocus
          />
          <div className="border-t border-border p-3">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <ClockIcon className="size-4 text-muted-foreground" />
              Time
            </div>

            {nativeTimeInput ? (
              <Input
                type="time"
                step={showSeconds ? 1 : minuteStep * 60}
                value={timeValueForNative}
                disabled={disabled || !value}
                onChange={(e) => {
                  const raw = e.target.value;
                  if (!raw) return;
                  const [h, m, s] = raw.split(":").map(Number);
                  updateTime(h ?? 0, m ?? 0, s ?? 0);
                }}
              />
            ) : (
              <div className="flex flex-wrap items-end gap-2">
                <div className="grid gap-1">
                  <Label className="text-xs text-muted-foreground">Hour</Label>
                  <Select
                    value={String(hourCycle === 12 ? hour12 : hours24)}
                    onValueChange={(v) => {
                      if (v == null) return;
                      const h =
                        hourCycle === 12
                          ? from12Hour(Number(v), period)
                          : Number(v);
                      updateTime(h, minutes);
                    }}
                    disabled={disabled || !value}
                  >
                    <SelectTrigger size="sm" className="w-18">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(hourCycle === 12
                        ? Array.from({ length: 12 }, (_, i) => i + 1)
                        : Array.from({ length: 24 }, (_, i) => i)
                      ).map((h) => {
                        const h24 =
                          hourCycle === 12 ? from12Hour(h, period) : h;
                        return (
                          <SelectItem
                            key={h}
                            value={String(h)}
                            disabled={isTimeDisabled(h24, minutes)}
                          >
                            {pad(h)}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-1">
                  <Label className="text-xs text-muted-foreground">Min</Label>
                  <Select
                    value={String(minutes)}
                    onValueChange={(v) => {
                      if (v == null) return;
                      updateTime(hours24, Number(v));
                    }}
                    disabled={disabled || !value}
                  >
                    <SelectTrigger size="sm" className="w-18">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {minuteOptions.map((m) => (
                        <SelectItem
                          key={m}
                          value={String(m)}
                          disabled={isTimeDisabled(hours24, m)}
                        >
                          {pad(m)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {showSeconds ? (
                  <div className="grid gap-1">
                    <Label className="text-xs text-muted-foreground">Sec</Label>
                    <Select
                      value={String(seconds)}
                      onValueChange={(v) => {
                        if (v == null) return;
                        updateTime(hours24, minutes, Number(v));
                      }}
                      disabled={disabled || !value}
                    >
                      <SelectTrigger size="sm" className="w-18">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 60 }, (_, i) => i).map((s) => (
                          <SelectItem key={s} value={String(s)}>
                            {pad(s)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : null}

                {hourCycle === 12 ? (
                  <div className="grid gap-1">
                    <Label className="text-xs text-muted-foreground">
                      Period
                    </Label>
                    <Select
                      value={period}
                      onValueChange={(v) => {
                        if (v !== "AM" && v !== "PM") return;
                        updateTime(from12Hour(hour12, v), minutes);
                      }}
                      disabled={disabled || !value}
                    >
                      <SelectTrigger size="sm" className="w-18">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : null}
              </div>
            )}

            {!value ? (
              <p className="mt-2 text-xs text-muted-foreground">
                Select a date first, then set the time.
              </p>
            ) : null}
          </div>
        </PopoverContent>
      </Popover>
      </div>
    </Field>
  );
}
