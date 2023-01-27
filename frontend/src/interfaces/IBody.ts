import {TrainerInterface} from "./ITrainer"
import {UserInterface} from "./IUser"
import {CourseDetailInterface} from "./ICourseDetail"

export interface BodyInterface {
    ID?:        number,
    Hieght?:        Number,
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
    Member?: UserInterface

    CourseDetailID?: number
    CourseDetail?: CourseDetailInterface



    
}