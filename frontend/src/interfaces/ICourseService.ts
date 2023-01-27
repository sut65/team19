import { UserInterface } from "./IUser";
import { CourseDetailInterface } from "./ICourseDetail";
import { TrainerInterface } from "./ITrainer";

export interface CourseServiceInterface {
    ID?:                    number;
    CRegisterDate?:         Date | undefined | null;
    Agreement?:             string;
    Status?:                string;
    UserID?:                number;
    User?:                  UserInterface;
    CourseDetailID?:        number;
    CourseDetail?:          CourseDetailInterface;
    TrainerID?:             number;
    Trainer?:               TrainerInterface;
}