package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	"gorm.io/gorm/clause"
)

// GET /mainIngredient/:id
func GetMainIngredient(c *gin.Context) {
	var main_ingredient entity.MainIngredient
	id := c.Param("id")

	if tx := entity.DB().Preload(clause.Associations).Preload("Food_Informations."+clause.Associations).Where("id = ?", id).First(&main_ingredient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "main_ingredient not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": main_ingredient})
}

// GET /mainingredients
func ListMainIngredients(c *gin.Context) {
	var main_ingredients []entity.MainIngredient
	if err := entity.DB().Preload(clause.Associations).Preload("Food_Informations." + clause.Associations).Raw("SELECT * FROM main_ingredients").Find(&main_ingredients).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": main_ingredients})
}
