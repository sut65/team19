package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// GET /taste/:id
func GetExercise(c *gin.Context) {
	var exercise entity.Exercise
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM exercises WHERE id = ?", id).Scan(&exercise).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": exercise})
}

// GET /taste
func ListExercise(c *gin.Context) {
	var exercise []entity.Exercise

	if err := entity.DB().Raw("SELECT * FROM exercises").Scan(&exercise).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": exercise})
}
