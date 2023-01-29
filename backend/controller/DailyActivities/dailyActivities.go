package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// POST Activity
func CreateActivity(c *gin.Context) {
	var activity entity.DailyActivities
	var user entity.Member
	var admin entity.Admin
	var activity_type entity.ActivitiesType

	if err := c.ShouldBindJSON(&activity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", activity.MemberID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	// ค้นหา Admin ด้วย id
	if tx := entity.DB().Where("id = ?", activity.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		return
	}

	// ค้นหา ActivityType ด้วย id
	if tx := entity.DB().Where("id = ?", activity.ActivitiesTypeID).First(&activity_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ActivityType not found"})
		return
	}

	// สร้าง activity
	create_activities := entity.DailyActivities{
		Name:           activity.Name,
		Duration:       activity.Duration,
		Date:           activity.Date,
		Admin:          admin,
		Member:         user,
		ActivitiesType: activity_type,
	}

	// บันทึก
	if err := entity.DB().Create(&create_activities).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": create_activities})
}

// GET Activities
func ListActivities(c *gin.Context) {
	var activities []entity.DailyActivities
	if err := entity.DB().Preload("Admin").Preload("ActivitiesType").Preload("Member").Raw("SELECT * FROM daily_activities").Find(&activities).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": activities})
}

// GET /Activity By ID
func GetActivity(c *gin.Context) {
	var activity entity.DailyActivities
	id := c.Param("id")

	if tx := entity.DB().Preload("Admin").Preload("ActivitiesType").Preload("Member").Where("id = ?", id).First(&activity); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "activity not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": activity})
}

// DELETE Activity By ID
func DeleteActivity(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM daily_activities WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "activity not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH Update Activity
func UpdateActivity(c *gin.Context) {
	var activity entity.DailyActivities
	var user entity.Member
	var admin entity.Admin
	var activity_type entity.ActivitiesType

	if err := c.ShouldBindJSON(&activity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", activity.MemberID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	// ค้นหา Admin ด้วย id
	if tx := entity.DB().Where("id = ?", activity.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		return
	}

	// ค้นหา ActivityType ด้วย id
	if tx := entity.DB().Where("id = ?", activity.ActivitiesTypeID).First(&activity_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ActivityType not found"})
		return
	}

	// Update Activity
	update_activities := entity.DailyActivities{
		Name:           activity.Name,
		Duration:       activity.Duration,
		Date:           activity.Date,
		Admin:          admin,
		Member:         user,
		ActivitiesType: activity_type,
	}

	if err := entity.DB().Where("id = ?", activity.ID).Updates(&update_activities).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": update_activities})
}
