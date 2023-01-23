package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	"gorm.io/gorm/clause"
)

// POST /description
func CreateDescription(c *gin.Context) {
	var description entity.Description
	if err := c.ShouldBindJSON(&description); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&description).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": description})
}

// GET /description/:id
func GetDescription(c *gin.Context) {
	var description entity.Description
	id := c.Param("id")
	if tx := entity.DB().Preload(clause.Associations).Preload("CourseDetail." + clause.Associations).Where("id = ?", id).First(&description); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "description not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": description})
}

// GET /descriptions
func ListDescriptions(c *gin.Context) {
	var descriptions []entity.Description
	if err := entity.DB().Preload(clause.Associations).Preload("CourseDetail." + clause.Associations).Raw("SELECT * FROM descriptions").Scan(&descriptions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": descriptions})
}

// DELETE /description/:id
func DeleteDescription(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM descriptions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "descriptions not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /descriptions
func UpdateDescription(c *gin.Context) {
	var descriptions entity.Description
	if err := c.ShouldBindJSON(&descriptions); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", descriptions.ID).First(&descriptions); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "descriptions not found"})
		return
	}

	if err := entity.DB().Save(&descriptions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": descriptions})
}
