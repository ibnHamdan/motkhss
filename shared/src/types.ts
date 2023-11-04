export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  email: string;
  password: string;
}

export interface Opportunity {
  id: string;
  title: string;
  url: string;
  userId: string;
  postedAt: number;
  liked?: boolean;
}

export interface Like {
  userId: string;
  opportunityId: string;
}

export interface Comment {
  id: string;
  userId: string;
  opportunityId: string;
  comment: string;
  postedAt: number;
  liked?: boolean;
}
