package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// POST MealPlan
func CreateMealPlan(c *gin.Context) {
	var mealplan entity.MealPlan
	var admin entity.Admin
	var member entity.Member
	var mealtype entity.MealType
	var foodinformation entity.FoodInformation

	if err := c.ShouldBindJSON(&mealplan); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find Admin By ID
	if tx := entity.DB().Where("id = ?", mealplan.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// Find Member By ID
	if tx := entity.DB().Where("id = ?", mealplan.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	// Find Food By ID
	if tx := entity.DB().Where("id = ?", mealplan.FoodInformationID).First(&foodinformation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "foodinformation not found"})
		return
	}
	// Find MealType By ID
	if tx := entity.DB().Where("id = ?", mealplan.MealTypeID).First(&mealtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	// CREATE mealplan
	mealplanCreate := entity.MealPlan{
		TimeToEat:       mealplan.TimeToEat,
		Description:     mealplan.Description,
		Admin:           admin,
		Member:          member,
		MealType:        mealtype,
		FoodInformation: foodinformation,
	}

	// Record
	if err := entity.DB().Create(&mealplanCreate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": mealplanCreate})
}

// GET => MealPlan By ID
func GetMealPlan(c *gin.Context) {
	var mealplan entity.MealPlan
	id := c.Param("id")

	if tx := entity.DB().Preload("Admin").Preload("Member").Preload("FoodInformation").Preload("MealType").Where("id = ?", id).First(&mealplan); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": " Mealplan Not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": mealplan})
}

// GET => LIST MealPlan
func GetMealPlans(c *gin.Context) {
	var mealplans []entity.MealPlan

	if err := entity.DB().Preload("Admin").Preload("Member").Preload("FoodInformation").Preload("MealType").Raw("SELECT * FROM meal_plans").Find(&mealplans).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": mealplans})
}

// DELETE => MealPlan By ID
func DeleteMealPlan(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM meal_plans WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "mealplans Not Found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{`mealplan was Deleted! ByID`: id})
}

// PATCH => UPDATE mealplan By ID
func UpdateMealPlan(c *gin.Context) {
	var mealplan entity.MealPlan
	var admin entity.Admin
	var member entity.Member
	var mealtype entity.MealType
	var foodinformation entity.FoodInformation

	if err := c.ShouldBindJSON(&mealplan); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find Admin By ID
	if tx := entity.DB().Where("id = ?", mealplan.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// Find Member By ID
	if tx := entity.DB().Where("id = ?", mealplan.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	// Find MealType By ID
	if tx := entity.DB().Where("id = ?", mealplan.MealTypeID).First(&mealtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "mealtype not found"})
		return
	}

	// Find Food By ID
	if tx := entity.DB().Where("id = ?", mealplan.FoodInformationID).First(&foodinformation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "foodinformation not found"})
		return
	}

	// CREATE mealplan
	mealplanUpdate := entity.MealPlan{
		TimeToEat:       mealplan.TimeToEat,
		Description:     mealplan.Description,
		Admin:           admin,
		Member:          member,
		MealType:        mealtype,
		FoodInformation: foodinformation,
	}

	// Record
	if err := entity.DB().Where("id = ?", mealplan.ID).Updates(&mealplanUpdate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": mealplanUpdate})
}
