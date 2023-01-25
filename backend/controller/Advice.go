package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// POSH /Advice
func CreateAdvice(c *gin.Context) {
	var advice entity.Advice
	var trainer entity.Trainer
	var member entity.Member
	var body entity.Body
	var dailyActivitie entity.DailyActivitie

	if err := c.ShouldBindJSON(&advice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา trainer ด้วย id
	if tx := entity.DB().Where("id = ?", advice.TrainerID).First(&trainer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "trainer not found"})
		return
	}

	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", advice.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	// ค้นหา body ด้วย id
	if tx := entity.DB().Where("id = ?", advice.BodyID).First(&body); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "body not found"})
		return
	}

	// ค้นหา dailyActivitie ด้วย id
	if tx := entity.DB().Where("id = ?", advice.DailyActivitieID).First(&dailyActivitie); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "daily activitie not found"})
		return
	}

	// สร้าง Advice
	adv := entity.Advice{
		Advice:         advice.Advice,
		RecordingDate:  advice.RecordingDate,
		Trainer:        trainer,
		Member:         member,
		Body:           body,
		DailyActivitie: dailyActivitie,
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
	if tx := entity.DB().Preload("Trainer").Preload("Member").Preload("Body").Preload("DailyActivitie").Where("id = ?", id).First(&advice); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "advice not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": advice})
}

// GET /Advices
func ListAdvice(c *gin.Context) {
	var advices []entity.Advice
	if err := entity.DB().Preload("Trainer").Preload("Member").Preload("Body").Preload("DailyActivitie").Raw("SELECT * FROM advices").Find(&advices).Error; err != nil {
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
	if err := c.ShouldBindJSON(&advice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", advice.ID).First(&advice); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "advice not found"})
		return
	}

	if err := entity.DB().Save(&advice).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": advice})
}
