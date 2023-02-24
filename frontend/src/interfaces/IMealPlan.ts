import { MemberInterface } from './IMember'
import { AdminInterface } from './IAdmin';
import { FoodInformationInterface } from './IFoodInformation';
import { MealTypeInterface } from './IMealType';

export interface MealPlanInterface {
	ID?: number
	TimeToEat?: string
	Description?: string

	MemberID?: number
	Member?: MemberInterface

	AdminID?: number
	Admin?: AdminInterface

	MealTypeID?: number
	MealType?: MealTypeInterface

	FoodInformationID?: number
	FoodInformation?: FoodInformationInterface

}
