package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"

	"gorm.io/gorm/clause"
)

// GET => AvoidFood By ID
func GetAvoidFood(c *gin.Context) {
	var avoidFood entity.AvoidFood
	id := c.Param("id")

	if tx := entity.DB().Preload(clause.Associations).Preload("MealPlans."+clause.Associations).Where("id = ?", id).First(&avoidFood); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "AvoidFood not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": avoidFood})
}

// GET => LIST Avoid Food
func ListAvoidFoods(c *gin.Context) {
	var avoidFoods []entity.AvoidFood
	if err := entity.DB().Preload(clause.Associations).Preload("MealPlans." + clause.Associations).Raw("SELECT * FROM avoid_foods").Find(&avoidFoods).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": avoidFoods})
}
