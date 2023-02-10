package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
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
	Firstname   string `valid:"required~Firstname cannot be blank"`
	Lastname    string `valid:"required~Lastname cannot be blank"`
	ProfileUser string `valid:"image~ file must be only image"`
	Email       string `valid:"email~Invalid email format,maxstringlength(30)~must be no more than 20 characters long,required~Email cannot be blank"`
	Password    string `valid:"required~Password cannot be blank,minstringlength(8)~Password must be no less than 8 characters long"`

	MealTimesID *uint
	MealTimes   MealTimes

	FoodAllergiesID *uint
	FoodAllergies   FoodAllergies

	BedTimesID *uint
	BedTimes   BedTimes

	StatusID *uint `valid:"required~Status cannot be blank"`
	Status   Status

	ReligionID *uint `valid:"required~Religion cannot be blank"`
	Religion   Religion

	GenderID *uint `valid:"required~Gender cannot be blank"`
	Gender   Gender

	CourseService  []CourseService   `gorm:"foreignKey:MemberID"`
	Blogs          []Blog            `gorm:"foreignKey:MemberID"`
	DailyActivitie []DailyActivities `gorm:"foreignKey:MemberID"`
	MealPlan       []MealPlans       `gorm:"foreignKey:MemberID"`
	Body           []Body            `gorm:"foreignKey:MemberID"`
	Advice         []Advice          `gorm:"foreignKey:MemberID"`
	Reviews        []Review          `gorm:"foreignKey:MemberID"`
}

// -------------------------------------------<< Admin >>------------------------------------
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

// -------------------------------------------<< ระบบจัดการคอร์ส >>------------------------------------

type CourseType struct {
	gorm.Model
	TypeName     string
	CourseDetail []CourseDetail `gorm:"foreignKey:CourseTypeID"`
}

type Price struct {
	gorm.Model
	Price        float32
	Duration     string
	CourseDetail []CourseDetail `gorm:"foreignKey:PriceID"`
}

type CourseDetail struct {
	gorm.Model
	CourseName  string
	CoverPage   string
	Description string
	Goal        string

	AdminID *uint
	Admin   Admin

	CourseTypeID *uint
	CourseType   CourseType

	PriceID *uint
	Price   Price

	CourseService []CourseService `gorm:"foreignKey:CourseDetailID"`
	Body          []Body          `gorm:"foreignKey:CourseDetailID"`
	Reviews       []Review        `gorm:"foreignKey:CourseDetailID"`
}

//-----------------------------------------------------------------------------

// Review
type Rank struct {
	gorm.Model
	Name    string
	Reviews []Review `gorm:"foreignKey:RankID"`
}

type Review struct {
	gorm.Model
	Content string `valid:"minstringlength(10)~content not less than 10 characters,maxstringlength(200)~content not more than 200 characters"`
	Image   string `valid:"image~Image must be images file"`

	MemberID *uint
	Member   Member `valid:"-"`

	CourseDetailID *uint
	CourseDetail   CourseDetail `valid:"-"`

	RankID *uint
	Rank   Rank `valid:"-"`
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
	CoverImage string `valid:"image~CoverImage must be images file"`
	Title      string `valid:"minstringlength(5)~Title not less than 5 characters"`
	Content    string `valid:"minstringlength(20)~Content not less than 20 characters"`

	MemberID *uint
	Member   Member `valid:"-"`

	CategoryID *uint
	Category   Category `valid:"-"`

	TagID *uint
	Tag   Tag `valid:"-"`
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
	Name       string  `valid:"required~Name cannot be blank"`
	University string  `valid:"required~University cannot be blank"`
	Gpax       float32 `valid:"matches(^[+]?([1-3]+([.][0-9]*)?|[.][0]+)$)~Gpax must be between 0-4"`
	Gender     string  `valid:"required~Gender cannot be blank"`
	Age        int     `valid:"matches(^[1-9]\\d*$)~Age must be positive integer"` //matches(^(?<![-.])\b[1-9]+\b(?!\.[0-9])$)
	Address    string  `valid:"required~Adrress cannot be blank"`
	Email      string  `valid:"email~Invalid email format,maxstringlength(30)~must be no more than 20 characters long,required~Email cannot be blank"` // ใช้ Email ในการ login
	Password   string  `valid:"required~Password cannot be blank,maxstringlength(20)~Password must be no more than 20 characters long"`

	FormOfWorkID *uint
	FormOfWork   FormOfWork `valid:"-"`

	StatusID *uint
	Status   Status `valid:"-"`

	EducationID *uint
	Education   Education `valid:"-"`

	ReligionID *uint
	Religion   Religion `valid:"-"`

	CourseService []CourseService `gorm:"foreignKey:TrainerID"`
	Body          []Body          `gorm:"foreignKey:TrainerID"`
	Advice        []Advice        `gorm:"foreignKey:TrainerID"`
}

