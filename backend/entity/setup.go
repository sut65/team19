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
		&AvoidFood{},
		&MealsOfDay{},
		&BreakFast{},
		&Lunch{},
		&Dinner{},
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
		// MealPlans
		&MealPlans{},
		//Advice
		&Advice{},
		// Payment
		&Discount{},
		&Duration{},
		&Payment{},
		// Nutrient
		&MostNutrient{},
		&Nutrient{},
		//Behavior
		&Behavior{},
		&Taste{},
		&Exercise{},
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
		CoverPage:   "https://www.iglss.org/wp-content/uploads/2019/02/diet-plan.jpg",
		Description: Description1,
		Admin:       AdminA,
		Price:       Price3,
	}
	db.Model(&CourseDetail{}).Create(&CourseDetail1)

	CourseDetail2 := CourseDetail{
		CourseName:  "ลดพุงกู้ร่างกลับคืน",
		CoverPage:   "https://bgh.sgp1.digitaloceanspaces.com/old-site/inline-images/before-weight-loss-01.jpg",
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

	MainIngredientH := MainIngredient{
		Name:    "เนื้อกุ้ง",
		Carolie: 99,
		Type:    "วัตถุดิบจากสัตว์",
	}
	db.Model(&MainIngredient{}).Create(&MainIngredientH)

	FoodTypeA := FoodType{
		Name: "อาหารคาว",
	}
	db.Model(&FoodType{}).Create(&FoodTypeA)

	FoodTypeB := FoodType{
		Name: "อาหารหวาน",
	}
	db.Model(&FoodType{}).Create(&FoodTypeB)

	FoodInformationA := FoodInformation{
		Name:           "ล็อบสเตอร์อบชีส",
		Datetime:       "25/1/2566 18:29:33",
		Image:          "https://img.wongnai.com/p/1920x0/2018/05/03/1d12ded0c8b943a7a8a7d281d694876b.jpg",
		Admin:          AdminA,
		MainIngredient: MainIngredientH,
		FoodType:       FoodTypeA,
	}
	db.Model(&FoodInformation{}).Create(&FoodInformationA)

	FoodInformationB := FoodInformation{
		Name:           "เค้กเรดเวลเวท",
		Datetime:       "26/1/2566 19:45:54",
		Image:          "https://s359.kapook.com/pagebuilder/9568b809-b606-404a-8253-26fe7287bda7.jpg",
		Admin:          AdminB,
		MainIngredient: MainIngredientC,
		FoodType:       FoodTypeB,
	}
	db.Model(&FoodInformation{}).Create(&FoodInformationB)

	FoodInformationC := FoodInformation{
		Name:           "สเต๊กเนื้อ",
		Datetime:       "26/1/2566 19:45:54",
		Image:          "https://img.wongnai.com/p/1920x0/2019/03/23/73a95587aa2f46e0b160e5a7d9ef430f.jpg",
		Admin:          AdminC,
		MainIngredient: MainIngredientE,
		FoodType:       FoodTypeA,
	}
	db.Model(&FoodInformation{}).Create(&FoodInformationC)

	// BodyMakeup for bodychange recording system --------------------------------------------------------------------------------------
	BodyChangeA := Body{
		Height:        176.00,
		Weight:        64.87,
		Hip:           32.4,
		UpperArmLeft:  45.4,
		UpperArmRight: 46.2,
		LeftThigh:     54.23,
		RightThigh:    53.3,
		NarrowWaist:   34.2,
		NavelWaist:    36.23,
		Bmi:           20.94,
		Note:          "หิววววววววววว",
		Trainer:       Trainer2,
		Member:        Member2,
		CourseDetail:  CourseDetail2,
	}
	db.Model(&Body{}).Create(&BodyChangeA)

	BodyChangeB := Body{
		Height:        175.6,
		Weight:        64.87,
		Hip:           32.4,
		UpperArmLeft:  45.4,
		UpperArmRight: 46.2,
		LeftThigh:     54.23,
		RightThigh:    53.3,
		NarrowWaist:   34.2,
		NavelWaist:    36.23,
		Bmi:           21.037,
		Note:          "อยากกินกะหรี่..ปั้บ",
		Trainer:       Trainer1,
		Member:        Member1,
		CourseDetail:  CourseDetail1,
	}
	db.Model(&Body{}).Create(&BodyChangeB)

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
		DurationPercentage: 2,
	}
	db.Model(&Duration{}).Create(&Duration2)
	Duration3 := Duration{
		NumberOfDays:       90,
		DurationPercentage: 5,
	}
	db.Model(&Duration{}).Create(&Duration3)
	Duration4 := Duration{
		NumberOfDays:       180,
		DurationPercentage: 10,
	}
	db.Model(&Duration{}).Create(&Duration4)
	Duration5 := Duration{
		NumberOfDays:       365,
		DurationPercentage: 20,
	}
	db.Model(&Duration{}).Create(&Duration5)
	// for test update when expired
	Duration6 := Duration{
		NumberOfDays:       0.001,
		DurationPercentage: 0,
	}
	db.Model(&Duration{}).Create(&Duration6)

	// --------------------------------------------------------------------------------------------------
	// ----------------------------------------  MealPlans  ----------------------------------------------
	// --------------------------------------------------------------------------------------------------
	MealsOfDayA := MealsOfDay{
		Name: "beakfast",
	}
	db.Model(&MealsOfDay{}).Create(&MealsOfDayA)

	MealsOfDayB := MealsOfDay{
		Name: "lunch",
	}
	db.Model(&MealsOfDay{}).Create(&MealsOfDayB)

	MealsOfDayC := MealsOfDay{
		Name: "dinner",
	}
	db.Model(&MealsOfDay{}).Create(&MealsOfDayC)

	BreakFastA := BreakFast{
		FoodInformation: FoodInformationA,
	}
	db.Model(&BreakFast{}).Create(&BreakFastA)

	BreakFastB := BreakFast{
		FoodInformation: FoodInformationB,
	}
	db.Model(&BreakFast{}).Create(&BreakFastB)

	BreakFastC := BreakFast{
		FoodInformation: FoodInformationC,
	}
	db.Model(&BreakFast{}).Create(&BreakFastC)
	LunchA := Lunch{
		FoodInformation: FoodInformationA,
	}
	db.Model(&Lunch{}).Create(&LunchA)
	LunchB := Lunch{
		FoodInformation: FoodInformationB,
	}
	db.Model(&Lunch{}).Create(&LunchB)
	LunchC := Lunch{
		FoodInformation: FoodInformationC,
	}
	db.Model(&Lunch{}).Create(&LunchC)
	DinnerA := Dinner{
		FoodInformation: FoodInformationA,
	}
	db.Model(&Dinner{}).Create(&DinnerA)
	DinnerB := Dinner{
		FoodInformation: FoodInformationB,
	}
	db.Model(&Dinner{}).Create(&DinnerB)
	DinnerC := Dinner{
		FoodInformation: FoodInformationC,
	}
	db.Model(&Dinner{}).Create(&DinnerC)

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

	AvoidFoodA := AvoidFood{
		Name: "ถั่ว",
	}
	db.Model(&AvoidFood{}).Create(&AvoidFoodA)

	AvoidFoodB := AvoidFood{
		Name: "นม",
	}
	db.Model(&AvoidFood{}).Create(&AvoidFoodB)

	AvoidFoodC := AvoidFood{
		Name: "ไข่",
	}
	db.Model(&AvoidFood{}).Create(&AvoidFoodC)

	//Main Entity
	MealPlansA := MealPlans{
		Date:        time.Date(2023, time.January, 3, 15, 03, 00, 0, time.UTC),
		Description: "รับประทานโปรตีนเพิ่ม",

		MealsOfDay: MealsOfDayA,
		AvoidFood:  AvoidFoodA,
		Nutritious: NutritiousA,
		Admin:      AdminA,
		Member:     Member1,
	}
	db.Model(&MealPlans{}).Create(&MealPlansA)

	MealPlansB := MealPlans{
		Date:        time.Date(2023, time.January, 4, 10, 05, 00, 0, time.UTC),
		Description: "รับประทานอาหารเพิ่มเป็น 4 มื้อ",

		MealsOfDay: MealsOfDayB,
		AvoidFood:  AvoidFoodB,
		Nutritious: NutritiousB,
		Admin:      AdminB,
		Member:     Member2,
	}
	db.Model(&MealPlans{}).Create(&MealPlansB)
	MealPlansC := MealPlans{
		Date:        time.Date(2023, time.January, 4, 10, 02, 01, 0, time.UTC),
		Description: "งดอาหารรสจัด",

		MealsOfDay: MealsOfDayC,
		AvoidFood:  AvoidFoodC,
		Nutritious: NutritiousC,
		Admin:      AdminC,
		Member:     Member3,
	}
	db.Model(&MealPlans{}).Create(&MealPlansC)

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

	// Advice part ------------------------------------------------------
	Advice1 := Advice{
		Advice:          "กินโปรตีนเพิ่มให้ได้ 2 g ต่อน้ำหนักตัว 1 kg",
		RecordingDate:   time.Date(2023, time.January, 4, 14, 14, 00, 0, time.UTC),
		Member:          Member1,
		Trainer:         Trainer1,
		Body:            BodyChangeA,
		DailyActivities: DailyActivitiesA,
	}
	db.Model(&Advice{}).Create(&Advice1)

	Advice2 := Advice{
		Advice:          "ออกกำลังกายแบบคาร์ดิโอเพิ่มเป็นสัปดาห์ละ 4 วัน วันละ 1 ชม.",
		RecordingDate:   time.Date(2023, time.January, 25, 12, 30, 00, 0, time.UTC),
		Member:          Member2,
		Trainer:         Trainer2,
		Body:            BodyChangeB,
		DailyActivities: DailyActivitiesB,
	}
	db.Model(&Advice{}).Create(&Advice2)

	Advice3 := Advice{
		Advice:          "เล่นเวทเทรนนิ่ง เพิ่มเป็นสัปดาห์ละ 3 วัน วันละ 1.5 ชม.",
		RecordingDate:   time.Date(2023, time.January, 27, 11, 47, 00, 0, time.UTC),
		Member:          Member3,
		Trainer:         Trainer2,
		Body:            BodyChangeA,
		DailyActivities: DailyActivitiesC,
	}
	db.Model(&Advice{}).Create(&Advice3)

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
		MostNutrient:    MostNutrientB,
		TotalCalorie:    253,
		Comment:         "กินเยอะจะไม่ดีกับสุขภาพ",
		Admin:           AdminA,
		Date:            "20/12/2022 15:00",
	}
	db.Model(&Nutrient{}).Create(&NutrientA)

	NutrientB := Nutrient{
		FoodInformation: FoodInformationB,
		MostNutrient:    MostNutrientA,
		TotalCalorie:    400,
		Comment:         "อร่อยม๊ากกกก !!!",
		Admin:           AdminB,
		Date:            "21/12/2022 16:00",
	}
	db.Model(&Nutrient{}).Create(&NutrientB)

	/////////////////////////////////////Behavior/////////////////////////////////////////////
	Taste1 := Taste{
		Name: "รสขม",
	}
	db.Model(&Taste{}).Create(&Taste1)

	Tastes := []Taste{
		{Name: "รสหวาน"},
		{Name: "รสเปรี้ยว"},
		{Name: "รสเค็ม"},
		{Name: "รสเผ็ด"},
	}
	db.Model(&Taste{}).Create(&Tastes)

	Exercise1 := Exercise{
		Name: "ไม่ออกเลย",
	}
	db.Model(&Exercise{}).Create(&Exercise1)

	Exercises := []Exercise{
		{Name: "มาก(5-7วัน/สัปดาห์)"},
		{Name: "ปกติ(3-4วัน/สัปดาห์)"},
		{Name: "น้อย(1-2วัน/สัปดาห์)"},
	}
	db.Model(&Exercise{}).Create(&Exercises)

	BehaviorA := Behavior{
		Meals:    "กินวันละ 4 มื้อ",
		Time:     "21/12/2022 17:00",
		Member:   Member1,
		Exercise: Exercise1,
		Taste:    Taste1,
	}
	db.Model(&Behavior{}).Create(&BehaviorA)

	BehaviorB := Behavior{
		Meals:    "กินวันละ 4 มื้อ",
		Time:     "21/12/2022 15:00",
		Member:   Member1,
		Exercise: Exercise1,
		Taste:    Taste1,
	}
	db.Model(&Behavior{}).Create(&BehaviorB)

}
