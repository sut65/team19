package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// GET /taste/:id
func GetTatse(c *gin.Context) {
	var taste entity.Taste
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM tastes WHERE id = ?", id).Scan(&taste).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": taste})
}

// GET /taste
func ListTatse(c *gin.Context) {
	var taste []entity.Taste

	if err := entity.DB().Raw("SELECT * FROM tastes").Scan(&taste).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": taste})
}
