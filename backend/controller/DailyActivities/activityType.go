package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	"gorm.io/gorm/clause"
)

// GET ActivitiesTypes By ID
func GetActivitiesTypes(c *gin.Context) {
	var activitiesTypes entity.ActivitiesType
	id := c.Param("id")

	if tx := entity.DB().Preload(clause.Associations).Preload("DailyActivities."+clause.Associations).Where("id = ?", id).First(&activitiesTypes); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Activities Type not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": activitiesTypes})
}

// List Activities
func ListActivitiesTypes(c *gin.Context) {
	var activities_types []entity.ActivitiesType
	if err := entity.DB().Preload(clause.Associations).Preload("DailyActivities." + clause.Associations).Raw("SELECT * FROM activities_types").Find(&activities_types).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": activities_types})
}
