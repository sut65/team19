package controller

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// POST MealPlans
func CreateMealPlans(c *gin.Context) {
	var MealPlans entity.MealPlans
	var admin entity.Admin
	var member entity.Member
	var avoidFood entity.AvoidFood
	var nutritious entity.Nutritious
	var mealsOfDay entity.MealsOfDay

	if err := c.ShouldBindJSON(&MealPlans); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", MealPlans.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", MealPlans.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// ค้นหา avoidFood ด้วย id
	if tx := entity.DB().Where("id = ?", MealPlans.AvoidFoodID).First(&avoidFood); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "avoidFood not found"})
		return
	}

	// ค้นหา nutritious ด้วย id
	if tx := entity.DB().Where("id = ?", MealPlans.NutritiousID).First(&nutritious); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nutritious not found"})
		return
	}

	// ค้นหา mealsOfDay ด้วย id
	if tx := entity.DB().Where("id = ?", MealPlans.MealsOfDayID).First(&mealsOfDay); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "mealsOfDay not found"})
		return
	}

	// CREATE MealPlans
	MealPlanss := entity.MealPlans{
		Date:        time.Date(2023, time.January, 6, 20, 10, 00, 0, time.UTC),
		Description: "พักผ่อนให้เพียงพอ",
		Admin:       MealPlans.Admin,
		Member:      MealPlans.Member,
		AvoidFood:   MealPlans.AvoidFood,
		MealsOfDay:  MealPlans.MealsOfDay,
		Nutritious:  MealPlans.Nutritious,
	}

	// บันทึก
	if err := entity.DB().Create(&MealPlanss).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": MealPlanss})
}

// GET => MealPlans By ID
func GetMealPlans(c *gin.Context) {
	var MealPlans entity.MealPlans
	id := c.Param("id")

	if tx := entity.DB().Preload("Admin").Preload("Member").Preload("Nutritious").Preload("AvoidFood").Preload("MealsOfDay").Where("id = ?", id).First(&MealPlans); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": " MealPlans Not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": MealPlans})
}

// GET => LIST MealPlanss
func ListMealPlans(c *gin.Context) {
	var MealPlanss entity.MealPlans
	if err := entity.DB().Preload("Admin").Preload("Member").Preload("Nutritious").Preload("AvoidFood").Preload("MealsOfDay").Raw("SELECT * FROM meal_plans").Find(&MealPlanss).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": " MealPlanss Not Found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": MealPlanss})
}

// DELETE => MealPlans By ID
func DeleteMealPlans(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM meal_plans WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "MealPlanss Not Found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{`MealPlans was Deleted! ByID`: id})
}

// PATCH => UPDATE MealPlans By ID
func UpdateMealPlans(c *gin.Context) {
	var MealPlans entity.MealPlans
	var admin entity.Admin
	var member entity.Member
	var avoidFood entity.AvoidFood
	var nutritious entity.Nutritious
	var mealsOfDay entity.MealsOfDay

	if err := c.ShouldBindJSON(&MealPlans); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", MealPlans.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", MealPlans.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// ค้นหา avoidFood ด้วย id
	if tx := entity.DB().Where("id = ?", MealPlans.AvoidFoodID).First(&avoidFood); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "avoidFood not found"})
		return
	}

	// ค้นหา nutritious ด้วย id
	if tx := entity.DB().Where("id = ?", MealPlans.NutritiousID).First(&nutritious); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nutritious not found"})
		return
	}

	// ค้นหา mealsOfDay ด้วย id
	if tx := entity.DB().Where("id = ?", MealPlans.MealsOfDayID).First(&mealsOfDay); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "mealsOfDay not found"})
		return
	}

	// UPDATE MealPlans
	MealPlansUpdate := entity.MealPlans{
		Date:        MealPlans.Date,
		Description: MealPlans.Description,
		Admin:       admin,
		Member:      member,
		AvoidFood:   avoidFood,
		MealsOfDay:  mealsOfDay,
		Nutritious:  nutritious,
	}

	// บันทึก
	if err := entity.DB().Where("id = ?", MealPlans.ID).Updates(&MealPlansUpdate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": MealPlansUpdate})
}
