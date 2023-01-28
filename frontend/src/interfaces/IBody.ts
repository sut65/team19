import {TrainerInterface} from "./ITrainer"
import { MemberInterface } from "./IMember";
import {CourseDetailInterface} from "./ICourseDetail"

export interface BodyInterface {
    ID?:        number,
    Height?:        Number,
	Weight?:        Number,
	Hip?:           Number,
	UpperArmLeft?:  Number,
	UpperArmRight?: Number,
	LeftThigh ?:    Number,
	RightThigh ?:   Number,
	NarrowWaist ?:  Number,
	NavelWaist ?:   Number,
	Bmi ?:          Number,
	Note ?:         string,

    TrainerID?: number
    Trainer?: TrainerInterface

    MemberID?: number
    Member?: MemberInterface

    CourseDetailID?: number
    CourseDetail?: CourseDetailInterface



    
}