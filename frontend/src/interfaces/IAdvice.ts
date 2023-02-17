import { CourseServiceInterface } from "./ICourseService";
import { BodyInterface } from "./IBody";
import { DailyRoutinesInterface } from "./IDailyRoutines";
import { TrainerInterface } from "./ITrainer";
import { MemberInterface } from "./IMember";

export interface AdviceInterface {
    ID?: number,
    Advice?: string,
    RecordingDate?: Date | undefined | null,

    TrainerID?: number,
    Trainer?: TrainerInterface,

    MemberID?: number,
    Member?: MemberInterface,

    CourseServiceID?: number,
    CourseService?: CourseServiceInterface,

    BodyID?: number,
    Body?: BodyInterface,

    DailyRoutinesID?: number,
    DailyRoutines?: DailyRoutinesInterface,

}