import { CourseServiceInterface } from "./ICourseService";
import { BodyInterface } from "./IBody";
import { DailyRoutinesInterface } from "./IDailyRoutines";
import { TrainerInterface } from "./ITrainer";

export interface AdviceInterface {
    ID?: number,
    Advice?: string,
    RecordingDate?: Date | undefined | null,

    TrainerID?: number,
    Trainer?: TrainerInterface,

    CourseServiceID?: number,
    CourseService?: CourseServiceInterface,

    BodyID?: number,
    Body?: BodyInterface,

    DailyRoutinesID?: number,
    DailyRoutines?: DailyRoutinesInterface,

}