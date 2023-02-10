import { MemberInterface } from "./IMember";
import { ExerciseInterface } from "./IExercise";
import { TasteInterface } from "./ITatse";

export interface BehaviorInterface {
    ID?:                    number;
    Meals?:             string;
    Time?:              string;

    Exercise?: ExerciseInterface;
    ExerciseID?: number;

    Taste?: TasteInterface;
    TasteID?: number;
    
    Member?:  MemberInterface 
    MemberID?:   number;

}