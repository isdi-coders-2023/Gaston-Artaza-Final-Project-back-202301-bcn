export interface EventStructure {
  id: string;
  name: string;
  location: string;
  image: string;
  date: string;
  time: string;
  organizer: string;
  category: string[];
}

export type Events = [EventStructure];
