export interface IProfile {
  id: number;
  userid: number;
  handle: string;
  company: string;
  website: string;
  location: string;
  status: string;
  bio: string;
  skills: string;
  github: string;
  youtube: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  twitter: string;
  date_added: string;
  name: string;
  avatar: string;
}

export interface IEducation {
  id: number;
  userid: number;
  school: string;
  degree: string;
  fieldofstudy: string;
  from_date: string;
  to_date: string;
  current: number;
  description: string;
}
export interface IExperience {
  id: number;
  userid: number;
  title: string;
  company: string;
  location: string;
  from_date: string;
  to_date: string;
  current: number;
  description: string;
}