// -------------------------------------------<<  >>------------------------------------

// ================== ระบบการใช้บริการคอร์ส ==================
type CourseService struct {
	gorm.Model
	CRegisterDate time.Time
	Agreement     string `valid:"matches(Agree)~Please check 'Agree'"`
	Status        string
	RefundMessage string `valid:"required~Message cannot be blank"`

	MemberID *uint
	Member   Member `valid:"-"`

	CourseDetailID *uint
	CourseDetail   CourseDetail `valid:"-"`

	TrainerID *uint
	Trainer   Trainer `valid:"-"`

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
	Image    string `valid:"image~Image must be image file"`

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
	Height      float32  `valid:"matches(^(?:[1-9]\\d*|0)?(?:\\.\\d+)?$)~input must be greater than 0,required~Height cannot be blank"`
	Weight      float32  `valid:"matches(^(?:[1-9]\\d*|0)?(?:\\.\\d+)?$)~input must be greater than 0,required~Weight cannot be blank"`
	Hip         float32  `valid:"matches(^(?:[1-9]\\d*|0)?(?:\\.\\d+)?$)~input must be greater than 0,required~Hip cannot be blank"`
	UpperArm    float32  `valid:"matches(^(?:[1-9]\\d*|0)?(?:\\.\\d+)?$)~input must be greater than 0,required~Upper Arm cannot be blank"`
	Thigh       float32  `valid:"matches(^(?:[1-9]\\d*|0)?(?:\\.\\d+)?$)~input must be greater than 0,required~Thigh cannot be blank"`
	NarrowWaist float32  `valid:"matches(^(?:[1-9]\\d*|0)?(?:\\.\\d+)?$)~input must be greater than 0,required~Narrow Waist cannot be blank"`
	NavelWaist  float32  `valid:"matches(^(?:[1-9]\\d*|0)?(?:\\.\\d+)?$)~input must be greater than 0,required~Navel Waist cannot be blank"`
	Bmi         float32  `valid:"matches(^(?:[1-9]\\d*|0)?(?:\\.\\d+)?$)~input must be greater than 0"`
	Note        string   `valid:"maxstringlength(30)~Note must be no more than 30 characters long,required~Note cannot be blank"`
	Advice      []Advice `gorm:"foreignKey:BodyID"`

	TrainerID *uint
	Trainer   Trainer `valid:"-"`

	MemberID *uint
	Member   Member `valid:"-"`

	CourseDetailID *uint
	CourseDetail   CourseDetail `valid:"-"`
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
	Slip        string `valid:"required~Please upload slip,length(0|2802088)~File size must less than 2 MB,image~Slip must be image file"`
	Balance     float32

	CourseServiceID *uint
	CourseService   CourseService `valid:"-"`

	DurationID *uint
	Duration   Duration `valid:"-"`

	DiscountID *uint
	Discount   Discount `valid:"-"`
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
	Comment      string `valid:"maxstringlength(50)~Comment cannot more than 50 characters"`
	TotalCalorie int    `valid:"range(0|10000)~Invalid calorie, required~Calorie cannot be blank"`
	Date         string

	AdminID *uint
	Admin   Admin

	MostNutrientID *uint
	MostNutrient   MostNutrient

	FoodInformationID int             `gorm:"uniqueIndex"`
	FoodInformation   FoodInformation `gorm:"references:id" valid:"-"`
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
	Meals string `valid:"minstringlength(10)~meals not less than 10 characters,maxstringlength(30)~meals not more than 30 characters"`
	Time  string

	MemberID int    `gorm:"uniqueIndex"`
	Member   Member `valid:"-"`

	ExerciseID *uint
	Exercise   Exercise

	TasteID *uint
	Taste   Taste
}

func init() {
	// Custom valid tag
	govalidator.TagMap["image"] = govalidator.Validator(func(str string) bool {
		pattern := "^data:image/(jpeg|jpg|png|svg|gif|tiff|tif|bmp|apng|eps|jfif|pjp|xbm|dib|jxl|svgz|webp|ico|pjpeg|avif);base64,[A-Za-z0-9+/]+={0,2}$"
		return govalidator.Matches(str, pattern)
	})
}
