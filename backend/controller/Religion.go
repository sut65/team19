package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// GET /religion/:id
func GetReligion(c *gin.Context) {
	var religion entity.Religion
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM religions WHERE id = ?", id).Scan(&religion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": religion})
}

// GET /religions
func ListReligion(c *gin.Context) {
	var religion []entity.Religion

	if err := entity.DB().Raw("SELECT * FROM religions").Scan(&religion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": religion})
}
