package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// GET /description/:id
func GetDescription(c *gin.Context) {
	var description entity.Description
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM descriptions WHERE id = ?", id).Scan(&description).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": description})
}

// GET /description
func ListDescriptions(c *gin.Context) {
	var descriptions []entity.Description
	if err := entity.DB().Raw("SELECT * FROM descriptions").Scan(&descriptions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": descriptions})
}