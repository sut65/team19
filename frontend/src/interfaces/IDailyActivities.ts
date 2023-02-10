import { AdminInterface } from "./IAdmin";
import { MemberInterface } from "./IMember";
import { ActivitiesTypeInterface } from "./IActivitiesType";

export interface DailyActivitiesInterface {
    ID?: number,
    Name?: string,
    Duration?: string,
    Date?: string,

    ActivitiesTypeID?: number,
    ActivitiesType?: ActivitiesTypeInterface,

    AdminID?: number,
    Admin?: AdminInterface,

    MemberID?: number,
    Member?: MemberInterface,


}