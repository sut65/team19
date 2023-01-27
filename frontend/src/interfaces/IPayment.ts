import { DiscountInterface } from "./IDiscount";
import { DurationInterface } from "./IDuration";
import { CourseServiceInterface } from "./ICourseService";

export interface PaymentInterface {
    ID?:                number;
    PaymentDate?:       Date | null;
	Slip?:              string | undefined;
	Balance?:           number;
	CourseServiceID?:   number;
	CourseService?:     CourseServiceInterface;
	DurationID?:        number;
	Duration?:          DurationInterface;
	DiscountID?:        number;
	Discount?:          DiscountInterface;
}