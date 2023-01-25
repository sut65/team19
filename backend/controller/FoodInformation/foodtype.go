package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// GET /foodtype/:id
func GetFoodType(c *gin.Context) {
	var foodtype entity.FoodType
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM food_types WHERE id = ?", id).Scan(&foodtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": foodtype})
}

// GET /foodtypes
func ListFoodTypes(c *gin.Context) {
	var foodtype []entity.FoodType

	if err := entity.DB().Raw("SELECT * FROM food_types").Scan(&foodtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": foodtype})
}
