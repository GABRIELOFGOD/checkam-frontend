import { IUser } from "@/models/user";
// export const Contituencies = ["Ife-north", "ifelodun", "ife-south", "ede", "osogbo-south", "mayfair", "modakeke", "ijabe", "erin"];

export interface DiscussionComment {
  by: IUser;
  message: string;
  comments: DiscussionComment[];
  likes: IUser[];
};

// export interface DiscussionType {
//   postedBy: IUser;
//   content: string;
//   likes: IUser[];
//   comments: DiscussionComment[];
//   constituencies: string[];
//   tags: IUser[];
//   notableComments: IUser[];
// }