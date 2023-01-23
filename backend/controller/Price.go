package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	"gorm.io/gorm/clause"
)

// POST /price
func CreatePrice(c *gin.Context) {
	var price entity.Price
	if err := c.ShouldBindJSON(&price); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&price).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": price})
}

// GET /price/:id
func GetPrice(c *gin.Context) {
	var price entity.Price
	id := c.Param("id")
	if tx := entity.DB().Preload(clause.Associations).Preload("CourseDetail." + clause.Associations).Where("id = ?", id).First(&price); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "price not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": price})
}

// GET /prices
func ListPrices(c *gin.Context) {
	var prices []entity.Price
	if err := entity.DB().Preload(clause.Associations).Preload("CourseDetail." + clause.Associations).Raw("SELECT * FROM prices").Scan(&prices).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": prices})
}

// DELETE /price/:id
func DeletePrice(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM prices WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prices not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /prices
func UpdatePrice(c *gin.Context) {
	var prices entity.Price
	if err := c.ShouldBindJSON(&prices); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", prices.ID).First(&prices); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prices not found"})
		return
	}

	if err := entity.DB().Save(&prices).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": prices})
}
