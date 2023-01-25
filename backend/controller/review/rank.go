package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	"gorm.io/gorm/clause"
)

// GET /rank/:id
func GetRank(c *gin.Context) {
	var rank entity.Rank
	id := c.Param("id")

	if tx := entity.DB().Preload(clause.Associations).Preload("Reviews."+clause.Associations).Where("id = ?", id).First(&rank); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "rank not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": rank})
}

// GET /ranks
func ListRanks(c *gin.Context) {
	var ranks []entity.Rank
	if err := entity.DB().Preload(clause.Associations).Preload("Reviews." + clause.Associations).Raw("SELECT * FROM ranks").Find(&ranks).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ranks})
}
