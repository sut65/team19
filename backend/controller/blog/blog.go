package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// POST /blogs
func CreateBlog(c *gin.Context) {
	var blog entity.Blog
	var category entity.Category
	var tag entity.Tag
	var user entity.Member

	if err := c.ShouldBindJSON(&blog); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", blog.MemberID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// ค้นหา category ด้วย id
	if tx := entity.DB().Where("id = ?", blog.CategoryID).First(&category); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "category not found"})
		return
	}

	// ค้นหา tag ด้วย id
	if tx := entity.DB().Where("id = ?", blog.TagID).First(&tag); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "tag not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(blog); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง Blog
	blg := entity.Blog{
		Category:   category,
		Tag:        tag,
		Member:     user,
		CoverImage: blog.CoverImage,
		Title:      blog.Title,
		Content:    blog.Content,
	}

	// บันทึก
	if err := entity.DB().Create(&blg).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": blg})
}

// GET /blog/:id
func GetBlog(c *gin.Context) {
	var blog entity.Blog
	id := c.Param("id")

	if tx := entity.DB().Preload("Category").Preload("Tag").Preload("Member").Where("id = ?", id).First(&blog); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "blog not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": blog})
}

// GET /blogs
func ListBlogs(c *gin.Context) {
	var blogs []entity.Blog
	if err := entity.DB().Preload("Category").Preload("Tag").Preload("Member").Raw("SELECT * FROM blogs").Find(&blogs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": blogs})
}

// DELETE /blog/:id
func DeleteBlog(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM blogs WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "blog not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /blog
func UpdateBlog(c *gin.Context) {
	var blog entity.Blog
	var category entity.Category
	var tag entity.Tag
	var user entity.Member

	if err := c.ShouldBindJSON(&blog); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", blog.MemberID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// ค้นหา category ด้วย id
	if tx := entity.DB().Where("id = ?", blog.CategoryID).First(&category); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "category not found"})
		return
	}

	// ค้นหา tag ด้วย id
	if tx := entity.DB().Where("id = ?", blog.TagID).First(&tag); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "tag not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(blog); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	update := entity.Blog{
		CoverImage: blog.CoverImage,
		Title:      blog.Title,
		Content:    blog.Content,
		Category:   category,
		Tag:        tag,
		Member:     user,
	}

	if err := entity.DB().Where("id = ?", blog.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": blog})
}
