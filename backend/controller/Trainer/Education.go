package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// GET /education/:id
func GetEducation(c *gin.Context) {
	var education entity.Education
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM educations WHERE id = ?", id).Scan(&education).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": education})
}

// GET/educations
func ListEducation(c *gin.Context) {
	var education []entity.Education
	if err := entity.DB().Raw("SELECT * FROM educations").Scan(&education).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": education})
}
