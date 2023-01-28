import { MemberInterface } from "./IMember";
import { TrainerInterface } from "./ITrainer";
import { BodyInterface } from "./IBody";

export interface AdviceInterface {
    ID?: number,
    Advice?: string,
    RecordingDate?: Date | undefined | null,

    TrainerID?: number,
    Trainer?: TrainerInterface,

    MemberID?: number,
    Member?: MemberInterface,

    BodyID?: number,
    Body?: BodyInterface,

    // DailyActivitiesID?: number,
    // DailyActivities?; DailyActivitiesInterface,

}