package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"

	"gorm.io/gorm/clause"
)

// GET => Nutritious By ID
func GetNutritious(c *gin.Context) {
	var nutritious entity.Nutritious
	id := c.Param("id")

	if tx := entity.DB().Preload(clause.Associations).Preload("MealPlans."+clause.Associations).Where("id = ?", id).First(&nutritious); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Nutritious not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": nutritious})
}

// GET => LIST Nutritious
func ListNutritious(c *gin.Context) {
	var nutritious []entity.Nutritious
	if err := entity.DB().Preload(clause.Associations).Preload("MealPlans." + clause.Associations).Raw("SELECT * FROM nutritious").Find(&nutritious).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": nutritious})
}
