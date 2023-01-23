package entity

import (
	"time"

	"gorm.io/gorm"
)

// *****************************************************************
// -------------------------------------------<< ระบบจัดการสมาชิก >>------------------------------------
// รอแก้ไข ขอเทส Foreign key

type Status struct {
	gorm.Model
	Name    string
	Member  []Member  `gorm:"foreignKey:StatusID"`
	Trainer []Trainer `gorm:"foreignKey:StatusID"`
}

type Religion struct {
	gorm.Model
	Name    string
	Member  []Member  `gorm:"foreignKey:ReligionID"`
	Trainer []Trainer `gorm:"foreignKey:ReligionID"`
}

type Gender struct {
	gorm.Model
	Name   string
	Member []Member `gorm:"foreignKey:GenderID"`
}

type Member struct {
	gorm.Model
	Firstname   string
	Lastname    string
	ProfileUser string
	Email       string `gorm:"uniqueIndex"`
	Password    string

	MealTimesID *uint
	MealTimes   MealTimes

	FoodAllergiesID *uint
	FoodAllergies   FoodAllergies

	BedTimesID *uint
	BedTimes   BedTimes

	StatusID *uint
	Status   Status

	ReligionID *uint
	Religion   Religion

	GenderID *uint
	Gender   Gender

	CourseService  []CourseService  `gorm:"foreignKey:MemberID"`
	Blogs          []Blog           `gorm:"foreignKey:MemberID"`
	DailyActivitie []DailyActivitie `gorm:"foreignKey:MemberID"`
	MealPlan       []MealPlan       `gorm:"foreignKey:MemberID"`
}

type Description struct {
	gorm.Model
	Type          string
	CourseDetails []CourseDetail `gorm:"foreignKey:DescriptionID"`
}
type Admin struct {
	gorm.Model
	Email           string `gorm:"uniqueIndex"`
	Name            string
	Password        string
	MealPlan        []MealPlan        `gorm:"foreignKey: AdminID"`
	DailyActivitie  []DailyActivitie  `gorm:"foreignKey: AdminID"`
	CourseDetails   []CourseDetail    `gorm:"foreignKey:AdminID"`
	FoodInformation []FoodInformation `gorm:"foreignKey:AdminID"`
}
type Price struct {
	gorm.Model
	Duration      int
	Price         int
	CourseDetails []CourseDetail `gorm:"foreignKey:PriceID"`
}

type CourseDetail struct {
	gorm.Model
	Name      string
	CoverPage string

	DescriptionID *uint
	Description   Description

	AdminID *uint
	Admin   Admin

	PriceID *uint
	Price   Price
}

// *****************************************************************

type Category struct {
	gorm.Model
	Name  string
	Blogs []Blog `gorm:"foreignKey:CategoryID"`
}

type Tag struct {
	gorm.Model
	Name  string
	Blogs []Blog `gorm:"foreignKey:TagID"`
}

type Blog struct {
	gorm.Model
	CoverImage string
	Title      string
	Content    string

	MemberID *uint
	Member   Member

	CategoryID *uint
	Category   Category

	TagID *uint
	Tag   Tag
}

// -------------------------------------------<< ระบบจัดการเทรนอร์ >>------------------------------------
type FormOfWork struct {
	gorm.Model
	Name    string
	Trainer []Trainer `gorm:"foreignKey:FormOfWorkID"`
}

type Education struct {
	gorm.Model
	EducationLevel string
	Trainer        []Trainer `gorm:"foreignKey:EducationID"`
}

type Trainer struct {
	gorm.Model
	Name       string
	University string
	Gpax       float32
	Gender     string
	Age        int
	Address    string
	Email      string `gorm:"uniqueIndex"` // ใช้ Email ในการ login
	Password   string

	FormOfWorkID *uint
	FormOfWork   FormOfWork

	StatusID *uint
	Status   Status

	EducationID *uint
	Education   Education

	ReligionID *uint
	Religion   Religion

	CourseService []CourseService `gorm:"foreignKey:TrainerID"`
}

// -------------------------------------------<<  >>------------------------------------

// ================== ระบบการใช้บริการคอร์ส ==================
type CourseService struct {
	gorm.Model
	CRegisterDate time.Time
	Agreement     string
	Status        string

	MemberID *uint
	Member   Member

	CourseDetailID *uint
	CourseDetail   CourseDetail

	TrainerID *uint
	Trainer   Trainer
}

// ================== ระบบข้อมูลอาหาร ==================
type MainIngredient struct {
	gorm.Model
	Name            string
	Carolie         int
	Type            string
	FoodInformation []FoodInformation `gorm:"foreignKey:MainIngredientID"`
}

type FoodType struct {
	gorm.Model
	Name            string
	FoodInformation []FoodInformation `gorm:"foreignKey:FoodTypeID"`
}

type FoodInformation struct {
	gorm.Model
	Name     string
	Datetime time.Time
	Image    string

	AdminID *uint
	Admin   Admin

	MainIngredientID *uint
	MainIngredient   MainIngredient

	FoodTypeID *uint
	FoodType   FoodType

	MealPlan []MealPlan `gorm:"foreignKey: FoodInformation"`
}

// ====================================================================
// ระบบสำรวจกิจวัตรประจำวัน

type ActivitiesType struct {
	gorm.Model
	Name           string
	DailyActivitie []DailyActivitie `gorm:"foreignKey: ActivitiesType"`
}

type MealTimes struct {
	gorm.Model
	Type     string
	MealTime time.Time
	Member   []Member `gorm:"foreignKey: MealTimes"`
}
type FoodAllergies struct {
	gorm.Model
	Allergen      string
	AllergyType   string
	Reaction      string
	LastReactDate time.Time
	Member        []Member `gorm:"foreignKey: FoodAllergiesID"`
}

type BedTimes struct {
	gorm.Model
	BedTime  time.Time
	WakeUp   time.Time
	Duration float32
	Member   []Member `gorm:"foreignKey: BedTimesID"`
}

type DailyActivitie struct {
	gorm.Model

	Name     string
	Duration float32
	Date     time.Time

	AdminID *uint
	Admin   Admin

	ActivitiesTypeID *uint
	ActivitiesType   ActivitiesType

	MemberID *uint
	Member   Member
}

// ====================================================================
// ระบบวางแผนรายการอาหาร
type MealOfDays struct {
	gorm.Model

	Type     string
	MealTime time.Time
	MealPlan []MealPlan `gorm:"foreignKey: MealOfDays"`
}

type MealPlan struct {
	gorm.Model

	Creator     string
	Description string
	CreatedAt   time.Time
	UpdateAt    time.Time

	AdminID *uint
	Admin   Admin

	MemberID *uint
	Member   Member

	FoodInformationID *uint
	FoodInformation   FoodInformation

	MealOfDaysID *uint
	MealOfDays   MealOfDays
}
