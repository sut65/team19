package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	"gorm.io/gorm/clause"
)

// GET /description/:id
func GetDescription(c *gin.Context) {
	var description entity.Description
	id := c.Param("id")

	if tx := entity.DB().Preload(clause.Associations).Preload("CourseDetail."+clause.Associations).Where("id = ?", id).First(&description); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "description not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": description})
}

// GET /description
func ListDescriptions(c *gin.Context) {
	var descriptions []entity.Description
	if err := entity.DB().Preload(clause.Associations).Preload("CourseDetail." + clause.Associations).Raw("SELECT * FROM descriptions").Find(&descriptions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": descriptions})
}