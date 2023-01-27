package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// POST /behavior
func CreateBehavior(c *gin.Context) {
	var member entity.Member
	var taste entity.Taste
	var exercise entity.Exercise
	var behavior entity.Behavior

	if err := c.ShouldBindJSON(&behavior); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", behavior.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	// ค้นหา taste ด้วย id
	if tx := entity.DB().Where("id = ?", behavior.TasteID).First(&taste); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "taste not found"})
		return
	}

	// ค้นหา exercise ด้วย id
	if tx := entity.DB().Where("id = ?", behavior.ExerciseID).First(&exercise); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "exercise not found"})
		return
	}

	// สร้าง behavior
	fif := entity.Behavior{
		Taste:    taste,
		Exercise: exercise,
		Member:   member,
		Meals:    behavior.Meals,
		Time:     behavior.Time,
	}

	// บันทึก
	if err := entity.DB().Create(&fif).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": fif})
}

// GET /behavior/:id
func GetBehavior(c *gin.Context) {
	var behavior entity.Behavior
	id := c.Param("id")

	if tx := entity.DB().Preload("Member").Preload("Exercise").Preload("Tatse").Where("id = ?", id).First(&behavior); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": behavior})
}

// GET /behaviors
func ListBehaviors(c *gin.Context) {
	var behaviors []entity.Member
	if err := entity.DB().Preload("Member").Preload("Exercise").Preload("Tatse").Raw("SELECT * FROM members").Find(&behaviors).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": behaviors})
}

// DELETE /behavior/:id
func DeleteBehavior(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Behaviors WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "behaviors not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /behavior
func UpdateBehavior(c *gin.Context) {
	var behavior entity.Behavior
	var new_behavior entity.Behavior
	if err := c.ShouldBindJSON(&behavior); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	new_behavior.Exercise = behavior.Exercise
	new_behavior.Taste = behavior.Taste
	new_behavior.Member = behavior.Member
	new_behavior.Meals = behavior.Meals
	new_behavior.Time = behavior.Time

	if err := entity.DB().Where("id = ?", behavior.ID).Updates(&new_behavior).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": new_behavior})
}
