package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	"gorm.io/gorm/clause"
)

// POST /duration
func CreateDuration(c *gin.Context) {
	var duration entity.Duration
	if err := c.ShouldBindJSON(&duration); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&duration).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": duration})
}

// GET /duration/:id
func GetDuration(c *gin.Context) {
	var duration entity.Duration
	id := c.Param("id")
	if tx := entity.DB().Preload(clause.Associations).Preload("Payment." + clause.Associations).Where("id = ?", id).First(&duration); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "duration not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": duration})
}

// GET /durations
func ListDurations(c *gin.Context) {
	var durations []entity.Duration
	if err := entity.DB().Preload(clause.Associations).Preload("Payment." + clause.Associations).Raw("SELECT * FROM durations").Find(&durations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": durations})
}

// DELETE /duration/:id
func DeleteDuration(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM durations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "durations not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /duration
func UpdateDuration(c *gin.Context) {
	var duration entity.Duration
	if err := c.ShouldBindJSON(&duration); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", duration.ID).First(&duration); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "duration not found"})
		return
	}

	if err := entity.DB().Save(&duration).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": duration})
}
