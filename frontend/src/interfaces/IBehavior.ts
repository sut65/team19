import { UserInterface } from "./IUser";
import { ExerciseInterface } from "./IExercise";
import { TatseInterface } from "./ITatse";

export interface Behavior {
    ID?:                    number;
    Meals?:             string;
    Time?:              string;
    Exercise?: ExerciseInterface;
    ExerciseID?: number;
    Tatse?: TatseInterface;
    TatseID?: number;
    Member?:  UserInterface 
    MemberID?:   number;
}