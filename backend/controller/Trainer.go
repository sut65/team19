package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// POST /trainer
func CreateTrainer(c *gin.Context) {
	var trainer entity.Trainer
	if err := c.ShouldBindJSON(&trainer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&trainer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": trainer})
}

// GET /trainer/:id
func GetTrainer(c *gin.Context) {
	var trainer entity.Trainer
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&trainer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "trainer not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": trainer})
}

// GET /trainers
func ListTrainer(c *gin.Context) {
	var trainers []entity.Trainer
	if err := entity.DB().Raw("SELECT * FROM trainers").Scan(&trainers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": trainers})
}

// DELETE /trainer/:id
func DeleteTrainer(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM trainers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "trainer not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /trainer
func UpdateTrainer(c *gin.Context) {
	var trainer entity.Trainer
	if err := c.ShouldBindJSON(&trainer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", trainer.ID).First(&trainer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "trainer not found"})
		return
	}

	if err := entity.DB().Save(&trainer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": trainer})
}
