import { MostNutrientInterface } from "./IMostNutrient";
import { FoodInformationInterface } from "./IFoodInformation";
import { AdminInterface } from "./IAdmin";

export interface NutrientInterface {
    ID?:                number,
    Comment?:           string,
    TotalCalorie?:      number,
    Date?:              string,

    AdminID?:           number,
    Admin?:             AdminInterface,

    MostNutrientID?:    number,
    MostNutrient?:      MostNutrientInterface,

    FoodInformationID?: number,
    FoodInformation?:   FoodInformationInterface,
}