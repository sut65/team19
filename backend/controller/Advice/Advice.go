package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	"gorm.io/gorm/clause"
)

// POSH /Advice
func CreateAdvice(c *gin.Context) {
	var advice entity.Advice
	var courseService entity.CourseService
	var body entity.Body
	var dailyRoutine entity.DailyRoutine

	if err := c.ShouldBindJSON(&advice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา courseService ด้วย id
	if tx := entity.DB().Where("id = ?", advice.CourseServiceID).First(&courseService); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "courseService not found"})
		return
	}

	// ค้นหา body ด้วย id
	if tx := entity.DB().Where("id = ?", advice.BodyID).First(&body); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "body not found"})
		return
	}

	// ค้นหา dailyActivitie ด้วย id
	if tx := entity.DB().Where("id = ?", advice.DailyRoutineID).First(&dailyRoutine); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "daily activities not found"})
		return
	}

	// สร้าง Advice
	adv := entity.Advice{
		Advice:        advice.Advice,
		RecordingDate: advice.RecordingDate,
		CourseService: courseService,
		Body:          body,
		DailyRoutine:  dailyRoutine,
	}

	// บันทึก
	if err := entity.DB().Create(&adv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": adv})
}

// GET /Advice/:id
func GetAdvice(c *gin.Context) {
	var advice entity.Advice
	id := c.Param("id")
	if tx := entity.DB().Preload(clause.Associations).Preload("CourseService."+clause.Associations).Where("id = ?", id).First(&advice); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "advice not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": advice})
}

// GET /Advices
func ListAdvice(c *gin.Context) {
	var advices []entity.Advice
	if err := entity.DB().Preload(clause.Associations).Preload("CourseService." + clause.Associations).Raw("SELECT * FROM advices").Find(&advices).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": advices})
}

// DELETE /Advices/:id
func DeleteAdvice(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM advices WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "advices not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Advice
func UpdateAdvice(c *gin.Context) {
	var advice entity.Advice
	var courseService entity.CourseService
	var body entity.Body
	var DailyRoutine entity.DailyRoutine

	if err := c.ShouldBindJSON(&advice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา courseService ด้วย id
	if tx := entity.DB().Where("id = ?", advice.CourseServiceID).First(&courseService); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "courseService not found"})
		return
	}

	// ค้นหา body ด้วย id
	if tx := entity.DB().Where("id = ?", advice.BodyID).First(&body); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "category not found"})
		return
	}

	// ค้นหา DailyRoutine ด้วย id
	if tx := entity.DB().Where("id = ?", advice.DailyRoutineID).First(&DailyRoutine); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "tag not found"})
		return
	}

	update := entity.Advice{
		Advice:        advice.Advice,
		RecordingDate: advice.RecordingDate,
		CourseService: courseService,
		Body:          body,
		DailyRoutine:  DailyRoutine,
	}

	if err := entity.DB().Where("id = ?", advice.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": advice})
}
