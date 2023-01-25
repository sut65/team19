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
    GenderID?: number;
    Status?: StatusInterface;
    StatusID?: number;
    Religion?:  ReligionInterface 
    ReligionID?:   number;
}