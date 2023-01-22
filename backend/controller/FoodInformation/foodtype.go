package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	"gorm.io/gorm/clause"
)

// GET /foodtype/:id
func GetFoodType(c *gin.Context) {
	var food_type entity.FoodType
	id := c.Param("id")

	if tx := entity.DB().Preload(clause.Associations).Preload("Food_Informations."+clause.Associations).Where("id = ?", id).First(&food_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "food_type not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": food_type})
}

// GET /foodtypes
func ListFoodTypes(c *gin.Context) {
	var food_types []entity.FoodType
	if err := entity.DB().Preload(clause.Associations).Preload("Food_Informations." + clause.Associations).Raw("SELECT * FROM food_types").Find(&food_types).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": food_types})
}
