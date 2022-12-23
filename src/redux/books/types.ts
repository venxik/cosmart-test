export type WorkDetails = {
  key: string;
  title: string;
  edition_count: number;
  authors: AuthorsDetails[];
  has_fulltext: boolean;
  ia: string;
};

export type AuthorsDetails = {
  name: string;
  key: string;
};

export type SubjectsResponse = {
  key: string;
  name: string;
  subject_type: string;
  work_count: number;
  works: WorkDetails[];
};

export type BookingInformation = WorkDetails & { bookingDate: string };

export type InitialState = {
  bookingInformation: BookingInformation[];
};
