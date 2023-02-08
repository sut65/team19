package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// GET /course_type/:id
func GetCourseType(c *gin.Context) {
	var course_type entity.CourseType
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM course_types WHERE id = ?", id).Scan(&course_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": course_type})
}

// GET /course_types
func ListCourseTypes(c *gin.Context) {
	var course_types []entity.CourseType
	if err := entity.DB().Raw("SELECT * FROM course_types").Scan(&course_types).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": course_types})
}