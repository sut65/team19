import { MainIngredientInterface } from "./IMainIngredient";
import { FoodTypeInterface } from "./IFoodType";
import { AdminInterface } from "./IAdmin";

export interface FoodInformationInterface {
    ID?:            number
    Name?:          string
    Image?:         string
    Datetime?:      string

    FoodTypeID?:    number
    FoodType?: FoodTypeInterface
    
    MainIngredientID?:      number
    MainIngredient?:        MainIngredientInterface
    
    AdminID?:               number
    Admin?:                 AdminInterface
}