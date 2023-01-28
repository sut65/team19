import { CourseDetailInterface } from "./ICourseDetail";
import { RankInterface } from "./IRank";
import { MemberInterface } from "./IMember";

export interface ReviewInterface {
  ID?: number;
  Image?: string
  Content?: string
  CreatedAt?: string

  RankID?: number
  Rank?: RankInterface

  CourseDetailID?: number
  CourseDetail?: CourseDetailInterface

  MemberID?: number
  Member?: MemberInterface
}
