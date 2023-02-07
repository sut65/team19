package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	"github.com/asaskevich/govalidator"
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

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(foodinformation); err != nil {
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

	// อัปเดต food_information
	update := entity.FoodInformation{
		Admin:   			admin,
		MainIngredient:     mainingredient,
		FoodType:       	foodtype,
		Image: 				foodinformation.Image,
		Name:     			foodinformation.Name,
		Datetime:    		foodinformation.Datetime,
	}

	// บันทึก
	if err := entity.DB().Where("id = ?", foodinformation.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": update})
}