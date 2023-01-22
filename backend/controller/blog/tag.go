package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	"gorm.io/gorm/clause"
)

// GET /tag/:id
func GetTag(c *gin.Context) {
	var tag entity.Tag
	id := c.Param("id")

	if tx := entity.DB().Preload(clause.Associations).Preload("Blogs."+clause.Associations).Where("id = ?", id).First(&tag); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "tag not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": tag})
}

// GET /tags
func ListTags(c *gin.Context) {
	var tags []entity.Tag
	if err := entity.DB().Preload(clause.Associations).Preload("Blogs." + clause.Associations).Raw("SELECT * FROM tags").Find(&tags).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": tags})
}
