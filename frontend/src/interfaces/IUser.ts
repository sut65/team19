import { GenderInterface } from "./IGender";
import { ReligionInterface } from "./IReligion";
import { StatusInterface } from "./IStatus";

export interface UserInterface {
    ID?:                    number;
    Firstname?:             string;
    Lastname?:              string;
    Email?:                 string;
    Profileuser?:           string;
    Password?:              string;
    Gender?: GenderInterface;
    Gender_ID?: number;
    Status?: StatusInterface;
    Status_ID?: number;
    Religion?:  ReligionInterface 
    Religion_ID?:   number;
}