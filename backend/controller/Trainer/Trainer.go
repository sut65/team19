package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	"golang.org/x/crypto/bcrypt"
)

// POST/CreateTrainder
func CreateTrainder(c *gin.Context) {
	var form entity.FormOfWork
	var status entity.Status
	var religion entity.Religion
	var education entity.Education
	var trainer entity.Trainer

	// ShouldBindJSON => เป็นการ bind request body ในรูป JSON กับ Struct(่JSON -> Struct)
	//First -> เป็นการ select ข้อมูล โดยทำการบันทึกตัวแรกที่ตรงกับเงื่อนไขที่กำหนด เรียงลำดับตามคีย์หลัก
	// Find -> ค้นหาและบันทึกตัวที่ตรงกับเงื่อนไขที่กำหนด(ทั้งหมดที่ตรงกับเงื่อนไข)  == Scan ก็ทำงานคล้ายกับ Find

	if err := c.ShouldBindJSON(&trainer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error not access": err.Error()})
		return
	}
	// First => คือการ select :> "SELECT * FROM users ORDER BY id LIMIT 1;"
	// RowsAffected => มีการรีเทิร์นค่าที่มีการเปลี่ยนแปลงในเป็นจำนสน row  :  "returns found records count, equals `len(trainer)`"

	if tx := entity.DB().Where("id = ?", trainer.FormOfWorkID).First(&form); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Form not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", trainer.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "department not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", trainer.ReligionID).First(&religion); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "department not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", trainer.EducationID).First(&education); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}
	pass, _ := bcrypt.GenerateFromPassword([]byte(trainer.Password), 14)

	rm := entity.Trainer{
		Name:       trainer.Name,
		University: trainer.University,
		Gpax:       trainer.Gpax,
		Gender:     trainer.Gender,
		Age:        trainer.Age,
		Address:    trainer.Address,
		Email:      trainer.Email,
		Password:   string(pass),

		FormOfWork: form,
		Status:     status,
		Religion:   religion,
		Education:  education,
	}

	if err := entity.DB().Create(&rm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rm})
}

// Get trainer by id  -->ดึงข้อมูลเจ้าหน้าที่ที่กำลังใช้งาน หรือ ผู้ที่ทำการเพิ่มพนักงาน
// GET /trainer/:id
func GetTrainer(c *gin.Context) {
	var trainer entity.Trainer
	id := c.Param("id")

	if err := entity.DB().Preload("FormOfWork").Preload("Status").Preload("Religion").Preload("Education").Raw("SELECT * FROM trainers WHERE id = ?", id).Find(&trainer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": trainer})
}

// GET /trainrs
func ListTrainers(c *gin.Context) {
	var trainer []entity.Trainer

	if err := entity.DB().Preload("FormOfWork").Preload("Status").Preload("Religion").Preload("Education").Raw("SELECT * FROM trainers").Find(&trainer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": trainer})
}

// DELETE /trainer/:id
func DeleteTrainer(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM trainers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "trainer not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /trainer
func UpdateTrainer(c *gin.Context) {
	var trainer entity.Trainer
	if err := c.ShouldBindJSON(&trainer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", trainer.ID).First(&trainer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "trainer not found"})
		return
	}

	if err := entity.DB().Save(&trainer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": trainer})
}
