package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// GET /status/:id
func GetForm(c *gin.Context) {
	var form entity.FormOfWork
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM form_of_works WHERE id = ?", id).Scan(&form).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": form})
}

// GET/Forms
func ListForms(c *gin.Context) {
	var form []entity.FormOfWork
	if err := entity.DB().Raw("SELECT * FROM form_of_works").Scan(&form).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": form})
}
