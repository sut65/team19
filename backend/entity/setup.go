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
		&MealType{},
		&DayOfWeeks{},
		&Nutritious{},
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
		// Review
		&Rank{},
		&Review{},
		// Trainer
		&FormOfWork{},
		&Education{},
		&Trainer{},
		// Body ref.-> {member,trainer,courseDetail}
		Body{},
		// CourseService
		&CourseService{},
		// FoodInformation
		&FoodInformation{},
		&FoodType{},
		&MainIngredient{},
		// Activity หลัก
		&DailyActivities{},
		// MealPlan
		&MealPlan{},
		//Advice
		&Advice{},
		// Payment
		&Discount{},
		&Duration{},
		&Payment{},
		// Nutrient
		&MostNutrient{},
		&Nutrient{},
	)

	db = database

	Status1 := Status{
		Name: "สมรส",
	}
	db.Model(&Status{}).Create(&Status1)

	Statuses := []Status{
		{Name: "โสด"},
		{Name: "หย่า"},
		{Name: "หม้าย"},
	}
	db.Model(&Status{}).Create(&Statuses)

	Gender1 := Gender{
		Name: "Male",
	}
	db.Model(&Gender{}).Create(&Gender1)
	Gender2 := Gender{
		Name: "Female",
	}
	db.Model(&Gender{}).Create(&Gender2)

	// Admin Part -------------------------------------------------------------
	passwordA, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	AdminA := Admin{
		Email:    "Admin001@gmail.com",
		Name:     "ผู้ดูแล001",
		Password: string(passwordA),
	}
	db.Model(&Admin{}).Create(&AdminA)

	passwordB, _ := bcrypt.GenerateFromPassword([]byte("1150"), 14)
	AdminB := Admin{
		Email:    "Admin002@gmail.com",
		Name:     "ผู้ดูแล002",
		Password: string(passwordB),
	}
	db.Model(&Admin{}).Create(&AdminB)

	passwordC, _ := bcrypt.GenerateFromPassword([]byte("1112"), 14)
	AdminC := Admin{
		Email:    "Admin003@gmail.com",
		Name:     "ผู้ดูแล003",
		Password: string(passwordC),
	}
	db.Model(&Admin{}).Create(&AdminC)

	//**************************************************************************

	Religion1 := Religion{
		Name: "พุธ",
	}
	db.Model(&Religion{}).Create(&Religion1)
	Religion2 := Religion{
		Name: "อิสลาม",
	}
	db.Model(&Religion{}).Create(&Religion2)
	Religion3 := Religion{
		Name: "คริสต์",
	}
	db.Model(&Religion{}).Create(&Religion3)
	Religion4 := Religion{
		Name: "ฮินดู",
	}
	db.Model(&Religion{}).Create(&Religion4)

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
		Firstname:   "ชูเกียรติ",
		Lastname:    "ก๋าอินตา",
		Email:       "b6303044@g.sut.ac.th",
		Password:    string(Password),
		ProfileUser: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
		Status:      Status1,
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
		CourseName:  "บอกลาร่างผอม",
		CoverPage:   "https://img.kapook.com/u/2019/wittawat_ch/aug/0.1.jpg",
		Description: Description1,
		Admin:       AdminA,
		Price:       Price3,
	}
	db.Model(&CourseDetail{}).Create(&CourseDetail1)

	CourseDetail2 := CourseDetail{
		CourseName:  "ลดพุงกู้ร่างกลับคืน",
		CoverPage:   "https://men.mthai.com/app/uploads/2016/06/iStock_000035061564_Small.jpg",
		Description: Description2,
		Admin:       AdminB,
		Price:       Price1,
	}
	db.Model(&CourseDetail{}).Create(&CourseDetail2)

	CourseDetail3 := CourseDetail{
		CourseName:  "ปั้นกล้ามสร้างพลัง",
		CoverPage:   "https://s.isanook.com/he/0/rp/rc/w670h402/yatxacm1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL2hlLzAvdWQvNS8yODg2MS93ZWlnaHRsaWZ0aW5nLmpwZw==.jpg",
		Description: Description3,
		Admin:       AdminC,
		Price:       Price2,
	}
	db.Model(&CourseDetail{}).Create(&CourseDetail3)

	//----------------------------------------------------------------------------------

	form1 := FormOfWork{
		Name: "งานประจำ",
	}
	db.Model(&FormOfWork{}).Create(&form1)

	form := []FormOfWork{
		{Name: "งานนอกเวลา"},
		{Name: "งานอิสระ"},
		{Name: "นักศึกษางาน"},
		{Name: "สัญญาจ้าง"},
		{Name: "สหกิจศึกษา"},
	}
	db.Model(&FormOfWork{}).Create(&form)

	education1 := Education{
		EducationLevel: "ต่ำกว่าปริญาตรี",
	}
	db.Model(&Education{}).Create(&education1)

	educations := []Education{
		{EducationLevel: "ปริญาตรี"},
		{EducationLevel: "ปริญาโท"},
		{EducationLevel: "ปริญาเอก"},
	}
	db.Model(&Education{}).Create(&educations)

	// Trainer1 := Trainer{
	// 	Name:  "ธนกฤต สามเมือง",
	// 	Email: "Trainer1@mail.com",
	// }
	// db.Model(&Trainer{}).Create(&Trainer1)
	// Trainer2 := Trainer{
	// 	Name:  "Tname2",
	// 	Email: "Trainer2@mail.com",
	// }
	// db.Model(&Trainer{}).Create(&Trainer2)

	// -------------------(Create value Trainer)------------------------------
	pass1, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	Trainer1 := Trainer{
		Name:       "Natthaphon",
		University: "SUT",
		Gpax:       3.83,
		Gender:     "ชาย",
		Age:        21,
		Address:    "90/8 บ.โคกก่อง",
		Email:      "Aonaon_123@gmail.com",
		Password:   string(pass1),
		FormOfWork: form1,
		Status:     Status1,
		Religion:   Religion1,
		Education:  education1,
	}
	db.Model(&Trainer{}).Create(&Trainer1)

	pass2, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	Trainer2 := Trainer{
		Name:       "opopopo",
		University: "SUT",
		Gpax:       3.73,
		Gender:     "ชาย",
		Age:        21,
		Address:    "90/8 บ.โคกก่อง",
		Email:      "Aonaon_1234@gmail.com",
		Password:   string(pass2),
		FormOfWork: form1,
		Status:     Status1,
		Religion:   Religion2,
		Education:  education1,
	}
	db.Model(&Trainer{}).Create(&Trainer2)

	// Review
	RankA := Rank{
		Name: "แย่",
	}
	db.Model(&Rank{}).Create(&RankA)

	RankB := Rank{
		Name: "พอใช้",
	}
	db.Model(&Rank{}).Create(&RankB)

	RankC := Rank{
		Name: "ปานกลาง",
	}
	db.Model(&Rank{}).Create(&RankC)

	RankD := Rank{
		Name: "ดี",
	}
	db.Model(&Rank{}).Create(&RankD)

	RankE := Rank{
		Name: "ดีมาก",
	}
	db.Model(&Rank{}).Create(&RankE)

	ReviewA := Review{
		Content:      "Test Der",
		Image:        "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
		CourseDetail: CourseDetail1,
		Rank:         RankE,
		Member:       Member1,
	}
	db.Model(&Review{}).Create(&ReviewA)

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

	MainIngredientC := MainIngredient{
		Name:    "แป้ง",
		Carolie: 364,
		Type:    "วัตถุดิบจากพืช",
	}
	db.Model(&MainIngredient{}).Create(&MainIngredientC)

	MainIngredientD := MainIngredient{
		Name:    "เนื้อหมู",
		Carolie: 242,
		Type:    "วัตถุดิบจากสัตว์",
	}
	db.Model(&MainIngredient{}).Create(&MainIngredientD)

	MainIngredientE := MainIngredient{
		Name:    "เนื้อวัว",
		Carolie: 250,
		Type:    "วัตถุดิบจากสัตว์",
	}
	db.Model(&MainIngredient{}).Create(&MainIngredientE)

	MainIngredientF := MainIngredient{
		Name:    "ยีสต์",
		Carolie: 325,
		Type:    "วัตถุดิบจากจุลลินทรีย์",
	}
	db.Model(&MainIngredient{}).Create(&MainIngredientF)

	MainIngredientG := MainIngredient{
		Name:    "ผลไม้",
		Carolie: 88,
		Type:    "วัตถุดิบจากพืช",
	}
	db.Model(&MainIngredient{}).Create(&MainIngredientG)

	FoodTypeA := FoodType{
		Name: "อาหารคาว",
	}
	db.Model(&FoodType{}).Create(&FoodTypeA)

	FoodTypeB := FoodType{
		Name: "อาหารหวาน",
	}
	db.Model(&FoodType{}).Create(&FoodTypeB)

	FoodInformationA := FoodInformation{
		Name:           "ไข่เจียว",
		Datetime:       "25/1/2566 18:29:33",
		Image:          "https://s359.kapook.com/pagebuilder/1c0a0dac-e4a9-4651-baa0-052a597ab7bf.jpg",
		Admin:          AdminA,
		MainIngredient: MainIngredientA,
		FoodType:       FoodTypeA,
	}
	db.Model(&FoodInformation{}).Create(&FoodInformationA)

	FoodInformationB := FoodInformation{
		Name:           "เค้กเรดเวลเวท",
		Datetime:       "26/1/2566 19:45:54",
		Image:          "https://s359.kapook.com/pagebuilder/9568b809-b606-404a-8253-26fe7287bda7.jpg",
		Admin:          AdminB,
		MainIngredient: MainIngredientB,
		FoodType:       FoodTypeB,
	}
	db.Model(&FoodInformation{}).Create(&FoodInformationB)

	// BodyMakeup for bodychange recording system --------------------------------------------------------------------------------------
	BodyChangeA := Body{
		Hieght:        176.00,
		Weight:        64.87,
		Hip:           32.4,
		UpperArmLeft:  45.4,
		UpperArmRight: 46.2,
		LeftThigh:     54.23,
		RightThigh:    53.3,
		NarrowWaist:   34.2,
		NavelWaist:    36.23,
		Bmi:           20.94,
		Date:          time.Now(),
		Note:          "หิววววววววววว",
		Trainer:       Trainer2,
		Member:        Member2,
		CourseDetail:  CourseDetail2,
	}
	db.Model(&Body{}).Create(&BodyChangeA)

	BodyChangeB := Body{
		Hieght:        175.6,
		Weight:        64.87,
		Hip:           32.4,
		UpperArmLeft:  45.4,
		UpperArmRight: 46.2,
		LeftThigh:     54.23,
		RightThigh:    53.3,
		NarrowWaist:   34.2,
		NavelWaist:    36.23,
		Bmi:           21.037,
		Date:          time.Now(),
		Note:          "อยากกินกะหรี่..ปั้บ",
		Trainer:       Trainer1,
		Member:        Member1,
		CourseDetail:  CourseDetail1,
	}
	db.Model(&Body{}).Create(&BodyChangeB)

	// Advice Part --------------------------------------------------------------------------------------

	Advice1 := Advice{
		Advice:        "กินโปรตีนเพิ่มให้ได้ 2 g ต่อน้ำหนักตัว 1 kg",
		RecordingDate: time.Now(),
		Member:        Member1,
		Trainer:       Trainer1,
		// Body: ,
		// DailyActivitie: ,
	}
	db.Model(&Advice{}).Create(&Advice1)

	Advice2 := Advice{
		Advice:        "ออกกำลังกายแบบคาร์ดิโอเพิ่มเป็นสัปดาห์ละ 4 วัน วันละ 1 ชม.",
		RecordingDate: time.Now(),
		Member:        Member2,
		Trainer:       Trainer2,
		// Body: ,
		// DailyActivitie
	}
	db.Model(&Advice{}).Create(&Advice2)

	Advice3 := Advice{
		Advice:        "เล่นเวทเทรนนิ่ง เพิ่มเป็นสัปดาห์ละ 3 วัน วันละ 1.5 ชม.",
		RecordingDate: time.Now(),
		Member:        Member3,
		Trainer:       Trainer2,
		// Body: ,
		// DailyActivitie: ,
	}
	db.Model(&Advice{}).Create(&Advice3)
	Discount1 := Discount{
		DiscountCode:       "NOCODE",
		DiscountPercentage: 0,
	}
	db.Model(&Discount{}).Create(&Discount1)
	Discount2 := Discount{
		DiscountCode:       "HEALTHY",
		DiscountPercentage: 10,
	}
	db.Model(&Discount{}).Create(&Discount2)
	Discount3 := Discount{
		DiscountCode:       "LOVE20",
		DiscountPercentage: 20,
	}
	db.Model(&Discount{}).Create(&Discount3)
	Discount4 := Discount{
		DiscountCode:       "S02G19",
		DiscountPercentage: 50,
	}
	db.Model(&Discount{}).Create(&Discount4)

	Duration1 := Duration{
		NumberOfDays:       30,
		DurationPercentage: 0,
	}
	db.Model(&Duration{}).Create(&Duration1)
	Duration2 := Duration{
		NumberOfDays:       60,
		DurationPercentage: 5,
	}
	db.Model(&Duration{}).Create(&Duration2)

	// --------------------------------------------------------------------------------------------------
	// ----------------------------------------  MealPlan  ----------------------------------------------
	// --------------------------------------------------------------------------------------------------
	MealTypeA := MealType{
		Name: "beakfast",
	}
	db.Model(&MealType{}).Create(&MealTypeA)

	MealTypeB := MealType{
		Name: "lunch",
	}
	db.Model(&MealType{}).Create(&MealTypeB)

	MealTypeC := MealType{
		Name: "dinner",
	}
	db.Model(&MealType{}).Create(&MealTypeC)

	DayOfWeeksA := DayOfWeeks{
		Name: "Sunday",
	}
	db.Model(&DayOfWeeks{}).Create(&DayOfWeeksA)

	DayOfWeeksB := DayOfWeeks{
		Name: "Monday",
	}
	db.Model(&DayOfWeeks{}).Create(&DayOfWeeksB)

	DayOfWeeksC := DayOfWeeks{
		Name: "Friday",
	}
	db.Model(&DayOfWeeks{}).Create(&DayOfWeeksC)

	NutritiousA := Nutritious{
		Calories:     271.1,
		Carbohydrate: 10,
		Protein:      21.5,
	}
	db.Model(&Nutritious{}).Create(&NutritiousA)

	NutritiousB := Nutritious{
		Calories:     252,
		Carbohydrate: 21.5,
		Protein:      25,
	}
	db.Model(&Nutritious{}).Create(&NutritiousB)

	NutritiousC := Nutritious{
		Calories:     311.5,
		Carbohydrate: 19,
		Protein:      12.5,
	}
	db.Model(&Nutritious{}).Create(&NutritiousC)

	//Main Entity
	MealPlanA := MealPlan{
		Name:            "Meal Plan A",
		Notes:           "รับประทานโปรตีนเพิ่ม",
		Date:            time.Now(),
		MealType:        MealTypeA,
		DayOfWeeks:      DayOfWeeksA,
		Nutritious:      NutritiousA,
		Admin:           AdminA,
		Member:          Member1,
		FoodInformation: FoodInformationA,
	}
	db.Model(&MealPlan{}).Create(&MealPlanA)

	MealPlanB := MealPlan{
		Name:            "Meal Plan B",
		Notes:           "รับประทานอาหารเพิ่มเป็น 4 มื้อ",
		Date:            time.Now(),
		MealType:        MealTypeB,
		DayOfWeeks:      DayOfWeeksB,
		Nutritious:      NutritiousB,
		Admin:           AdminB,
		Member:          Member2,
		FoodInformation: FoodInformationB,
	}
	db.Model(&MealPlan{}).Create(&MealPlanB)

	MealPlanC := MealPlan{
		Name:            "Meal Plan C",
		Notes:           "งดอาหารรสจัด",
		Date:            time.Now(),
		MealType:        MealTypeC,
		DayOfWeeks:      DayOfWeeksC,
		Nutritious:      NutritiousC,
		Admin:           AdminC,
		Member:          Member3,
		FoodInformation: FoodInformationA,
	}
	db.Model(&MealPlan{}).Create(&MealPlanC)

	//--------------------------------------------------------------------------------------------------
	//----------------------------------------  DailyActivities  ---------------------------------------
	//--------------------------------------------------------------------------------------------------
	FoodAllergiesA := FoodAllergies{
		Allergen:      "ไข่ นม",
		AllergyType:   "ชนิดไม่เฉียบพลัน",
		Reaction:      "อาการจะค่อยๆ เกิดขึ้นหลังจากทานอาหารเข้าไปแล้ว หลายชั่วโมงหรืออาจเป็นวัน เช่น เป็นผื่นโดยจะมีผื่นแดง",
		LastReactDate: time.Date(2023, time.January, 3, 15, 03, 00, 0, time.UTC),
	}
	db.Model(&FoodAllergies{}).Create(&FoodAllergiesA)

	FoodAllergiesB := FoodAllergies{
		Allergen:      "ถั่ว",
		AllergyType:   "ชนิดเฉียบพลัน",
		Reaction:      "อาการจะเกิดขึ้นภายใน 30 นาที-1 ชั่วโมง หลังจากทานอาหารเข้าไปและมีความเสี่ยงที่จะเกิดอาการแพ้รุนแรงได้ เช่น มีอาการตาบวม ปากบวม ผื่นลมพิษ หลอดลมตีบ ไอ แน่นหน้าอก หายใจไม่ออก ปวดท้อง อาเจียน",
		LastReactDate: time.Date(2023, time.January, 3, 15, 03, 00, 0, time.UTC),
	}
	db.Model(&FoodAllergies{}).Create(&FoodAllergiesB)

	FoodAllergiesC := FoodAllergies{
		Allergen:      "อาหารทะเล",
		AllergyType:   "ชนิดรุนแรง",
		Reaction:      "เป็นอาการแพ้ในระดับรุนแรงที่สุดและเป็นอันตรายถึงชีวิต โดยอาการอาจเกิดขึ้นทันทีที่ทานอาหารที่แพ้เข้าไป อาการที่เกิดขึ้นได้แก่ ผื่นแดงตามผิวหนัง ลมพิษ คัน ผิวหนัง แดงหรือซีด เวียนศีรษะ หน้ามืดคล้ายจะเป็นลม คลื่นไส้ อาเจียน ปวดท้อง หรือท้องเสีย",
		LastReactDate: time.Date(2023, time.January, 3, 15, 03, 00, 0, time.UTC),
	}
	db.Model(&FoodAllergies{}).Create(&FoodAllergiesC)

	ActivitiesTypeA := ActivitiesType{
		Name: "Balance",
	}
	db.Model(&ActivitiesType{}).Create(&ActivitiesTypeA)

	ActivitiesTypeB := ActivitiesType{
		Name: "Aerobic",
	}
	db.Model(&ActivitiesType{}).Create(&ActivitiesTypeB)

	ActivitiesTypeC := ActivitiesType{
		Name: "Muscle-strengthening",
	}
	db.Model(&ActivitiesType{}).Create(&ActivitiesTypeC)

	DailyActivitiesA := DailyActivities{
		Name:           "เดิน",
		Duration:       "45 นาที",
		Date:           time.Date(2023, time.January, 3, 15, 03, 00, 0, time.UTC),
		ActivitiesType: ActivitiesTypeA,
		Admin:          AdminA,
		Member:         Member1,
	}
	db.Model(&DailyActivities{}).Create(&DailyActivitiesA)

	DailyActivitiesB := DailyActivities{
		Name:           "วิ่ง",
		Duration:       "1 ชั่วโมง",
		Date:           time.Date(2023, time.January, 3, 15, 03, 00, 0, time.UTC),
		ActivitiesType: ActivitiesTypeB,
		Admin:          AdminB,
		Member:         Member2,
	}
	db.Model(&DailyActivities{}).Create(&DailyActivitiesB)

	DailyActivitiesC := DailyActivities{
		Name:           "ปืนเขา",
		Duration:       "2 ชั่ว",
		Date:           time.Date(2023, time.January, 3, 15, 03, 00, 0, time.UTC),
		ActivitiesType: ActivitiesTypeC,
		Admin:          AdminC,
		Member:         Member3,
	}
	db.Model(&DailyActivities{}).Create(&DailyActivitiesC)

	//==========================ระบบจัดการสารอาหาร==========================

	MostNutrientA := MostNutrient{
		Name:           "คาร์โบไฮเดรต",
		CaloriePerGram: 4,
	}
	db.Model(&MostNutrient{}).Create(&MostNutrientA)

	MostNutrientB := MostNutrient{
		Name:           "โปรตีน",
		CaloriePerGram: 4,
	}
	db.Model(&MostNutrient{}).Create(&MostNutrientB)

	MostNutrientC := MostNutrient{
		Name:           "ไขมัน",
		CaloriePerGram: 9,
	}
	db.Model(&MostNutrient{}).Create(&MostNutrientC)

	MostNutrientD := MostNutrient{
		Name:           "เกลือแร่",
		CaloriePerGram: 0,
	}
	db.Model(&MostNutrient{}).Create(&MostNutrientD)

	MostNutrientE := MostNutrient{
		Name:           "วิตามิน",
		CaloriePerGram: 0,
	}
	db.Model(&MostNutrient{}).Create(&MostNutrientE)

	NutrientA := Nutrient{
		FoodInformation: FoodInformationA,
		MostNutrient:    MostNutrientA,
		TotalCalorie:    165,
		Comment:         "ไม่ควรกินเกิน 3 ฟอง",
		Admin:           AdminA,
		Date:            "20/12/2022 15:00",
	}
	db.Model(&Nutrient{}).Create(&NutrientA)

	NutrientB := Nutrient{
		FoodInformation: FoodInformationB,
		MostNutrient:    MostNutrientB,
		TotalCalorie:    100,
		Comment:         "กินเพื่อลดน้ำหนักได้ดี",
		Admin:           AdminB,
		Date:            "21/12/2022 16:00",
	}
	db.Model(&Nutrient{}).Create(&NutrientB)

}
