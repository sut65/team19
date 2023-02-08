import { CourseTypeInterface } from "./ICourseType";
import { AdminInterface } from "./IAdmin";
import { PriceInterface } from "./IPrice";

export interface CourseDetailInterface {
    ID?:            number,
    CourseName?:    string,
    CoverPage?:     string,
    Description?:    string,
    Goal?:          string,

    CourseTypeID?:  number,
    CourseType?:    CourseTypeInterface,

    AdminID?:       number,
    Admin?:         AdminInterface,

    PriceID?:       number,
    Price?:         PriceInterface,
}