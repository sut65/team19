package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

// *****************************************************************
// -------------------------------------------<< ระบบจัดการสมาชิก >>------------------------------------
// รอแก้ไข ขอเทส Foreign keys

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
	ProfileUser string `valid:"image~Profile must be only image"`
	Email       string `valid:"email~Invalid email format,required~Email cannot be blank"`
	Password    string `valid:"required~Password cannot be blank,minstringlength(8)~Password must be no less than 8 characters long"`

	StatusID *uint
	Status   Status

	ReligionID *uint
	Religion   Religion

	GenderID *uint
	Gender   Gender

	CourseService []CourseService `gorm:"foreignKey:MemberID"`
	Blogs         []Blog          `gorm:"foreignKey:MemberID"`
	DailyRoutine  []DailyRoutine  `gorm:"foreignKey:MemberID"`
	MealPlan      []MealPlans     `gorm:"foreignKey:MemberID"`
	Body          []Body          `gorm:"foreignKey:MemberID"`
	Advice        []Advice        `gorm:"foreignKey:MemberID"`
	Reviews       []Review        `gorm:"foreignKey:MemberID"`
	Behavior      []Behavior      `gorm:"foreignKey:MemberID"`
}

// -------------------------------------------<< Admin >>------------------------------------
type Admin struct {
	gorm.Model
	Email           string `gorm:"uniqueIndex"`
	Name            string
	Password        string
	MealPlan        []MealPlans       `gorm:"foreignKey:AdminID"`
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
	CourseName  string `valid:"maxstringlength(50)~Course Name must be no more than 50 characters,required~Course Name cannot be blank"`
	CoverPage   string `valid:"image~Cover Page must be images file"`
	Description string `valid:"maxstringlength(300)~Description must be no more than 300 characters,required~Description cannot be blank"`
	Goal        string `valid:"maxstringlength(100)~Goal must be no more than 100 characters,required~Goal cannot be blank"`

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
	Gpax       float32 `valid:"matches(^[+]?([0-3]+([.][0-9]*)?|[4]?|[.][0]+)$)~Gpax must be between 0-4,required~Please enter your Gpax"`
	Gender     string  `valid:"required~Gender cannot be blank"`
	Age        int     `valid:"matches(^(0|[1-9][0-9]*)$)~Age must be positive integer"` //matches(^(?<![-.])\b[1-9]+\b(?!\.[0-9])$)
	Address    string  `valid:"required~Adrress cannot be blank"`
	Email      string  `valid:"email~Invalid email format,maxstringlength(30)~must be no more than 30 characters long,required~Email cannot be blank"` // ใช้ Email ในการ login
	Password   string  `valid:"maxstringlength(20)~Password Must contain no more than 20 characters,minstringlength(8)~Password Must contain at least 8 characters"`

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
	CRegisterDate time.Time `valid:"notpast30min~Date must not be in the past,notfuture30min~Date must not be in the future"`
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
	Advice  []Advice  `gorm:"foreignKey:CourseServiceID"`
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
//----------------------------------------  DailyRoutine  ---------------------------------------
//--------------------------------------------------------------------------------------------------

type MealTime struct {
	gorm.Model
	BreakFastTime string
	LunchTime     string
	DinnerTime    string
	DailyRoutine  []DailyRoutine `gorm:"foreignKey:MealTimeID"`
}
type Activity struct {
	gorm.Model
	Name         string
	ActivityType string
	DailyRoutine []DailyRoutine `gorm:"foreignKey:ActivityID"`
}

type SleepSchedule struct {
	gorm.Model
	WakeUpTime   string
	BedTime      string
	DailyRoutine []DailyRoutine `gorm:"foreignKey:SleepScheduleID"`
}

// Main Entity
type DailyRoutine struct {
	gorm.Model

	Description string
	TimeStamp   string

	MemberID *uint
	Member   Member

	ActivityID *uint
	Activity   Activity

	MealTimeID *uint
	MealTime   MealTime

	SleepScheduleID *uint
	SleepSchedule   SleepSchedule
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

	Advice        string `valid:"maxstringlength(200)~Advice must be no more than 200 characters,required~Advice cannot be blank"`
	RecordingDate time.Time `valid:"notpast30min~Recording Date must not be in the past,notfuture30min~Recording Date must not be in the future"`

	TrainerID *uint
	Trainer   Trainer `valid:"-"`

	MemberID *uint
	Member   Member `valid:"-"`

	CourseServiceID *uint
	CourseService   CourseService `valid:"-"`

	BodyID *uint
	Body   Body `valid:"-"`

	DailyRoutineID *uint
	DailyRoutine   DailyRoutine `valid:"-"`
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
	PaymentDate time.Time `valid:"notpast30min~Date must not be in the past,notfuture30min~Date must not be in the future"`
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
	Meals       string `valid:"minstringlength(4)~Meals not less than 4 characters,maxstringlength(30)~Meals not more than 30 characters"`
	Time        string
	ProfileBody string `valid:"image~Profile must be only image"`

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

	govalidator.CustomTypeTagMap.Set("notpast30min", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().Add(time.Minute * -30))
	})

	govalidator.CustomTypeTagMap.Set("notfuture30min", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now().Add(time.Minute * 30))
	})

	govalidator.CustomTypeTagMap.Set("notpast30min", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().Add(time.Minute * -30))
	})

	govalidator.CustomTypeTagMap.Set("notfuture30min", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now().Add(time.Minute * 30))
	})

	// govalidator.TagMap["age"] = govalidator.IsPositive(Trainer);
	// govalidator.CustomTypeTagMap.Set("age", govalidator.CustomTypeValidator(func(i interface{}, o interface{}) bool {
	// 	s, ok := i.(float64)
	// 	if !ok {
	// 		fmt.Print(s, "Aonon")
	// 		return false
	// 	}
	// 	return s < 1
	// }))

}
