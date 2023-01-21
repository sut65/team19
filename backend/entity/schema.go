package entity

import (
	"time"
	_ "time"

	"gorm.io/gorm"
)

// *****************************************************************
// รอแก้ไข ขอเทส Foreign key
type User struct {
	gorm.Model
	CourseService []CourseService `gorm:"foreignKey:UserID"`
}

type Course struct {
	gorm.Model
	CourseService []CourseService `gorm:"foreignKey:CourseID"`
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
type Status struct {
	gorm.Model
	Name    string
	Trainer []Trainer `gorm:"foreignKey:StatusID"`
}

type Education struct {
	gorm.Model
	EducationLevel string
	Trainer        []Trainer `gorm:"foreignKey:EducationID"`
}
type Religion struct {
	gorm.Model
	Name    string
	Trainer []Trainer `gorm:"foreignKey:ReligionID"`
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

	UserID *uint
	User   User

	CourseID *uint
	Course   Course

	TrainerID *uint
	Trainer   Trainer
}
