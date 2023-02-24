package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// GET MealType By ID
func GetMealType(c *gin.Context) {
	var mealType entity.MealType
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM meal_types WHERE id = ?", id).Scan(&mealType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": mealType})
}

// GET MealTypes
func GetMealTypes(c *gin.Context) {
	var mealTypes []entity.MealType

	if err := entity.DB().Raw("SELECT * FROM meal_types").Scan(&mealTypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": mealTypes})
}
