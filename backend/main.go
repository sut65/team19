package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/controller"
	foodInformation "github.com/sut65/team19/controller/FoodInformation"
	blog "github.com/sut65/team19/controller/blog"
	"github.com/sut65/team19/entity"
	"github.com/sut65/team19/middlewares"
)

const PORT = "8080"

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())
		{
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
			router.POST("/trainer", controller.CreateTrainer)
			router.GET("/trainer/:id", controller.GetTrainer)
			router.GET("/trainers", controller.ListTrainer)
			router.DELETE("/trainer/:id", controller.DeleteTrainer)
			router.PATCH("/trainers", controller.UpdateTrainer)

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
		}
	}

	// Run the server go run main.go
	r.Run("localhost: " + PORT)
}
