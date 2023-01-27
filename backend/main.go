package main

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/controller"
	foodInformation "github.com/sut65/team19/controller/FoodInformation"
	nutrient "github.com/sut65/team19/controller/Nutrient"
	trainer "github.com/sut65/team19/controller/Trainer"
	blog "github.com/sut65/team19/controller/blog"
	review "github.com/sut65/team19/controller/review"
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

			// course_service Routes
			router.POST("/course_service", controller.CreateCourseService)
			router.GET("/course_service/:id", controller.GetCourseService)
			router.GET("/course_services", controller.ListCourseServices)
			router.DELETE("/course_service/:id", controller.DeleteCourseService)
			router.PATCH("/course_services", controller.UpdateCourseService)

			// course_detail Routes
			router.POST("/course_detail", controller.CreateCourseDetail)
			router.GET("/course_detail/:id", controller.GetCourseDetail)
			router.GET("/course_details", controller.ListCourseDetails)
			router.DELETE("/course_detail/:id", controller.DeleteCourseDetail)
			router.PATCH("/course_details", controller.UpdateCourseDetail)

			// member Routes
			router.POST("/member", controller.CreateMember)
			router.GET("/member/:id", controller.GetMember)
			router.GET("/members", controller.ListMembers)
			router.DELETE("/member/:id", controller.DeleteMember)
			router.PATCH("/members", controller.UpdateMember)

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

			// price Routes
			router.POST("/price", controller.CreatePrice)
			router.GET("/price/:id", controller.GetPrice)
			router.GET("/prices", controller.ListPrices)
			router.DELETE("/price/:id", controller.DeletePrice)
			router.PATCH("/prices", controller.UpdatePrice)

			// description Routes
			router.POST("/description", controller.CreateDescription)
			router.GET("/description/:id", controller.GetDescription)
			router.GET("/descriptions", controller.ListDescriptions)
			router.DELETE("/description/:id", controller.DeleteDescription)
			router.PATCH("/descriptions", controller.UpdateDescription)

			// advice Routes
			router.POST("/advice", controller.CreateAdvice)
			router.GET("/advice/:id", controller.GetAdvice)
			router.GET("/advices", controller.ListAdvice)
			router.DELETE("/advice/:id", controller.DeleteAdvice)
			router.PATCH("/advices", controller.UpdateAdvice)

			// Nutrient Routes
			router.GET("/nutrients", nutrient.ListNutrients)
			router.GET("/nutrient/:id", nutrient.GetNutrient)
			router.POST("/nutrients", nutrient.CreateNutrient)
			router.PATCH("/update-nutrient", nutrient.UpdateNutrient)
			router.DELETE("/delete-nutrient/:id", nutrient.DeleteNutrient)

			router.GET("/most_nutrients", nutrient.ListMostNutrients)
			router.GET("/most_nutrient/:id", nutrient.GetMostNutrient)
		}
	}
	// login User Route
	r.POST("/login", controller.Login)
	r.POST("/trainerLogin", controller.LoginTrainer)

	// Run the server go run main.go
	r.Run("localhost: " + PORT)
}
