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
	MealPlan       []MealPlans       `gorm:"foreignKey:MemberID"`
	Body           []Body            `gorm:"foreignKey:MemberID"`
	Advice         []Advice          `gorm:"foreignKey:MemberID"`
	Reviews        []Review          `gorm:"foreignKey:MemberID"`
	Behavior       []Behavior        `gorm:"foreignKey:MemberID"`
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
	MealPlan        []MealPlans       `gorm:"foreignKey:AdminID"`
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

	DescriptionID *uint
	Description   Description

	AdminID *uint
	Admin   Admin

	PriceID *uint
	Price   Price

	CourseService []CourseService `gorm:"foreignKey:CourseDetailID"`
	Body          []Body          `gorm:"foreignKey:CourseDetailID"`
	Reviews       []Review        `gorm:"foreignKey:CourseDetailID"`
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
	Title      string `valid:"minstringlength(5)~Title not less than 5 characters"`
	Content    string `valid:"minstringlength(20)~Content not less than 20 characters"`

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
	Agreement     string 		`valid:"matches(Agree)~Please click agreement and check 'Agree'"`
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
	Name     string `valid:"required~Name cannot be blank"`
	Datetime string
	Image    string

	AdminID *uint
	Admin   Admin

	MainIngredientID *uint
	MainIngredient   MainIngredient

	FoodTypeID *uint
	FoodType   FoodType

	// MealPlan []MealPlan `gorm:"foreignKey:FoodInformationID"`
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
type MealsOfDay struct {
	gorm.Model

	Name string

	BreakFastID *uint
	BreakFast   BreakFast
	LunchID     *uint
	Lunch       Lunch
	DinnerID    *uint
	Dinner      Dinner

	MealPlan []MealPlans `gorm:"foreignKey: MealsOfDayID"`
}

type BreakFast struct {
	gorm.Model

	FoodInformationID *uint
	FoodInformation   FoodInformation

	MealsOfDay []MealsOfDay `gorm:"foreignKey: BreakFastID"`
}
type Lunch struct {
	gorm.Model

	Name string

	FoodInformationID *uint
	FoodInformation   FoodInformation

	MealsOfDay []MealsOfDay `gorm:"foreignKey: LunchID"`
}
type Dinner struct {
	gorm.Model

	Name string

	FoodInformationID *uint
	FoodInformation   FoodInformation

	MealsOfDay []MealsOfDay `gorm:"foreignKey: DinnerID"`
}

type AvoidFood struct {
	gorm.Model

	Name string

	MealPlans []MealPlans `gorm:"foreignKey: AvoidFoodID"`
}

type Nutritious struct {
	gorm.Model

	Calories     float32
	Carbohydrate float32
	Protein      float32
	MealPlans    []MealPlans `gorm:"foreignKey: NutritiousID"`
}

// Main Entity
type MealPlans struct {
	gorm.Model

	Description string
	Date        time.Time

	AdminID *uint
	Admin   Admin

	MemberID *uint
	Member   Member

	NutritiousID *uint
	Nutritious   Nutritious

	AvoidFoodID *uint
	AvoidFood   AvoidFood

	MealsOfDayID *uint
	MealsOfDay   MealsOfDay
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
	Height        float32
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
	Slip        string			`valid:"required~Please upload slip,length(0|2802088)~Please upload file size less than 2MB,matches((jpeg|jpg|png|svg|gif|tiff|tif|bmp|apng|eps|jfif|pjp|xbm|dib|jxl|svgz|webp|ico|pjpeg|avif))~Please upload image file (jpg/png/...)"`
	Balance     float32			`valid:"numeric~Invalid balance. Please try again"`

	CourseServiceID *uint
	CourseService   CourseService

	DurationID *uint
	Duration   Duration

	DiscountID *uint
	Discount   Discount
}

// ======================================================

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

// ================== ระบบสำรวจพฤติกรรมก่อนเข้าเทรน ==================
type Exercise struct {
	gorm.Model
	Name     string
	Behavior []Behavior `gorm:"foreignKey:ExerciseID"`
}

type Taste struct {
	gorm.Model
	Name     string
	Behavior []Behavior `gorm:"foreignKey:TasteID"`
}

type Behavior struct {
	gorm.Model
	Meals string
	Time  string

	MemberID *uint
	Member   Member

	ExerciseID *uint
	Exercise   Exercise

	TasteID *uint
	Taste   Taste
}
