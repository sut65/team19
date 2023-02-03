package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// POST /reviews
func CreateReview(c *gin.Context) {
	var review entity.Review
	var courseDetail entity.CourseDetail
	var rank entity.Rank
	var user entity.Member

	if err := c.ShouldBindJSON(&review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", review.MemberID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	// ค้นหา courseDetail ด้วย id
	if tx := entity.DB().Where("id = ?", review.CourseDetailID).First(&courseDetail); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course detail not found"})
		return
	}

	// ค้นหา rank ด้วย id
	if tx := entity.DB().Where("id = ?", review.RankID).First(&rank); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "rank not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง review
	rv := entity.Review{
		CourseDetail: courseDetail,
		Rank:         rank,
		Member:       user,
		Content:      review.Content,
		Image:        review.Image,
	}

	// บันทึก
	if err := entity.DB().Create(&rv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": rv})
}

// GET /review/:id
func GetReview(c *gin.Context) {
	var review entity.Review
	id := c.Param("id")

	if tx := entity.DB().Preload("CourseDetail").Preload("Rank").Preload("Member").Where("id = ?", id).First(&review); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Review not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": review})
}

// GET /review-cid/:id
func GetReviewByCourseID(c *gin.Context) {
	var review []entity.Review
	id := c.Param("id")

	if tx := entity.DB().Preload("CourseDetail").Preload("Rank").Preload("Member").Where("course_detail_id = ?", id).Find(&review); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Review not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": review})
}

// GET /reviews
func ListReviews(c *gin.Context) {
	var reviews []entity.Review
	if err := entity.DB().Preload("CourseDetail").Preload("Rank").Preload("Member").Raw("SELECT * FROM reviews").Find(&reviews).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": reviews})
}

// DELETE /review/:id
func DeleteReview(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM reviews WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "review not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /review
func UpdateReview(c *gin.Context) {
	var review entity.Review
	var courseDetail entity.CourseDetail
	var rank entity.Rank
	var user entity.Member

	if err := c.ShouldBindJSON(&review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", review.MemberID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	// ค้นหา courseDetail ด้วย id
	if tx := entity.DB().Where("id = ?", review.CourseDetailID).First(&courseDetail); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course detail not found"})
		return
	}

	// ค้นหา rank ด้วย id
	if tx := entity.DB().Where("id = ?", review.RankID).First(&rank); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "rank not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updateReview := entity.Review{
		CourseDetail: courseDetail,
		Rank:         rank,
		Member:       user,
		Content:      review.Content,
		Image:        review.Image,
	}

	if err := entity.DB().Where("id = ?", review.ID).Updates(&updateReview).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": review})
}
