package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// POST /blogs
func CreateBlog(c *gin.Context) {

	var blog entity.Blog
	var category entity.Category
	var tag entity.Tag
	var user entity.User

	if err := c.ShouldBindJSON(&blog); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", blog.UserID).First(&user); tx.RowsAffected == 0 {
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

	// สร้าง Blog
	blg := entity.Blog{
		Category:   category,
		Tag:        tag,
		User:       user,
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

	if tx := entity.DB().Preload("Category").Preload("Tag").Preload("User").Where("id = ?", id).First(&blog); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "blog not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": blog})
}

// GET /blogs
func ListBlogs(c *gin.Context) {
	var blogs []entity.Blog
	if err := entity.DB().Preload("Category").Preload("Tag").Preload("User").Raw("SELECT * FROM blogs").Find(&blogs).Error; err != nil {
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
	var newBlog entity.Blog

	if err := c.ShouldBindJSON(&blog); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newBlog.CoverImage = blog.CoverImage
	newBlog.Title = blog.Title
	newBlog.Content = blog.Content
	newBlog.Category = blog.Category
	newBlog.Tag = blog.Tag
	newBlog.User = blog.User

	// update := entity.Blog{
	// 	CoverImage: newBlog.CoverImage,
	// 	Title:      newBlog.Title,
	// 	Content:    newBlog.Content,
	// 	Category:   newBlog.Category,
	// 	Tag:        newBlog.Tag,
	// 	User:       newBlog.User,
	// }

	if err := entity.DB().Where("id = ?", blog.ID).Updates(&newBlog).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newBlog})
}
