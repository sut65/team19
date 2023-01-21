package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// POST /course_service
func CreateCourseService(c *gin.Context) {

	var course_service entity.CourseService
	var user entity.User
	var course entity.Course
	var trainer entity.Trainer

	if err := c.ShouldBindJSON(&course_service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", course_service.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// ค้นหา course ด้วย id
	if tx := entity.DB().Where("id = ?", course_service.CourseID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	// ค้นหา trainer ด้วย id
	if tx := entity.DB().Where("id = ?", course_service.TrainerID).First(&trainer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "trainer not found"})
		return
	}

	// สร้าง CourseService
	pb := entity.CourseService{
		CRegisterDate: course_service.CRegisterDate, // ตั้งค่าฟิลด์ CRegisterDate
		Agreement:     course_service.Agreement,     // ตั้งค่าฟิลด์ Agreement
		User:          user,                         // โยงความสัมพันธ์กับ Entity User
		Course:        course,                       // โยงความสัมพันธ์กับ Entity Course
		Trainer:       trainer,                      // โยงความสัมพันธ์กับ Entity Trainer
	}

	// บันทึก
	if err := entity.DB().Create(&pb).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": pb})
}

// GET /course_service/:id
func GetCourseService(c *gin.Context) {
	var course_service entity.CourseService
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&course_service); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course_service not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": course_service})
}

// GET /course_services
func ListCourseServices(c *gin.Context) {
	var course_services []entity.CourseService
	if err := entity.DB().Raw("SELECT * FROM course_services").Find(&course_services).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": course_services})
}

// DELETE /course_service/:id
func DeleteCourseService(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM course_services WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course_services not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /course_service
func UpdateCourseService(c *gin.Context) {
	var course_service entity.CourseService
	if err := c.ShouldBindJSON(&course_service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", course_service.ID).First(&course_service); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course_service not found"})
		return
	}

	if err := entity.DB().Save(&course_service).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": course_service})
}
