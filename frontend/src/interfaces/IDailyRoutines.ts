import { MemberInterface } from './IMember';
import { MealTimeInterface } from './IMealTime';
import { ActivityInterface } from './IActivity';
import { SleepScheduleInterface } from './ISleepSchedule';


export interface DailyRoutinesInterface {
    ID?:            number
    Name?:          string
    Description?:         string
    TimeStamp?:      string

    MemberID?:               number
    Member?: MemberInterface

    ActivityID?:    number
    Activity?:      ActivityInterface

    MealTimeID?:      number
    MealTime?: MealTimeInterface

    SleepScheduleID?:      number
    SleepSchedule?:        SleepScheduleInterface

}
