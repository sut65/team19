import { CourseServiceInterface } from "./ICourseService";
import { BodyInterface } from "./IBody";
import { DailyRoutinesInterface } from "./IDailyRoutines";

export interface AdviceInterface {
    ID?: number,
    Advice?: string,
    RecordingDate?: Date | undefined | null,

    CourseServiceID?: number,
    CourseService?: CourseServiceInterface,

    BodyID?: number,
    Body?: BodyInterface,

    DailyRoutinesID?: number,
    DailyRoutines?: DailyRoutinesInterface,

}