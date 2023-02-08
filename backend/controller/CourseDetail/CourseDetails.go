package controller

import (
	"net/http"
	//"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// POST /course_detail
func CreateCourseDetail(c *gin.Context) {
	var course_detail entity.CourseDetail
	var price entity.Price
	var admin entity.Admin
	var course_type entity.CourseType

	if err := c.ShouldBindJSON(&course_detail); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	// if _, err := govalidator.ValidateStruct(course_detail); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", course_detail.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// ค้นหา price ด้วย id
	if tx := entity.DB().Where("id = ?", course_detail.PriceID).First(&price); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "price not found"})
		return
	}

	// ค้นหา course_type ด้วย id
	if tx := entity.DB().Where("id = ?", course_detail.CourseTypeID).First(&course_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course_type not found"})
		return
	}

	// สร้าง CourseDetail
	cd := entity.CourseDetail{
		CourseName:  course_detail.CourseName,
		CoverPage:   course_detail.CoverPage,
		Description: course_detail.Description,
		Goal:   	 course_detail.Goal,
		CourseType:  course_type,
		Admin:       admin,
		Price:       price,
	}

	// บันทึก
	if err := entity.DB().Create(&cd).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": cd})
}

// GET /course_detail/:id
func GetCourseDetail(c *gin.Context) {
	var course_detail entity.CourseDetail
	id := c.Param("id")
	if tx := entity.DB().Preload("Price").Preload("CourseType").Preload("Admin").Where("id = ?", id).First(&course_detail); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course_detail not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": course_detail})
}

// GET /course_details
func ListCourseDetails(c *gin.Context) {
	var course_details []entity.CourseDetail

	if err := entity.DB().Preload("Price").Preload("CourseType").Preload("Admin").Raw("SELECT * FROM course_details").Find(&course_details).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": course_details})
}

// DELETE /course_detail/:id
func DeleteCourseDetail(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM course_details WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course_detail not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /course_detail
func UpdateCourseDetail(c *gin.Context) {
	var course_detail entity.CourseDetail
	var course_type entity.CourseType
	var price entity.Price
	var admin entity.Admin

	if err := c.ShouldBindJSON(&course_detail); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", course_detail.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// ค้นหา course_type ด้วย id
	if tx := entity.DB().Where("id = ?", course_detail.CourseTypeID).First(&course_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course_type not found"})
		return
	}

	// ค้นหา price ด้วย id
	if tx := entity.DB().Where("id = ?", course_detail.PriceID).First(&price); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "price not found"})
		return
	}

	update := entity.CourseDetail{
		CourseName:  course_detail.CourseName,
		CoverPage:   course_detail.CoverPage,
		Description: course_detail.Description,
		Goal:        course_detail.Goal,
		CourseType:  course_type,
		Admin:       admin,
		Price:       price,
	}

	if err := entity.DB().Where("id = ?", course_detail.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": course_detail})
}
