
import { EducationInterface } from "./IEducation"
import { FormOfWorkInterface } from "./IFormOfWork"
import { StatusInterface} from "./IStatus"
import { ReligionInterface} from "./IReligion"

export interface TrainerInterface{
    ID?:number
    Name ?:   string
    University ?:   string
    Gpax ?:   number
	Gender?:  string
	Age  ?:   number
	Address?: string
	Email?: string
	Password?: string,

    FormOfWorkID?: number
    FormOfWork?: FormOfWorkInterface

	StatusID?: number
	Status ?:  StatusInterface

	EducationID?: number
	Education  ?: EducationInterface

    ReligionID?: number
    Religion?: ReligionInterface


}


