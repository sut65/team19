package main

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/controller"
	CourseService "github.com/sut65/team19/controller/CourseService"
	DailyActivities "github.com/sut65/team19/controller/DailyActivities"
	foodInformation "github.com/sut65/team19/controller/FoodInformation"
	MealPlan "github.com/sut65/team19/controller/MealPlan"
	nutrient "github.com/sut65/team19/controller/Nutrient"
	Payment "github.com/sut65/team19/controller/Payment"
	trainer "github.com/sut65/team19/controller/Trainer"
	CourseDetail "github.com/sut65/team19/controller/CourseDetail"
	blog "github.com/sut65/team19/controller/blog"
	review "github.com/sut65/team19/controller/review"
	Advice "github.com/sut65/team19/controller/Advice"
	"github.com/sut65/team19/entity"
	"github.com/sut65/team19/middlewares"
)

const PORT = "8080"

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func main() {
	// Delete database file before BUILD and RUN
	os.Remove("./nutrition.db")

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())
		{
			// Subtable for trainers and members
			r.GET("/status/:id", controller.GetStatus)
			r.GET("/statuses", controller.ListStatus)

			r.GET("/religion/:id", controller.GetReligion)
			r.GET("/religions", controller.ListReligion)

			r.GET("/gender/:id", controller.GetGender)
			r.GET("/genders", controller.Listgenders)

			r.GET("/exercise/:id", controller.GetExercise)
			r.GET("/exercises", controller.ListExercise)

			r.GET("/tatse/:id", controller.GetTatse)
			r.GET("/tastes", controller.ListTatse)

			// course_service Routes
			router.POST("/course_service", CourseService.CreateCourseService)
			router.GET("/course_service/:id", CourseService.GetCourseService)
			router.GET("/course_services", CourseService.ListCourseServices)
			router.GET("/course_service_by_uid/:uid", CourseService.GetCourseServiceByUID)
			router.DELETE("/course_service/:id", CourseService.DeleteCourseService)
			router.PATCH("/course_services", CourseService.UpdateCourseService)

			// course_detail Routes
			router.POST("/course_detail", CourseDetail.CreateCourseDetail)
			router.GET("/course_detail/:id", CourseDetail.GetCourseDetail)
			router.GET("/course_details", CourseDetail.ListCourseDetails)
			router.DELETE("/course_detail/:id", CourseDetail.DeleteCourseDetail)
			router.PATCH("/course_details", CourseDetail.UpdateCourseDetail)

			router.GET("/description/:id", CourseDetail.GetDescription)
			router.GET("/descriptions", CourseDetail.ListDescriptions)

			router.GET("/price/:id", CourseDetail.GetPrice)
			router.GET("/prices", CourseDetail.ListPrices)

			// member Routes
			router.GET("/member/:id", controller.GetMember)
			router.GET("/members", controller.ListMembers)
			router.DELETE("/member/:id", controller.DeleteMember)
			router.PATCH("/members", controller.UpdateMember)

			// DailyActivities Routes
			r.POST("/dailyactivities", DailyActivities.CreateActivity)
			r.GET("/dailyactivities/:id", DailyActivities.GetActivity)
			r.GET("/dailyactivities", DailyActivities.ListActivities)
			r.PATCH("/dailyactivity", DailyActivities.UpdateActivity)
			r.DELETE("/dailyactivities/:id", DailyActivities.DeleteActivity)

			r.GET("/activitiestypes", DailyActivities.GetActivitiesTypes)
			r.GET("/activitiestypes/:id", DailyActivities.ListActivitiesTypes)

			// MealPlan Routes
			r.POST("/mealplans", MealPlan.CreateMealPlans)
			r.GET("/mealplans/:id", MealPlan.GetMealPlans)
			r.GET("/mealplans", MealPlan.ListMealPlans)
			r.PATCH("/mealplans", MealPlan.UpdateMealPlans)
			r.DELETE("/mealplans/:id", MealPlan.DeleteMealPlans)

			r.GET("/nutritious/:id", MealPlan.GetNutritious)
			r.GET("/nutritious", MealPlan.ListNutritious)
			r.GET("/avoidfoods/:id", MealPlan.GetAvoidFood)
			r.GET("/avoidfoods", MealPlan.ListAvoidFoods)

			// trainer Routes
			r.GET("/trainer/:id", trainer.GetTrainer)
			r.GET("/trainer", trainer.ListTrainers)
			r.POST("/trainer", trainer.CreateTrainder)
			router.DELETE("/trainer/:id", trainer.DeleteTrainer)
			router.PATCH("/trainers", trainer.UpdateTrainer)

			r.GET("/form/:id", trainer.GetForm)
			r.GET("/forms", trainer.ListForms)

			r.GET("/education/:id", trainer.GetEducation)
			r.GET("/educations", trainer.ListEducation)

			// Body routes
			router.POST("/body", controller.CreateBody)
			router.GET("/body/:id", controller.GetBody)
			router.GET("/bodies", controller.ListBodies)
			router.PATCH("/body", controller.UpdateBody)
			router.DELETE("/body/:id", controller.DeleteBody)

			// FoodInformation Routes
			router.GET("/food_informations", foodInformation.ListFoodInformations)
			router.GET("/food_information/:id", foodInformation.GetFoodInformation)
			router.POST("/food_informations", foodInformation.CreateFoodInformation)
			router.PATCH("/update-food_information", foodInformation.UpdateFoodInformation)
			router.DELETE("/delete-food_information/:id", foodInformation.DeleteFoodInformation)

			router.GET("/food_types", foodInformation.ListFoodTypes)
			router.GET("/food_type/:id", foodInformation.GetFoodInformation)
			router.GET("/main_ingredients", foodInformation.ListMainIngredients)
			router.GET("/main_ingredient/:id", foodInformation.GetMainIngredient)

			// Review Routes
			router.GET("/reviews", review.ListReviews)
			router.GET("/review/:id", review.GetReview)
			router.GET("/review-cid/:id", review.GetReviewByCourseID)
			router.POST("/reviews", review.CreateReview)
			router.PATCH("/update-review", review.UpdateReview)
			router.DELETE("/delete-review/:id", review.DeleteReview)

			router.GET("/ranks", review.ListRanks)
			router.GET("/rank/:id", review.GetRank)

			// Blog Routes
			router.GET("/blogs", blog.ListBlogs)
			router.GET("/blog/:id", blog.GetBlog)
			router.POST("/blogs", blog.CreateBlog)
			router.PATCH("/update-blog", blog.UpdateBlog)
			router.DELETE("/delete-blog/:id", blog.DeleteBlog)

			router.GET("/categories", blog.ListCategories)
			router.GET("/category/:id", blog.GetCategory)
			router.GET("/tags", blog.ListTags)
			router.GET("/tag/:id", blog.GetTag)

			// admin Routes
			router.POST("/admin", controller.CreateAdmin)
			router.GET("/admin/:id", controller.GetAdmin)
			router.GET("/admins", controller.ListAdmins)
			router.DELETE("/admin/:id", controller.DeleteAdmin)
			router.PATCH("/admins", controller.UpdateAdmin)

			// advice Routes
			router.POST("/advice", Advice.CreateAdvice)
			router.GET("/advice/:id", Advice.GetAdvice)
			router.GET("/advices", Advice.ListAdvice)
			router.DELETE("/advice/:id", Advice.DeleteAdvice)
			router.PATCH("/advices", Advice.UpdateAdvice)

			// Nutrient Routes
			router.GET("/nutrients", nutrient.ListNutrients)
			router.GET("/nutrient/:id", nutrient.GetNutrient)
			router.POST("/nutrients", nutrient.CreateNutrient)
			router.PATCH("/update-nutrient", nutrient.UpdateNutrient)
			router.DELETE("/delete-nutrient/:id", nutrient.DeleteNutrient)

			router.GET("/most_nutrients", nutrient.ListMostNutrients)
			router.GET("/most_nutrient/:id", nutrient.GetMostNutrient)

			// Behavior Routes
			router.POST("/behavior", controller.CreateBehavior)
			router.GET("/behavior/:id", controller.GetBehavior)
			router.GET("/behaviors", controller.ListBehaviors)
			router.DELETE("/behavior/:id", controller.DeleteBehavior)
			router.PATCH("/behaviors", controller.UpdateBehavior)

			// discount Routes
			router.POST("/discount", Payment.CreateDiscount)
			router.GET("/discount/:discount_code", Payment.GetDiscount)
			router.GET("/discounts", Payment.ListDiscounts)
			router.DELETE("/discount/:id", Payment.DeleteDiscount)
			router.PATCH("/discounts", Payment.UpdateDiscount)

			// duration Routes
			router.POST("/duration", Payment.CreateDuration)
			router.GET("/duration/:id", Payment.GetDuration)
			router.GET("/durations", Payment.ListDurations)
			router.DELETE("/duration/:id", Payment.DeleteDuration)
			router.PATCH("/durations", Payment.UpdateDuration)

			// payment Routes
			router.POST("/payment", Payment.CreatePayment)
			router.GET("/payment/:id", Payment.GetPayment)
			router.GET("/payments", Payment.ListPayments)
			router.GET("/payment-history/:uid", Payment.ListPaymentByUID)
		}
	}
	// login User Route
	r.POST("/login", controller.Login)
	r.POST("/trainerLogin", controller.LoginTrainer)
	r.POST("/adminLogin", controller.LoginAdmin)

	r.POST("/member", controller.CreateMember)

	// Run the server go run main.go
	r.Run("localhost: " + PORT)
}
