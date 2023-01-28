import { CategoryInterface } from "./ICategory";
import { TagInterface } from "./ITag";
import { MemberInterface } from "./IMember";

export interface BlogInterface {
  ID?: number;
  CoverImage?: string
  Title?: string
  Content?: string
  CreatedAt?: string

  CategoryID?: number
  Category?: CategoryInterface

  TagID?: number
  Tag?: TagInterface

  MemberID?: number
  Member?: MemberInterface
}
