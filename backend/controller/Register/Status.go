package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// GET /status/:id
func GetStatus(c *gin.Context) {
	var status entity.Religion
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM statuses WHERE id = ?", id).Scan(&status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": status})
}

// GET /religions
func ListStatus(c *gin.Context) {
	var status []entity.Religion

	if err := entity.DB().Raw("SELECT * FROM statuses").Scan(&status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": status})
}
