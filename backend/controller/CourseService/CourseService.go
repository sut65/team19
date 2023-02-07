package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
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

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(course_service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", course_service.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	// ค้นหา course ด้วย id
	if tx := entity.DB().Where("id = ?", course_service.CourseDetailID).First(&course_detail); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course not found"})
		return
	}

	// ค้นหา trainer ด้วย id
	if tx := entity.DB().Where("id = ?", course_service.TrainerID).First(&trainer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trainer not found"})
		return
	}

	// สร้าง CourseService
	cs := entity.CourseService{
		CRegisterDate: course_service.CRegisterDate, // ตั้งค่าฟิลด์ CRegisterDate
		Agreement:     course_service.Agreement,     // ตั้งค่าฟิลด์ Agreement
		Status:        course_service.Status,        // ตั้งค่าฟิลด์ Status
		RefundMessage: course_service.RefundMessage, // ตั้งค่าฟิลด์ RefundMessage
		Member:        member,                       // โยงความสัมพันธ์กับ Entity Member
		CourseDetail:  course_detail,                // โยงความสัมพันธ์กับ Entity Course Detail
		Trainer:       trainer,                      // โยงความสัมพันธ์กับ Entity Trainer
	}

	// บันทึก
	if err := entity.DB().Create(&cs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": cs})
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

// GET /course_service_by_uid_and_status/:uid
func GetCourseServiceByUidAndStatus(c *gin.Context) {
	var course_service entity.CourseService
	uid := c.Param("uid")
	if tx := entity.DB().Preload(clause.Associations).Preload("Payment."+clause.Associations).Preload("Member").Preload("CourseDetail").Preload("Trainer").Where("status = 'Active' AND member_id = ?", uid).Last(&course_service); tx.RowsAffected == 0 {
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
	var member entity.Member
	var course_detail entity.CourseDetail
	var trainer entity.Trainer

	if err := c.ShouldBindJSON(&course_service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", course_service.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	// ค้นหา course ด้วย id
	if tx := entity.DB().Where("id = ?", course_service.CourseDetailID).Find(&course_detail); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course not found"})
		return
	}

	// ค้นหา trainer ด้วย id
	if tx := entity.DB().Where("id = ?", course_service.TrainerID).First(&trainer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trainer not found"})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(course_service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	cs := entity.CourseService{
		CRegisterDate: course_service.CRegisterDate, // ตั้งค่าฟิลด์ CRegisterDate
		Agreement:     course_service.Agreement,     // ตั้งค่าฟิลด์ Agreement
		Status:        course_service.Status,        // ตั้งค่าฟิลด์ Status
		RefundMessage: course_service.RefundMessage, // ตั้งค่าฟิลด์ RefundMessage
		Member:        member,                       // โยงความสัมพันธ์กับ Entity Member
		CourseDetail:  course_detail,                // โยงความสัมพันธ์กับ Entity Course Detail
		Trainer:       trainer,                      // โยงความสัมพันธ์กับ Entity Trainer
	}

	if err := entity.DB().Where("id = ?", course_service.ID).Updates(&cs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": course_service})
}
