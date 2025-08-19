"use client";

import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";

export function DatePickerDemo() {
  const [date, setDate] = useState<Date>();
  return <DatePicker date={date} setDate={setDate} placeholder="选择入职日期" />;
}