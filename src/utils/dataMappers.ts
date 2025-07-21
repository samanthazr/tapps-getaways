import { ScheduleRow } from '../types/getaway';

// timeHelper converter: 12h to 24h
export function to24h(hour: string, minute: string, period: string): string {
  let h = parseInt(hour, 10);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return `${h.toString().padStart(2, "0")}:${minute}`;
}

export function compareTimes(
  sHour: string, sMin: string, sPer: string,
  eHour: string, eMin: string, ePer: string
): boolean {
  const start = to24h(sHour, sMin, sPer);
  const end = to24h(eHour, eMin, ePer);
  return start < end;
}

export function mapScheduleRowsToApiFormat(
  rows: ScheduleRow[]
): { date: string; startTime: string; endTime: string; activity: string; location: string; }[] {
  return rows.map(row => {
    const formattedDate = row.day;

    const startTime = to24h(row.startHour, row.startMinute, row.startPeriod);
    const endTime = to24h(row.endHour, row.endMinute, row.endPeriod);

    return {
      date: formattedDate,
      startTime: startTime,
      endTime: endTime,
      activity: row.activity,
      location: row.location
    };
  });
}