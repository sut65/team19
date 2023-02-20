package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// POST/Body
func CreateBody(c *gin.Context) {

	var body entity.Body
	var trainer entity.Trainer
	var member entity.Member
	var courseDetail entity.CourseDetail

	// ShouldBindJSON => เป็นการ bind request body ในรูป JSON กับ Struct(่JSON -> Struct)
	//First -> เป็นการ select ข้อมูล โดยทำการบันทึกตัวแรกที่ตรงกับเงื่อนไขที่กำหนด เรียงลำดับตามคีย์หลัก
	// Find -> ค้นหาและบันทึกตัวที่ตรงกับเงื่อนไขที่กำหนด(ทั้งหมดที่ตรงกับเงื่อนไข)  == Scan ก็ทำงานคล้ายกับ Find

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error not access": err.Error()})
		return
	}
	// First => คือการ select :> "SELECT * FROM users ORDER BY id LIMIT 1;"
	// RowsAffected => มีการรีเทิร์นค่าที่มีการเปลี่ยนแปลงในเป็นจำนสน row  :  "returns found records count, equals `len(trainer)`"

	// validation

	if _, err := govalidator.ValidateStruct(body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", body.TrainerID).First(&trainer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select trainer"})
		return
	}

	if tx := entity.DB().Where("id = ?", body.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", body.CourseDetailID).First(&courseDetail); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select courseDetail"})
		return
	}

	rm := entity.Body{
		Height:      body.Height,
		Weight:      body.Weight,
		Hip:         body.Hip,
		UpperArm:    body.UpperArm,
		Thigh:       body.Thigh,
		NarrowWaist: body.NarrowWaist,
		NavelWaist:  body.NavelWaist,
		Bmi:         body.Bmi,
		Note:        body.Note,

		Trainer:      trainer,
		Member:       member,
		CourseDetail: courseDetail,
	}

	if err := entity.DB().Create(&rm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rm})
}

// Get body by id  -->ดึงข้อมูลเจ้าหน้าที่ที่กำลังใช้งาน หรือ ผู้ที่ทำการเพิ่มพนักงาน
// GET /body/:id
func GetBody(c *gin.Context) {
	var body entity.Body
	id := c.Param("id")

	if err := entity.DB().Preload("Trainer").Preload("Member").Preload("CourseDetail").Raw("SELECT * FROM bodies WHERE id = ?", id).Find(&body).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": body})
}

func GetBodyByIDMember(c *gin.Context) {
	var body []entity.Body
	id := c.Param("id")

	if err := entity.DB().Preload("Trainer").Preload("Member").Preload("CourseDetail").Raw("SELECT * FROM bodies WHERE member_id = ?", id).Find(&body).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": body})
}

// GET /bodies
func ListBodies(c *gin.Context) {
	var body []entity.Body

	if err := entity.DB().Preload("Trainer").Preload("Member").Preload("CourseDetail").Raw("SELECT * FROM bodies").Find(&body).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": body})
}

// DELETE /trainer/:id
func DeleteBody(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM bodies WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "body not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /body
func UpdateBody(c *gin.Context) {
	var body entity.Body
	var trainer entity.Trainer
	var member entity.Member
	var courseDetail entity.CourseDetail

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error not access": err.Error()})
		return
	}

	// validation

	if _, err := govalidator.ValidateStruct(body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", body.TrainerID).First(&trainer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "trainer not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", body.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", body.CourseDetailID).First(&courseDetail); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "courseDetail not found"})
		return
	}

	update := entity.Body{
		Height:      body.Height,
		Weight:      body.Weight,
		Hip:         body.Hip,
		UpperArm:    body.UpperArm,
		Thigh:       body.Thigh,
		NarrowWaist: body.NarrowWaist,
		NavelWaist:  body.NavelWaist,
		Bmi:         body.Bmi,
		Note:        body.Note,

		Trainer:      trainer,
		Member:       member,
		CourseDetail: courseDetail,
	}

	if err := entity.DB().Where("id = ?", body.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": update})
}
