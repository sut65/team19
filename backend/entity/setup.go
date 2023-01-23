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
		// Activity ย่อย
		&ActivitiesType{},
		&MealTimes{},
		&FoodAllergies{},
		&BedTimes{},
		// Meal Plan ย่อย
		&MealOfDays{},
		// Member
		&Status{},
		&Religion{},
		&Gender{},
		&Member{},
		// Blog
		&Category{},
		&Tag{},
		&Blog{},
		// CourseDetail
		&Price{},
		&Description{},
		&Admin{},
		&CourseDetail{},
		// Trainer
		&FormOfWork{},
		&Education{},
		&Trainer{},
		// CourseService
		&CourseService{},
		// FoodInformation
		&FoodInformation{},
		&FoodType{},
		&MainIngredient{},
		// Activity หลัก
		&DailyActivitie{},
		// MealPlan
		&MealPlan{},
		//Advice
		&Advice{},
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

	Gender1 := Gender{
		Name: "Male",
	}
	db.Model(&Gender{}).Create(&Gender1)
	Gender2 := Gender{
		Name: "Female",
	}
	db.Model(&Gender{}).Create(&Gender2)

	// Admin
	passwordA, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	AdminA := Admin{
		Email:    "Adminja001@gmail.com",
		Name:     "ผู้ดูแล001",
		Password: string(passwordA),
	}
	db.Model(&Admin{}).Create(&AdminA)

	passwordB, _ := bcrypt.GenerateFromPassword([]byte("1150"), 14)
	AdminB := Admin{
		Email:    "Adminja002@gmail.com",
		Name:     "ผู้ดูแล002",
		Password: string(passwordB),
	}
	db.Model(&Admin{}).Create(&AdminB)

	passwordC, _ := bcrypt.GenerateFromPassword([]byte("1112"), 14)
	AdminC := Admin{
		Email:    "Adminja003@gmail.com",
		Name:     "ผู้ดูแล003",
		Password: string(passwordC),
	}
	db.Model(&Admin{}).Create(&AdminC)

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

	Password, _ := bcrypt.GenerateFromPassword([]byte("111"), 14)

	Member1 := Member{
		Firstname:   "Fname1",
		Lastname:    "Lname1",
		Email:       "User1@mail.com",
		Password:    string(Password),
		ProfileUser: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
		Status:      Status1,
		Gender:      Gender1,
		Religion:    Religion1,
	}
	db.Model(&Member{}).Create(&Member1)

	Member2 := Member{
		Firstname:   "Fname2",
		Lastname:    "Lname2",
		Email:       "User2@mail.com",
		Password:    string(Password),
		ProfileUser: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
		Status:      Status2,
		Gender:      Gender2,
		Religion:    Religion2,
	}
	db.Model(&Member{}).Create(&Member2)
	Member3 := Member{
		Firstname:   "Fname3",
		Lastname:    "Lname3",
		Email:       "User3@mail.com",
		Password:    string(Password),
		ProfileUser: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
		Status:      Status1,
		Gender:      Gender1,
		Religion:    Religion3,
	}
	db.Model(&Member{}).Create(&Member3)

	//Description Part ----------------------------------------------------------------------------------------------

	Description1 := Description{
		Description: "หุ่นดีได้ง่าย ๆ ห่างไกลจากโรคแทรกซ้อน ทำได้ง่าย ๆ ที่บ้านด้วยตัวเอง",
		CourseType:  "เพิ่มน้ำหนัก",
		Goal:        "เพิ่มน้ำหนักได้ 1-2 kg",
	}
	db.Model(&Description{}).Create(&Description1)

	Description2 := Description{
		Description: "สุขภาพดี หุ่นดี ได้ง่ายๆ ด้วยคอร์สลดน้ำหนักออนไลน์ เพื่อผลลัพธ์แบบยั่งยืน ทำได้ด้วยตัวเอง",
		CourseType:  "ลดน้ำหนัก",
		Goal:        "ลดน้ำหนักได้ 3-5 kg",
	}
	db.Model(&Description{}).Create(&Description2)

	Description3 := Description{
		Description: "ฟิตหุ่นให้ดี กระชับกล้ามเนื้อให้เฟิร์ม ผลลัพธ์แบบยั่งยืน ทำได้ด้วยตัวเอง",
		CourseType:  "เพิ่มกล้ามเนื้อ",
		Goal:        "เพิ่มกล้ามให้ชัดขึ้น",
	}
	db.Model(&Description{}).Create(&Description3)

	// Price Part ----------------------------------------------------------------------------------------
	Price1 := Price{
		Price:    399,
		Duration: "30 วัน",
	}
	db.Model(&Price{}).Create(&Price1)

	Price2 := Price{
		Price:    599,
		Duration: "60 วัน",
	}
	db.Model(&Price{}).Create(&Price2)

	Price3 := Price{
		Price:    999,
		Duration: "90 วัน",
	}
	db.Model(&Price{}).Create(&Price3)

	//Course Details Part -----------------------------------------------------------------------------
	CourseDetail1 := CourseDetail{
		CourseName:  "บอกลาตัวเบา",
		CoverPage:   "https://men.mthai.com/app/uploads/2016/06/iStock_000035061564_Small.jpg",
		Description: Description1,
		Admin:       AdminA,
		Price:       Price3,
	}
	db.Model(&CourseDetail{}).Create(&CourseDetail1)

	CourseDetail2 := CourseDetail{
		CourseName:  "ลดพุง กู้ร่างกลับคืน",
		CoverPage:   "https://men.mthai.com/app/uploads/2016/06/iStock_000035061564_Small.jpg",
		Description: Description2,
		Admin:       AdminB,
		Price:       Price1,
	}
	db.Model(&CourseDetail{}).Create(&CourseDetail2)

	CourseDetail3 := CourseDetail{
		CourseName:  "ปั้นกล้ามสร้างพลัง",
		CoverPage:   "https://img.kapook.com/u/2019/wittawat_ch/aug/0.1.jpg",
		Description: Description3,
		Admin:       AdminC,
		Price:       Price2,
	}
	db.Model(&CourseDetail{}).Create(&CourseDetail3)

	//----------------------------------------------------------------------------------

	Trainer1 := Trainer{
		Name:  "Tname1",
		Email: "Trainer1@mail.com",
	}
	db.Model(&Trainer{}).Create(&Trainer1)
	Trainer2 := Trainer{
		Name:  "Tname2",
		Email: "Trainer2@mail.com",
	}
	db.Model(&Trainer{}).Create(&Trainer2)

	// Blog
	CategoryA := Category{
		Name: "การกิน",
	}
	db.Model(&Category{}).Create(&CategoryA)

	CategoryB := Category{
		Name: "ออกกำลังกาย",
	}
	db.Model(&Category{}).Create(&CategoryB)

	TagA := Tag{
		Name: "มทส",
	}
	db.Model(&Tag{}).Create(&TagA)

	TagB := Tag{
		Name: "ออกกำลังกายด้วยงบ 0 บาท",
	}
	db.Model(&Tag{}).Create(&TagB)

	TagC := Tag{
		Name: "อาหารคลีนงบประหยัด",
	}
	db.Model(&Tag{}).Create(&TagC)

	BlogA := Blog{
		CoverImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
		Title:      "อาหารคลีน",
		Content:    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		Member:     Member1,
		Category:   CategoryA,
		Tag:        TagA,
	}
	db.Model(&Blog{}).Create(&BlogA)

	db.Model(&CourseService{}).Create(&CourseService{
		CRegisterDate: time.Date(2023, time.January, 1, 15, 03, 00, 0, time.UTC),
		Agreement:     "Agree",
		Status:        "Active",
		Member:        Member1,
		CourseDetail:  CourseDetail1,
		Trainer:       Trainer1,
	})
	db.Model(&CourseService{}).Create(&CourseService{
		CRegisterDate: time.Date(2023, time.January, 2, 15, 03, 00, 0, time.UTC),
		Agreement:     "Agree",
		Status:        "Inactive",
		Member:        Member2,
		CourseDetail:  CourseDetail2,
		Trainer:       Trainer1,
	})

	// ------------ Food Information ------------
	MainIngredientA := MainIngredient{
		Name:    "ไข่",
		Carolie: 155,
		Type:    "วัตถุดิบจากสัตว์",
	}
	db.Model(&MainIngredient{}).Create(&MainIngredientA)

	MainIngredientB := MainIngredient{
		Name:    "ผัก",
		Carolie: 65,
		Type:    "วัตถุดิบจากพืช",
	}
	db.Model(&MainIngredient{}).Create(&MainIngredientB)

	FoodTypeA := FoodType{
		Name: "อาหารเพื่อสุขภาพ",
	}
	db.Model(&FoodType{}).Create(&FoodTypeA)

	FoodTypeB := FoodType{
		Name: "อาหาร Fast Food",
	}
	db.Model(&FoodType{}).Create(&FoodTypeB)

	FoodInformationA := FoodInformation{
		Name:           "ไข่เจียว",
		Datetime:       time.Date(2023, time.January, 2, 15, 03, 00, 0, time.UTC),
		Image:          "https://s359.kapook.com/pagebuilder/1c0a0dac-e4a9-4651-baa0-052a597ab7bf.jpg",
		Admin:          AdminA,
		MainIngredient: MainIngredientA,
		FoodType:       FoodTypeA,
	}
	db.Model(&FoodInformation{}).Create(&FoodInformationA)

	FoodInformationB := FoodInformation{
		Name:           "ผัดคะน้า",
		Datetime:       time.Date(2023, time.January, 3, 15, 03, 00, 0, time.UTC),
		Image:          "https://s359.kapook.com/pagebuilder/a8a1fb49-f651-40a5-9705-26a98ab0ea66.jpg",
		Admin:          AdminB,
		MainIngredient: MainIngredientB,
		FoodType:       FoodTypeB,
	}
	db.Model(&FoodInformation{}).Create(&FoodInformationB)

}
