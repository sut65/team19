package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	"github.com/asaskevich/govalidator"
)

// POST /foodinformations
func CreateNutrient(c *gin.Context) {

	var nutrient entity.Nutrient
	var foodinformation entity.FoodInformation
	var admin entity.Admin
	var mostnutrient entity.MostNutrient

	if err := c.ShouldBindJSON(&nutrient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(nutrient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", nutrient.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// ค้นหา food_information ด้วย id
	if tx := entity.DB().Where("id = ?", nutrient.FoodInformationID).First(&foodinformation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "food_informations not found"})
		return
	}

	// ค้นหา most_nutrient ด้วย id
	if tx := entity.DB().Where("id = ?", nutrient.MostNutrientID).First(&mostnutrient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "most_nutrient not found"})
		return
	}

	// สร้าง nutrient
	nut := entity.Nutrient{
		Admin:   			admin,
		FoodInformation:    foodinformation,
		MostNutrient:       mostnutrient,
		Comment: 			nutrient.Comment,
		TotalCalorie:     	nutrient.TotalCalorie,
		Date:    			nutrient.Date,
	}

	// บันทึก
	if err := entity.DB().Create(&nut).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": nut})
}

// GET /nutrient/:id
func GetNutrient(c *gin.Context) {
	var nutrient entity.Nutrient
	id := c.Param("id")

	if tx := entity.DB().Preload("FoodInformation").Preload("MostNutrient").Preload("Admin").Where("id = ?", id).First(&nutrient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nutrient not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": nutrient})
}

// GET /nutrients
func ListNutrients(c *gin.Context) {
	var nutrient []entity.Nutrient
	if err := entity.DB().Preload("FoodInformation").Preload("MostNutrient").Preload("Admin").Raw("SELECT * FROM nutrients").Find(&nutrient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": nutrient})
}

// DELETE /nutrient/:id
func DeleteNutrient(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM nutrients WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nutrient not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /food_information
func UpdateNutrient(c *gin.Context) {
	var nutrient entity.Nutrient
	var foodinformation entity.FoodInformation
	var admin entity.Admin
	var mostnutrient entity.MostNutrient

	if err := c.ShouldBindJSON(&nutrient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(nutrient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", nutrient.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// ค้นหา food_information ด้วย id
	if tx := entity.DB().Where("id = ?", nutrient.FoodInformationID).First(&foodinformation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "food_informations not found"})
		return
	}

	// ค้นหา most_nutrient ด้วย id
	if tx := entity.DB().Where("id = ?", nutrient.MostNutrientID).First(&mostnutrient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "most_nutrient not found"})
		return
	}

	// สร้าง nutrient
	update := entity.Nutrient{
		Admin:   			admin,
		FoodInformation:    foodinformation,
		MostNutrient:       mostnutrient,
		Comment: 			nutrient.Comment,
		TotalCalorie:     	nutrient.TotalCalorie,
		Date:    			nutrient.Date,
	}

	// บันทึก
	if err := entity.DB().Where("id = ?", nutrient.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": update})
}