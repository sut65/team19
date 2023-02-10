import {TrainerInterface} from "./ITrainer"
import { MemberInterface } from "./IMember";
import {CourseDetailInterface} from "./ICourseDetail"

export interface BodyInterface {
    ID?:        number,
    Height?:        number,
	Weight?:        number,
	Hip?:           number,
	UpperArm?:  number,
	Thigh ?:    number,
	NarrowWaist ?:  number,
	NavelWaist ?:   number,
	Bmi ?:          number,
	Note ?:         string,
	CreatedAt ?:	string,

    TrainerID?: number
    Trainer?: TrainerInterface

    MemberID?: number
    Member?: MemberInterface

    CourseDetailID?: number
    CourseDetail?: CourseDetailInterface



    
}