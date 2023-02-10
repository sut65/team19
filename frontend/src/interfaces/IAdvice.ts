import { CourseServiceInterface } from "./ICourseService";
import { BodyInterface } from "./IBody";
import { DailyActivitiesInterface } from "./IDailyActivities";

export interface AdviceInterface {
    ID?: number,
    Advice?: string,
    RecordingDate?: Date | undefined | null,

    CourseServiceID?: number,
    CourseService?: CourseServiceInterface,

    BodyID?: number,
    Body?: BodyInterface,

    DailyActivitiesID?: number,
    DailyActivities?: DailyActivitiesInterface,

}