package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	"gorm.io/gorm/clause"
)

// GET /price/:id
func GetPrice(c *gin.Context) {
	var price entity.Price
	id := c.Param("id")

	if tx := entity.DB().Preload(clause.Associations).Preload("CourseDetail."+clause.Associations).Where("id = ?", id).First(&price); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "price not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": price})
}

// GET /prices
func ListPrices(c *gin.Context) {
	var prices []entity.Price
	if err := entity.DB().Preload(clause.Associations).Preload("CourseDetail." + clause.Associations).Raw("SELECT * FROM prices").Find(&prices).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": prices})
}
