package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// GET /mainIngredient/:id
func GetMainIngredient(c *gin.Context) {
	var mainingredient entity.MainIngredient
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM main_ingredient WHERE id = ?", id).Scan(&mainingredient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": mainingredient})
}

// GET /mainingredients
func ListMainIngredients(c *gin.Context) {
	var mainingredient []entity.MainIngredient

	if err := entity.DB().Raw("SELECT * FROM main_ingredients").Scan(&mainingredient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": mainingredient})
}
