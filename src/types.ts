export interface Event {
  name: string;
  location: string;
  image: string;
  date: string;
  time: string;
  organizer: string;
  category: string[];
}

export type Events = [Event];
