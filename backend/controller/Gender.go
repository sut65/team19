package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// GET /gender/:id
func GetGender(c *gin.Context) {
	var gender entity.Gender
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM genders WHERE id = ?", id).Scan(&gender).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": gender})
}

// GET /genders
func Listgenders(c *gin.Context) {
	var gender []entity.Gender

	if err := entity.DB().Raw("SELECT * FROM genders").Scan(&gender).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": gender})
}
