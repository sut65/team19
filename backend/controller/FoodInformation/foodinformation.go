package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// POST /foodinformations
func CreateFoodInformation(c *gin.Context) {

	var foodinformation entity.FoodInformation
	var admin entity.Admin
	var mainingredient entity.MainIngredient
	var foodtype entity.FoodType

	if err := c.ShouldBindJSON(&foodinformation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", foodinformation.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// ค้นหา main_ingredient ด้วย id
	if tx := entity.DB().Where("id = ?", foodinformation.MainIngredientID).First(&mainingredient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "main_ingredient not found"})
		return
	}

	// ค้นหา food_type ด้วย id
	if tx := entity.DB().Where("id = ?", foodinformation.FoodTypeID).First(&foodtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "food_type not found"})
		return
	}

	// สร้าง food_information
	fif := entity.FoodInformation{
		Admin:   			admin,
		MainIngredient:     mainingredient,
		FoodType:       	foodtype,
		Image: 				foodinformation.Image,
		Name:     			foodinformation.Name,
		Datetime:    		foodinformation.Datetime,
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
	var foodinformation entity.FoodInformation
	id := c.Param("id")

	if tx := entity.DB().Preload("FoodType").Preload("MainIngredient").Preload("Admin").Where("id = ?", id).First(&foodinformation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "food_information not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": foodinformation})
}

// GET /food_informations
func ListFoodInformations(c *gin.Context) {
	var foodinformations []entity.FoodInformation
	if err := entity.DB().Preload("FoodType").Preload("MainIngredient").Preload("Admin").Raw("SELECT * FROM food_informations").Find(&foodinformations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": foodinformations})
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

	if err := entity.DB().Where("id = ?", food_information.ID).Updates(&newFood_information).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newFood_information})
}