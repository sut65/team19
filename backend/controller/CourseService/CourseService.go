package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	"gorm.io/gorm/clause"
)

// POST /course_service
func CreateCourseService(c *gin.Context) {

	var course_service entity.CourseService
	var member entity.Member
	var course_detail entity.CourseDetail
	var trainer entity.Trainer

	if err := c.ShouldBindJSON(&course_service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", course_service.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	// ค้นหา course ด้วย id
	if tx := entity.DB().Preload("Price").Preload("Description").Preload("Admin").Where("id = ?", course_service.CourseDetailID).Find(&course_detail); tx.RowsAffected == 0 {
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
		Status:        course_service.Status,        // ตั้งค่าฟิลด์ Status
		Member:        member,                       // โยงความสัมพันธ์กับ Entity User
		CourseDetail:  course_detail,                // โยงความสัมพันธ์กับ Entity Course Details
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
	if tx := entity.DB().Preload(clause.Associations).Preload("Payment."+clause.Associations).Preload("Member").Preload("CourseDetail").Preload("Trainer").Where("id = ?", id).First(&course_service); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course_service not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": course_service})
}

// GET /course_service_by_uid/:uid
func GetCourseServiceByUID(c *gin.Context) {
	var course_service entity.CourseService
	uid := c.Param("uid")
	if tx := entity.DB().Preload(clause.Associations).Preload("Payment."+clause.Associations).Preload("Member").Preload("CourseDetail").Preload("Trainer").Where("member_id = ?", uid).Last(&course_service); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course_service not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": course_service})
}

// GET /course_services
func ListCourseServices(c *gin.Context) {
	var course_services []entity.CourseService
	if err := entity.DB().Preload(clause.Associations).Preload("Payment." + clause.Associations).Preload("Member").Preload("CourseDetail").Preload("Trainer").Raw("SELECT * FROM course_services").Find(&course_services).Error; err != nil {
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
	var newCourse_Service entity.CourseService
	if err := c.ShouldBindJSON(&course_service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newCourse_Service.CRegisterDate = course_service.CRegisterDate // ตั้งค่าฟิลด์ CRegisterDate
	newCourse_Service.Agreement = course_service.Agreement         // ตั้งค่าฟิลด์ Agreement
	newCourse_Service.Status = course_service.Status               // ตั้งค่าฟิลด์ Status
	newCourse_Service.Member = course_service.Member               // โยงความสัมพันธ์กับ Entity User
	newCourse_Service.CourseDetail = course_service.CourseDetail   // โยงความสัมพันธ์กับ Entity Course Details
	newCourse_Service.Trainer = course_service.Trainer             // โยงความสัมพันธ์กับ Entity Trainer

	if err := entity.DB().Save(&course_service).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": course_service})
}
