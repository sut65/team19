package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"time"
	"golang.org/x/crypto/bcrypt"
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
		&User{},
		// Admin
		&Admin{},
		// Course
		&Course{},
		// Trainer
		&FormOfWork{},
		&Status{},
		&Education{},
		&Religion{},
		&Trainer{},
		// CourseService
		&CourseService{},
		// FoodInformation
		&MainIngredient{},
		&FoodType{},
		&FoodInformation{},
	)

	db = database

	// User Test มาแก้ด้วย
	UserTest := User{
		Name: "Test Der",
	}
	db.Model(&User{}).Create(&UserTest)

	// Admin
	passwordA, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	AdminA := Admin{
		Email: 		"Adminja001@gmail.com",
		Name:  		"ผู้ดูแล001",
		Password: 	string(passwordA),
	}
	db.Model(&Admin{}).Create(&AdminA)

	passwordB, _ := bcrypt.GenerateFromPassword([]byte("1150"), 14)
	AdminB := Admin{
		Email: 		"Adminja002@gmail.com",
		Name:  		"ผู้ดูแล002",
		Password: 	string(passwordB),
	}
	db.Model(&Admin{}).Create(&AdminB)

	// Category
	CategoryA := Category{
		Name: "การกิน",
	}
	db.Model(&Category{}).Create(&CategoryA)

	CategoryB := Category{
		Name: "ออกกำลังกาย",
	}
	db.Model(&Category{}).Create(&CategoryB)

	// Tag
	TagA := Tag{
		Name: "มทส",
	}
	db.Model(&Tag{}).Create(&TagA)

	TagB := Tag{
		Name: "อาหารคลีนงบประหยัด",
	}
	db.Model(&Tag{}).Create(&TagB)

	TagC := Tag{
		Name: "ออกกำลังกายด้วยงบ 0 บาท",
	}
	db.Model(&Tag{}).Create(&TagC)

	// Blog
	BlogA := Blog{
		CoverImage: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
		Title:      "โภชนาการกับการออกกำลังกายสำคัญอย่างไร",
		Content:    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		User:       UserTest,
		Category:   CategoryA,
		Tag:        TagB,
	}
	db.Model(&Blog{}).Create(&BlogA)

	// MainIngredient
	MainIngredientA := MainIngredient{
		Name:		"ไข่",
		Carolie: 	72,
		Type:		"วัตถุดิบจากสัตว์",
	}
	db.Model(&MainIngredient{}).Create(&MainIngredientA)

	MainIngredientB := MainIngredient{
		Name:		"ผัก",
		Carolie: 	65,
		Type:		"วัตถุดิบจากพืช",
	}
	db.Model(&MainIngredient{}).Create(&MainIngredientB)

	// FoodType
	FoodTypeA := FoodType{
		Name:	"อาหารเพื่อสุขภาพ",
	}
	db.Model(&FoodType{}).Create(&FoodTypeA)

	FoodTypeB := FoodType{
		Name:	"อาหาร Fast Food",
	}
	db.Model(&FoodType{}).Create(&FoodTypeB)

	// FoodInformation
	FoodInformationA := FoodInformation{
		Name:				"ไข่เจียว",
		Datetime: 			time.Date(2023, time.January, 01, 0, 0, 0, 0, time.Local),
		Image:				"https://s359.kapook.com/pagebuilder/1c0a0dac-e4a9-4651-baa0-052a597ab7bf.jpg",
		Admin:				AdminA,
		MainIngredient:		MainIngredientA,
		FoodType:			FoodTypeA,
	}
	db.Model(&FoodInformation{}).Create(&FoodInformationA)

	FoodInformationB := FoodInformation{
		Name:				"ผัดคะน้า",
		Datetime: 			time.Date(2022, time.December, 01, 0, 0, 0, 0, time.Local),
		Image:				"https://s359.kapook.com/pagebuilder/a8a1fb49-f651-40a5-9705-26a98ab0ea66.jpg",
		Admin:				AdminB,
		MainIngredient:		MainIngredientB,
		FoodType:			FoodTypeB,
	}
	db.Model(&FoodInformation{}).Create(&FoodInformationB)
}
