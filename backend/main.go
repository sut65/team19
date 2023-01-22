package main

import (
	"github.com/gin-gonic/gin"
	foodInformation "github.com/sut65/team19/controller/FoodInformation"
	blog "github.com/sut65/team19/controller/blog"
	"github.com/sut65/team19/entity"
	"github.com/sut65/team19/middlewares"
	"github.com/sut65/team19/controller"
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

	// Blog Routes
	r.GET("/blogs", blog.ListBlogs)
	r.GET("/blog/:id", blog.GetBlog)
	r.POST("/blogs", blog.CreateBlog)
	r.PATCH("/update-blog", blog.UpdateBlog)
	r.DELETE("/delete-blog/:id", blog.DeleteBlog)

	r.GET("/categories", blog.ListCategories)
	r.GET("/category/:id", blog.GetCategory)
	r.GET("/tags", blog.ListTags)
	r.GET("/tag/:id", blog.GetTag)

	// FoodInformation Routes
	r.GET("/food_informations", foodInformation.ListFoodInformations)
	r.GET("/food_information/:id", foodInformation.GetFoodInformation)
	r.POST("/food_informations", foodInformation.CreateFoodInformation)
	r.PATCH("/update-food_information", foodInformation.UpdateFoodInformation)
	r.DELETE("/delete-food_information/:id", foodInformation.DeleteFoodInformation)
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

			// user Routes
			router.POST("/user", controller.CreateUser)
			router.GET("/user/:id", controller.GetUser)
			router.GET("/users", controller.ListUsers)
			router.DELETE("/user/:id", controller.DeleteUser)
			router.PATCH("/users", controller.UpdateUser)

			// trainer Routes
			router.POST("/trainer", controller.CreateTrainer)
			router.GET("/trainer/:id", controller.GetTrainer)
			router.GET("/trainers", controller.ListTrainer)
			router.DELETE("/trainer/:id", controller.DeleteTrainer)
			router.PATCH("/trainers", controller.UpdateTrainer)
		}
	}

	r.GET("/food_types", foodInformation.ListFoodTypes)
	r.GET("/food_type/:id", foodInformation.GetFoodInformation)
	r.GET("/main_ingredients", foodInformation.ListMainIngredients)
	r.GET("/main_ingredient/:id", foodInformation.GetMainIngredient)

	// Run the server go run main.go
	r.Run("localhost: " + PORT)
}
