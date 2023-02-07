package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	"golang.org/x/crypto/bcrypt"
)

// POST /member
func CreateMember(c *gin.Context) {
	var member entity.Member
	var status entity.Status
	var gender entity.Gender
	var religion entity.Religion

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา status ด้วย id
	if tx := entity.DB().Where("id = ?", member.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status not found"})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", member.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	// ค้นหา religion ด้วย id
	if tx := entity.DB().Where("id = ?", member.ReligionID).First(&religion); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "religion not found"})
		return
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(member.Password), 14)

	// สร้าง Member
	fif := entity.Member{
		Gender:      gender,
		Status:      status,
		Religion:    religion,
		ProfileUser: member.ProfileUser,
		Firstname:   member.Firstname,
		Lastname:    member.Lastname,
		Email:       member.Email,
		Password:    string(password),
	}

	// บันทึก
	if err := entity.DB().Create(&fif).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": fif})
}

// GET /member/:id
func GetMember(c *gin.Context) {
	var member entity.Member
	id := c.Param("id")

	if tx := entity.DB().Preload("Gender").Preload("Status").Preload("Religion").Where("id = ?", id).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": member})
}

// GET /members
func ListMembers(c *gin.Context) {
	var members []entity.Member
	if err := entity.DB().Preload("Gender").Preload("Status").Preload("Religion").Raw("SELECT * FROM members").Find(&members).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": members})
}

// DELETE /member/:id
func DeleteMember(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM members WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "members not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /member
func UpdateMember(c *gin.Context) {
	var member entity.Member
	var status entity.Status
	var gender entity.Gender
	var religion entity.Religion

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา status ด้วย id
	if tx := entity.DB().Where("id = ?", member.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status not found"})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", member.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	// ค้นหา religion ด้วย id
	if tx := entity.DB().Where("id = ?", member.ReligionID).First(&religion); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "religion not found"})
		return
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(member.Password), 14)

	// สร้าง Member
	update := entity.Member{
		Gender:      gender,
		Status:      status,
		Religion:    religion,
		ProfileUser: member.ProfileUser,
		Firstname:   member.Firstname,
		Lastname:    member.Lastname,
		Email:       member.Email,
		Password:    string(password),
	}

	// บันทึก
	if err := entity.DB().Where("id = ?", member.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": update})

}
