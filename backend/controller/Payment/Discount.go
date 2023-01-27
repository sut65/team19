package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	"gorm.io/gorm/clause"
)

// POST /discount
func CreateDiscount(c *gin.Context) {
	var discount entity.Discount
	if err := c.ShouldBindJSON(&discount); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&discount).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": discount})
}

// GET /discount/:discount_code
func GetDiscount(c *gin.Context) {
	var discount entity.Discount
	discount_code := c.Param("discount_code")
	if tx := entity.DB().Preload(clause.Associations).Preload("Payment." + clause.Associations).Where("discount_code = ?", discount_code).First(&discount); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "discount not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": discount})
}

// GET /discounts
func ListDiscounts(c *gin.Context) {
	var discounts []entity.Discount
	if err := entity.DB().Preload(clause.Associations).Preload("Payment." + clause.Associations).Raw("SELECT * FROM discounts").Find(&discounts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": discounts})
}

// DELETE /discount/:id
func DeleteDiscount(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM discounts WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "discounts not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /discount
func UpdateDiscount(c *gin.Context) {
	var discount entity.Discount
	if err := c.ShouldBindJSON(&discount); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", discount.ID).First(&discount); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "discount not found"})
		return
	}

	if err := entity.DB().Save(&discount).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": discount})
}
