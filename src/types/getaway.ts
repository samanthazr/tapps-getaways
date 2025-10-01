export interface LocationEntry {
  address: string;
  lat: number | null;
  lng: number | null;
}

export type ScheduleRow = {
  id: number;
  day: string;
  startHour: string; // 1 to 12
  startMinute: string; // 00,15,30,45
  startPeriod: string; // AM/PM
  endHour: string;
  endMinute: string;
  endPeriod: string;
  activity: string;
  location: string;
};

export interface ApiScheduleEntry {
  date: string;
  startTime: string;
  endTime: string;
  activity: string;
  location: string;
}

export interface GetawayFormData {
  title: string;
  overview: string;
  startDate: string;
  endDate: string;
  sport: string;
  getawayAddress: LocationEntry;
  galleryPhotos: File[] | null;
  caption?: string;
  galleryVideo: string;
  mainDescription: string;
  lodgingOptions: { name: string, price: number }[];
  optionalAddOns: { name: string, price: number }[];
  amenities: { name: string }[];
  schedule: ApiScheduleEntry[];
  policies: string;
  terms: string;
}