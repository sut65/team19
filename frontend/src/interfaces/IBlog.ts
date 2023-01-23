import { CategoryInterface } from "./ICategory";
import { TagInterface } from "./ITag";
import { UserInterface } from "./IUser";

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
  Member?: UserInterface
}
