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
	Name    string
	Member  []Member  `gorm:"foreignKey:GenderID"`
}

type Member struct {
	gorm.Model
	Firstname   string
	Lastname    string
	ProfileUser string
	Email       string `gorm:"uniqueIndex"`
	Password    string

	StatusID *uint
	Status   Status

	ReligionID *uint
	Religion   Religion

	GenderID *uint
	Gender   Gender

	CourseService []CourseService `gorm:"foreignKey:MemberID"`
	Blogs         []Blog          `gorm:"foreignKey:MemberID"`
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
	Email      string `gorm:"uniqueIndex"`// ใช้ Email ในการ login
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
}
