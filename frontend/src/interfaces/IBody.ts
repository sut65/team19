import {TrainerInterface} from "./ITrainer"
import { MemberInterface } from "./IMember";
import {CourseDetailInterface} from "./ICourseDetail"

export interface BodyInterface {
    ID?:        number,
    Height?:        Number,
	Weight?:        Number,
	Hip?:           Number,
	UpperArm?:  Number,
	Thigh ?:    Number,
	NarrowWaist ?:  Number,
	NavelWaist ?:   Number,
	Bmi ?:          Number,
	Note ?:         string,
	CreatedAt ?:	string,

    TrainerID?: number
    Trainer?: TrainerInterface

    MemberID?: number
    Member?: MemberInterface

    CourseDetailID?: number
    CourseDetail?: CourseDetailInterface



    
}