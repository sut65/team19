import { DescriptionInterface } from "./IDescription";
import { AdminInterface } from "./IAdmin";
import { PriceInterface } from "./IPrice";

export interface CourseDetailInterface {
    ID?:            number,
    Name?:          string,
    CoverPage?:     string,
    DescriptionID?: number,
    Description?:   DescriptionInterface,
    AdminID?:       number,
    Admin?:         AdminInterface,
    PriceID?:       number,
    Price?:         PriceInterface,
}