package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// GET /price/:id
func GetPrice(c *gin.Context) {
	var price entity.Price
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM prices WHERE id = ?", id).Scan(&price).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": price})
}

// GET /prices
func ListPrices(c *gin.Context) {
	var prices []entity.Price
	if err := entity.DB().Raw("SELECT * FROM prices").Scan(&prices).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": prices})
}
