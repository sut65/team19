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

	CourseService  []CourseService   `gorm:"foreignKey:MemberID"`
	Blogs          []Blog            `gorm:"foreignKey:MemberID"`
	DailyActivitie []DailyActivities `gorm:"foreignKey:MemberID"`
	MealPlan       []MealPlan        `gorm:"foreignKey:MemberID"`
	Body           []Body            `gorm:"foreignKey:MemberID"`
	Advice         []Advice          `gorm:"foreignKey:MemberID"`
	Reviews        []Review          `gorm:"foreignKey:MemberID"`
}

// -------------------------------------------<< ระบบจัดการคอร์ส >>------------------------------------

type Description struct {
	gorm.Model
	Description  string
	CourseType   string
	Goal         string
	CourseDetail []CourseDetail `gorm:"foreignKey:DescriptionID"`
}

type Admin struct {
	gorm.Model
	Email           string `gorm:"uniqueIndex"`
	Name            string
	Password        string
	MealPlan        []MealPlan        `gorm:"foreignKey:AdminID"`
	DailyActivitie  []DailyActivities `gorm:"foreignKey:AdminID"`
	CourseDetail    []CourseDetail    `gorm:"foreignKey:AdminID"`
	FoodInformation []FoodInformation `gorm:"foreignKey:AdminID"`
	Nutrient        []Nutrient        `gorm:"foreignKey:AdminID"`
}

type Price struct {
	gorm.Model
	Price        float32
	Duration     string
	CourseDetail []CourseDetail `gorm:"foreignKey:PriceID"`
}

type CourseDetail struct {
	gorm.Model
	CourseName string
	CoverPage  string
	Body       []Body   `gorm:"foreignKey:CourseDetailID"`
	Reviews    []Review `gorm:"foreignKey:CourseDetailID"`

	DescriptionID *uint
	Description   Description

	AdminID *uint
	Admin   Admin

	PriceID *uint
	Price   Price

	CourseService []CourseService `gorm:"foreignKey:CourseDetailID"`
}

// Review
type Rank struct {
	gorm.Model
	Name    string
	Reviews []Review `gorm:"foreignKey:RankID"`
}

type Review struct {
	gorm.Model
	Content string
	Image   string

	MemberID *uint
	Member   Member

	CourseDetailID *uint
	CourseDetail   CourseDetail

	RankID *uint
	Rank   Rank
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
	Body          []Body          `gorm:"foreignKey:TrainerID"`
	Advice        []Advice        `gorm:"foreignKey:TrainerID"`
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

	Payment []Payment `gorm:"foreignKey:CourseServiceID"`
}

// ================== ระบบจัดการข้อมูลอาหาร ==================
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
	Datetime string
	Image    string

	AdminID *uint
	Admin   Admin

	MainIngredientID *uint
	MainIngredient   MainIngredient

	FoodTypeID *uint
	FoodType   FoodType

	MealPlan []MealPlan `gorm:"foreignKey:FoodInformationID"`
}

//--------------------------------------------------------------------------------------------------
//----------------------------------------  DailyActivities  ---------------------------------------
//--------------------------------------------------------------------------------------------------

type ActivitiesType struct {
	gorm.Model
	Name           string
	DailyActivitie []DailyActivities `gorm:"foreignKey:ActivitiesTypeID"`
}

type MealTimes struct {
	gorm.Model
	Type     string
	MealTime time.Time
	Member   []Member `gorm:"foreignKey:MealTimesID"`
}
type FoodAllergies struct {
	gorm.Model
	Allergen      string
	AllergyType   string
	Reaction      string
	LastReactDate time.Time
	Member        []Member `gorm:"foreignKey:FoodAllergiesID"`
}

type BedTimes struct {
	gorm.Model
	BedTime  time.Time
	WakeUp   time.Time
	Duration float32
	Member   []Member `gorm:"foreignKey:BedTimesID"`
}

// Main Entity
type DailyActivities struct {
	gorm.Model

	Name     string
	Duration string
	Date     time.Time

	AdminID *uint
	Admin   Admin

	ActivitiesTypeID *uint
	ActivitiesType   ActivitiesType

	MemberID *uint
	Member   Member
}

// --------------------------------------------------------------------------------------------------
// ----------------------------------------  MealPlan  ----------------------------------------------
// --------------------------------------------------------------------------------------------------
type MealType struct {
	gorm.Model

	Name     string
	MealPlan []MealPlan `gorm:"foreignKey:MealTypeID"`
}

type DayOfWeeks struct {
	gorm.Model

	Name     string
	MealPlan []MealPlan `gorm:"foreignKey: DayOfWeeksID"`
}

type Nutritious struct {
	gorm.Model

	Calories     float32
	Carbohydrate float32
	Protein      float32
	MealPlan     []MealPlan `gorm:"foreignKey: NutritiousID"`
}

// Main Entity
type MealPlan struct {
	gorm.Model

	Name  string
	Notes string
	Date  time.Time

	AdminID *uint
	Admin   Admin

	MemberID *uint
	Member   Member

	FoodInformationID *uint
	FoodInformation   FoodInformation

	MealTypeID *uint
	MealType   MealType

	DayOfWeeksID *uint
	DayOfWeeks   DayOfWeeks

	NutritiousID *uint
	Nutritious   Nutritious
}

// -------------------------------------------<< ระบบให้คำแนะนำ >>------------------------------------
type Advice struct {
	gorm.Model

	Advice        string
	RecordingDate time.Time `valid:"past"`

	MemberID *uint
	Member   Member

	TrainerID *uint
	Trainer   Trainer

	BodyID *uint
	Body   Body

	DailyActivitiesID *uint
	DailyActivities   DailyActivities
}

// -----------------------------<Bodyschema>--------------<< ระบบบันทึกการเปลี่ยนแปลงร่างกาย >>------------------------------------
type Body struct {
	gorm.Model
	Hieght        float32
	Weight        float32
	Hip           float32
	UpperArmLeft  float32
	UpperArmRight float32
	LeftThigh     float32
	RightThigh    float32
	NarrowWaist   float32
	NavelWaist    float32
	Bmi           float32
	Note          string
	Advice        []Advice `gorm:"foreignKey:BodyID"`

	TrainerID *uint
	Trainer   Trainer

	MemberID *uint
	Member   Member

	CourseDetailID *uint
	CourseDetail   CourseDetail
}

// ============================== ระบบชำระเงิน ==============================
type Discount struct {
	gorm.Model
	DiscountCode       string
	DiscountPercentage int

	Payment []Payment `gorm:"foreignKey:DiscountID"`
}

type Duration struct {
	gorm.Model
	NumberOfDays       int
	DurationPercentage int

	Payment []Payment `gorm:"foreignKey:DurationID"`
}

type Payment struct {
	gorm.Model
	PaymentDate time.Time
	Slip        string
	Balance     float32

	CourseServiceID *uint
	CourseService   CourseService

	DurationID *uint
	Duration   Duration

	DiscountID *uint
	Discount   Discount
}

// ================== ระบบจัดการสารอาหาร ==================
type MostNutrient struct {
	gorm.Model
	Name           string
	CaloriePerGram int
	Nutrient       []Nutrient `gorm:"foreignKey:MostNutrientID"`
}

type Nutrient struct {
	gorm.Model
	Comment      string
	TotalCalorie int
	Date         string

	AdminID *uint
	Admin   Admin

	MostNutrientID *uint
	MostNutrient   MostNutrient

	FoodInformationID int
	FoodInformation   FoodInformation
}

// ========================================================================
