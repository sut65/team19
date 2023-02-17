package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	//"gorm.io/gorm/clause"
)

// POSH /Advice
func CreateAdvice(c *gin.Context) {
	var advice entity.Advice
	var trainer entity.Trainer
	var member entity.Member
	var courseService entity.CourseService
	var body entity.Body
	var dailyRoutine entity.DailyRoutine

	if err := c.ShouldBindJSON(&advice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา trainer ด้วย id
	if tx := entity.DB().Where("id = ?", advice.TrainerID).First(&trainer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trainer not found"})
		return
	}

	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", advice.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	// ค้นหา courseService ด้วย id
	if tx := entity.DB().Where("id = ?", advice.CourseServiceID).First(&courseService); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "courseService not found"})
		return
	}

	// ค้นหา body ด้วย id
	if tx := entity.DB().Where("id = ?", advice.BodyID).First(&body); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "body not found"})
		return
	}

	// ค้นหา dailyRoutine ด้วย id
	if tx := entity.DB().Where("id = ?", advice.DailyRoutineID).First(&dailyRoutine); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "daily routine not found"})
		return
	}

	// สร้าง Advice
	adv := entity.Advice{
		Advice:        advice.Advice,
		RecordingDate: advice.RecordingDate,
		Trainer: trainer,
		Member: member,
		CourseService: courseService,
		Body:          body,
		DailyRoutine:  dailyRoutine,
	}

	// บันทึก
	if err := entity.DB().Create(&adv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": adv})
}

// GET /Advice/:id
func GetAdvice(c *gin.Context) {
	var advice entity.Advice
	id := c.Param("id")
	if tx := entity.DB().Preload("CourseService").Preload("CourseService.Member.Gender").Preload("CourseService.CourseDetail.CourseType").Preload("Body").Preload("DailyRoutine").Preload("Trainer").Preload("Member").Where("id = ?", id).First(&advice); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "advice not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": advice})
}

// GET /Advices
func ListAdvice(c *gin.Context) {
	var advices []entity.Advice
	if err := entity.DB().Preload("CourseService").Preload("CourseService.Member.Gender").Preload("CourseService.CourseDetail.CourseType").Preload("Body").Preload("DailyRoutine").Preload("Trainer").Preload("Member").Raw("SELECT * FROM advices").Find(&advices).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": advices})
}

// GET /advices-by-course/:id
func GetAdviceByCourseService(c *gin.Context) {
	var advices []entity.Advice
	id := c.Param("id")
	if err := entity.DB().Preload("CourseService").Preload("CourseService.Member.Gender").Preload("CourseService.CourseDetail.CourseType").Preload("Body").Preload("DailyRoutine").Preload("Trainer").Preload("Member").Raw("SELECT * FROM advices WHERE course_service_id = ?", id).Find(&advices).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": advices})
}

// DELETE /Advices/:id
func DeleteAdvice(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM advices WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "advices not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Advice
func UpdateAdvice(c *gin.Context) {
	var advice entity.Advice
	var trainer entity.Trainer
	var member entity.Member
	var courseService entity.CourseService
	var body entity.Body
	var dailyRoutine entity.DailyRoutine

	if err := c.ShouldBindJSON(&advice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา trainer ด้วย id
	if tx := entity.DB().Where("id = ?", advice.TrainerID).First(&trainer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trainer not found"})
		return
	}

	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", advice.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}


	// ค้นหา courseService ด้วย id
	if tx := entity.DB().Where("id = ?", advice.CourseServiceID).First(&courseService); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "courseService not found"})
		return
	}

	// ค้นหา body ด้วย id
	if tx := entity.DB().Where("id = ?", advice.BodyID).First(&body); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "body not found"})
		return
	}

	// ค้นหา DailyRoutine ด้วย id
	if tx := entity.DB().Where("id = ?", advice.DailyRoutineID).First(&dailyRoutine); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dailyRoutine not found"})
		return
	}

	update := entity.Advice{
		Advice:        advice.Advice,
		RecordingDate: advice.RecordingDate,
		Trainer: trainer,
		Member: member,
		CourseService: courseService,
		Body:          body,
		DailyRoutine:  dailyRoutine,
	}

	if err := entity.DB().Where("id = ?", advice.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": advice})
}
