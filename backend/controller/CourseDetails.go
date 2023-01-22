package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// POST /course_detail
func CreateCourseDetail(c *gin.Context) {
	var course_detail entity.CourseDetail
	if err := c.ShouldBindJSON(&course_detail); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&course_detail).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": course_detail})
}

// GET /course_detail/:id
func GetCourseDetail(c *gin.Context) {
	var course_detail entity.CourseDetail
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&course_detail); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course_detail not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": course_detail})
}

// GET /course_details
func ListCourseDetails(c *gin.Context) {
	var course_details []entity.CourseDetail
	if err := entity.DB().Raw("SELECT * FROM course_details").Scan(&course_details).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": course_details})
}

// DELETE /course_details/:id
func DeleteCourseDetail(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM course_details WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course_details not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /course_detail
func UpdateCourseDetail(c *gin.Context) {
	var course_detail entity.CourseDetail
	if err := c.ShouldBindJSON(&course_detail); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", course_detail.ID).First(&course_detail); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course_detail not found"})
		return
	}

	if err := entity.DB().Save(&course_detail).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": course_detail})
}
