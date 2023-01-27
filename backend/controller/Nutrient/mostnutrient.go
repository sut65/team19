package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// GET /mostnutrient/:id
func GetMostNutrient(c *gin.Context) {
	var mostnutrient entity.MostNutrient
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM most_nutrients WHERE id = ?", id).Scan(&mostnutrient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": mostnutrient})
}

// GET /mostnutrients
func ListMostNutrients(c *gin.Context) {
	var mostnutrient []entity.MostNutrient

	if err := entity.DB().Raw("SELECT * FROM most_nutrients").Scan(&mostnutrient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": mostnutrient})
}