package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// POST /foodinformations
func CreateFoodInformation(c *gin.Context) {

	var food_information entity.FoodInformation
	var admin entity.Admin
	var main_ingredient entity.MainIngredient
	var food_type entity.FoodType

	if err := c.ShouldBindJSON(&food_information); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", food_information.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// ค้นหา main_ingredient ด้วย id
	if tx := entity.DB().Where("id = ?", food_information.MainIngredientID).First(&main_ingredient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "main_ingredient not found"})
		return
	}

	// ค้นหา food_type ด้วย id
	if tx := entity.DB().Where("id = ?", food_information.FoodTypeID).First(&food_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "food_type not found"})
		return
	}

	// สร้าง food_information
	fif := entity.FoodInformation{
		Admin:   			admin,
		MainIngredient:     main_ingredient,
		FoodType:       	food_type,
		Image: 				food_information.Image,
		Name:     			food_information.Name,
		Datetime:    		food_information.Datetime,
	}

	// บันทึก
	if err := entity.DB().Create(&fif).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": fif})
}

// GET /food_information/:id
func GetFoodInformation(c *gin.Context) {
	var food_information entity.FoodInformation
	id := c.Param("id")

	if tx := entity.DB().Preload("Food_Type").Preload("Main_Ingredient").Preload("Admin").Where("id = ?", id).First(&food_information); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "food_information not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": food_information})
}

// GET /food_informations
func ListFoodInformations(c *gin.Context) {
	var food_informations []entity.FoodInformation
	if err := entity.DB().Preload("Food_Type").Preload("Main_Ingredient").Preload("Admin").Raw("SELECT * FROM food_informations").Find(&food_informations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": food_informations})
}

// DELETE /food_information/:id
func DeleteFoodInformation(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM food_informations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "food_information not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /food_information
func UpdateFoodInformation(c *gin.Context) {
	var food_information entity.FoodInformation
	var newFood_information entity.FoodInformation

	if err := c.ShouldBindJSON(&food_information); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newFood_information.Name = food_information.Name
	newFood_information.Image = food_information.Image
	newFood_information.Datetime = food_information.Datetime
	newFood_information.Admin = food_information.Admin
	newFood_information.MainIngredient = food_information.MainIngredient
	newFood_information.FoodType = food_information.FoodType

	// update := entity.Blog{
	// 	CoverImage: newBlog.CoverImage,
	// 	Title:      newBlog.Title,
	// 	Content:    newBlog.Content,
	// 	Category:   newBlog.Category,
	// 	Tag:        newBlog.Tag,
	// 	User:       newBlog.User,
	// }

	if err := entity.DB().Where("id = ?", food_information.ID).Updates(&newFood_information).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newFood_information})
}