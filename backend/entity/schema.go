package entity

import (
	"time"
	_ "time"

	"gorm.io/gorm"
)

// *****************************************************************
// รอแก้ไข ขอเทส Foreign key

type Status struct {
	gorm.Model
	Name    string
	User    []User    `gorm:"foreignKey:StatusID"`
	Trainer []Trainer `gorm:"foreignKey:StatusID"`
}

type Gender struct {
	gorm.Model
	Name string
	User []User `gorm:"foreignKey:GenderID"`
}

type Religion struct {
	gorm.Model
	Name    string
	User    []User    `gorm:"foreignKey:ReligionID"`
	Trainer []Trainer `gorm:"foreignKey:ReligionID"`
}

type User struct {
	gorm.Model
	FirstName string
	LastName  string
	Email	  string `gorm:"uniqueIndex"`
	Password  string

	StatusID *uint
	Status   Status

	GenderID *uint
	Gender   Gender

	ReligionID *uint
	Religion   Religion

	CourseService []CourseService `gorm:"foreignKey:UserID"`
}

type Description struct {
	gorm.Model
	Type          string
	CourseDetails []CourseDetail `gorm:"foreignKey:DescriptionID"`
}
type Admin struct {
	gorm.Model
	Name          string
	Password      string
	CourseDetails []CourseDetail `gorm:"foreignKey:AdminID"`
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
	Email      string
	UserName   string `gorm:"uniqueIndex"`
	Password   string `gorm:"uniqueIndex"`

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

	UserID *uint
	User   User

	CourseDetailID *uint
	CourseDetail   CourseDetail

	TrainerID *uint
	Trainer   Trainer
}

// =======================================================
