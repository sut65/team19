package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// POST /payment
func CreatePayment(c *gin.Context) {

	var payment entity.Payment
	var course_service entity.CourseService
	var discount entity.Discount
	var duration entity.Duration

	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา course_service ด้วย id
	if tx := entity.DB().Where("id = ?", payment.CourseServiceID).First(&course_service); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course_service not found"})
		return
	}

	// ค้นหา discount ด้วย id
	if tx := entity.DB().Where("id = ?", payment.DiscountID).First(&discount); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "discount not found"})
		return
	}

	// ค้นหา duration ด้วย id
	if tx := entity.DB().Where("id = ?", payment.DurationID).First(&duration); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "duration not found"})
		return
	}

	// สร้าง Payment
	pm := entity.Payment{
		PaymentDate: 		payment.PaymentDate, 	// ตั้งค่าฟิลด์ PaymentDate
		Slip:     			payment.Slip,     		// ตั้งค่าฟิลด์ Slip
		Balance:        	payment.Balance,        // ตั้งค่าฟิลด์ Balance
		CourseService:      course_service,         // โยงความสัมพันธ์กับ Entity CourseService
		Discount:  			discount,               // โยงความสัมพันธ์กับ Entity Discount
		Duration:       	duration,               // โยงความสัมพันธ์กับ Entity Duration
	}

	// บันทึก
	if err := entity.DB().Create(&pm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": pm})
}

// GET /payment/:id
func GetPayment(c *gin.Context) {
	var payment entity.Payment
	id := c.Param("id")
	if tx := entity.DB().Preload("CourseService").Preload("Discount").Preload("Duration").Where("id = ?", id).First(&payment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}


// GET /payments
func ListPayments(c *gin.Context) {
	var payments []entity.Payment
	if err := entity.DB().Preload("CourseService").Preload("Discount").Preload("Duration").Raw("SELECT * FROM payments").Find(&payments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payments})
}