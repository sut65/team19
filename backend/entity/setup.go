package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("nutrition.db"), &gorm.Config{})

	if err != nil {
		panic("Failed to connect database!")
	}

	// Migrate the schema

	database.AutoMigrate(
		// Blog
		&Category{},
		&Tag{},
		&Blog{},
		// User
		&Gender{},
		&Member{},
		// CourseDetail
		&Price{},
		&Description{},
		&Admin{},
		&CourseDetail{},
		// Trainer
		&FormOfWork{},
		&Status{},
		&Education{},
		&Religion{},
		&Trainer{},
		// CourseService
		&CourseService{},
		// FoodInformation
		&FoodType{},
		&FoodInformation{},
		&MainIngredient{},
	)

	db = database

	Status1 := Status{
		Name: "Active",
	}
	db.Model(&Status{}).Create(&Status1)
	Status2 := Status{
		Name: "Inactive",
	}
	db.Model(&Status{}).Create(&Status2)

	// Admin
	passwordA, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	AdminA := Admin{
		Email:    "Adminja001@gmail.com",
		Name:     "ผู้ดูแล001",
		Password: string(passwordA),
	}
	db.Model(&Admin{}).Create(&AdminA)
	Gender1 := Gender{
		Name: "Male",
	}
	db.Model(&Gender{}).Create(&Gender1)
	Gender2 := Gender{
		Name: "Female",
	}
	db.Model(&Gender{}).Create(&Gender2)

	passwordB, _ := bcrypt.GenerateFromPassword([]byte("1150"), 14)
	AdminB := Admin{
		Email:    "Adminja002@gmail.com",
		Name:     "ผู้ดูแล002",
		Password: string(passwordB),
	}
	db.Model(&Admin{}).Create(&AdminB)

	Religion1 := Religion{
		Name: "Buddha",
	}
	db.Model(&Religion{}).Create(&Religion1)
	Religion2 := Religion{
		Name: "Christ",
	}
	db.Model(&Religion{}).Create(&Religion2)
	Religion3 := Religion{
		Name: "Islam",
	}
	db.Model(&Religion{}).Create(&Religion3)

	Password, err := bcrypt.GenerateFromPassword([]byte("111"), 14)

	User1 := Member{
		Firstname: "Fname1",
		Lastname:  "Lname1",
		Email:     "User1@mail.com",
		Password:  string(Password),
		Status:    Status1,
		Gender:    Gender1,
		Religion:  Religion1,
	}
	db.Model(&Member{}).Create(&User1)

	User2 := Member{
		Firstname: "Fname2",
		Lastname:  "Lname2",
		Email:     "User2@mail.com",
		Password:  string(Password),
		Status:    Status2,
		Gender:    Gender2,
		Religion:  Religion2,
	}
	db.Model(&Member{}).Create(&User2)
	User3 := Member{
		Firstname: "Fname3",
		Lastname:  "Lname3",
		Email:     "User3@mail.com",
		Password:  string(Password),
		Status:    Status1,
		Gender:    Gender1,
		Religion:  Religion3,
	}
	db.Model(&Member{}).Create(&User3)

	Description1 := Description{
		Type: "Decrease",
	}
	db.Model(&Description{}).Create(&Description1)
	Description2 := Description{
		Type: "Increase",
	}
	db.Model(&Description{}).Create(&Description2)
	Description3 := Description{
		Type: "Healthy",
	}
	db.Model(&Description{}).Create(&Description3)

	Admin1 := Admin{
		Name:     "Admin1",
		Password: string(Password),
	}
	db.Model(&Admin{}).Create(&Admin1)
	Admin2 := Admin{
		Name:     "Admin2",
		Password: string(Password),
	}
	db.Model(&Admin{}).Create(&Admin2)
	Admin3 := Admin{
		Name:     "333",
		Password: string(Password),
	}
	db.Model(&Admin{}).Create(&Admin3)

	Price1 := Price{
		Duration: 30,
		Price:    1000,
	}
	db.Model(&Price{}).Create(&Price1)
	Price2 := Price{
		Duration: 30,
		Price:    1200,
	}
	db.Model(&Price{}).Create(&Price2)
	Price3 := Price{
		Duration: 7,
		Price:    300,
	}
	db.Model(&Price{}).Create(&Price3)

	CourseDetail1 := CourseDetail{
		Name:        "หุ่นดีไม่มีสะดุด",
		CoverPage:   "https://men.mthai.com/app/uploads/2016/06/iStock_000035061564_Small.jpg",
		Description: Description3,
		Admin:       Admin1,
		Price:       Price1,
	}
	db.Model(&CourseDetail{}).Create(&CourseDetail1)
	CourseDetail2 := CourseDetail{
		Name:        "ผอมแน่",
		CoverPage:   "https://storage.yanhee.co.th/uploads/2017/05/25ba20300e-768x402.jpg",
		Description: Description1,
		Admin:       Admin1,
		Price:       Price2,
	}
	db.Model(&CourseDetail{}).Create(&CourseDetail2)
	CourseDetail3 := CourseDetail{
		Name:        "มีเนื้อ",
		CoverPage:   "https://img.kapook.com/u/2019/wittawat_ch/aug/0.1.jpg",
		Description: Description2,
		Admin:       Admin1,
		Price:       Price3,
	}
	db.Model(&CourseDetail{}).Create(&CourseDetail3)

	Trainer1 := Trainer{
		Name: "Tname1",
	}
	db.Model(&Trainer{}).Create(&Trainer1)
	Trainer2 := Trainer{
		Name: "Tname2",
	}
	db.Model(&Trainer{}).Create(&Trainer2)

	db.Model(&CourseService{}).Create(&CourseService{
		CRegisterDate: time.Date(2023, time.January, 1, 15, 03, 00, 0, time.UTC),
		Agreement:     "Agree",
		Status:        "Active",
		Member:        User1,
		CourseDetail:  CourseDetail1,
		Trainer:       Trainer1,
	})
	db.Model(&CourseService{}).Create(&CourseService{
		CRegisterDate: time.Date(2023, time.January, 2, 15, 03, 00, 0, time.UTC),
		Agreement:     "Agree",
		Status:        "Active",
		Member:        User2,
		CourseDetail:  CourseDetail2,
		Trainer:       Trainer1,
	})
}
