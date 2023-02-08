import { MemberInterface } from "./IMember";
import { ExerciseInterface } from "./IExercise";
import { TatseInterface } from "./ITatse";

export interface BehaviorInterface {
    ID?:                    number;
    Meals?:             string;
    Time?:              string;

    Exercise?: ExerciseInterface;
    ExerciseID?: number;

    Tatse?: TatseInterface;
    TatseID?: number;
    
    Member?:  MemberInterface 
    MemberID?:   number;

}