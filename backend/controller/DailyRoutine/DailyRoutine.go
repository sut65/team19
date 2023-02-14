package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
)

// POST /Daily Routine
func CreateDailyRoutine(c *gin.Context) {
	var dailyRoutine entity.DailyRoutine
	var user entity.Member
	var activity entity.Activity
	var mealTime entity.MealTime
	var sleepSchedule entity.SleepSchedule

	if err := c.ShouldBindJSON(&dailyRoutine); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find user By ID
	if tx := entity.DB().Where("id = ?", dailyRoutine.MemberID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// Find Activity By ID
	if tx := entity.DB().Where("id = ?", dailyRoutine.ActivityID).First(&activity); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "activity not found"})
		return
	}

	// Find MealTime By ID
	if tx := entity.DB().Where("id = ?", dailyRoutine.MealTimeID).First(&mealTime); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "MealTime not found"})
		return
	}

	// Find SleepSchedule By ID
	if tx := entity.DB().Where("id = ?", dailyRoutine.SleepSchedule).First(&sleepSchedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "SleepSchedule not found"})
		return
	}

	// Create DailyRoutine
	dailyCreate := entity.DailyRoutine{
		Description:   dailyRoutine.Description,
		TimeStamp:     dailyRoutine.TimeStamp,
		Member:        user,
		Activity:      activity,
		MealTime:      mealTime,
		SleepSchedule: sleepSchedule,
	}

	// Record
	if err := entity.DB().Create(&dailyCreate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": dailyCreate})
}

// GET /DailyRoutines
func GetDailyRoutines(c *gin.Context) {
	var dailyRoutines []entity.DailyRoutine

	if err := entity.DB().Preload("Member").Preload("Activity").Preload("MealTime").Preload("SleepSchedule").Raw("SELECT * FROM daily_routines").Find(&dailyRoutines).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dailyRoutines})
}

// GET /DailyRoutine/:id
func GetDailyRoutineByID(c *gin.Context) {
	var dailyRoutine entity.DailyRoutine
	id := c.Param("id")

	if tx := entity.DB().Preload("Member").Preload("Activity").Preload("MealTime").Preload("SleepSchedule").Where("id = ?", id).First(&dailyRoutine); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DailyRoutine not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dailyRoutine})
}

// GET /GetActivityTypes/:id
func GetActivityTypesByID(c *gin.Context) {
	var dailyRoutine entity.DailyRoutine
	id := c.Param("id")

	if tx := entity.DB().Preload("Member").Preload("Activity").Preload("MealTime").Preload("SleepSchedule").Where("id = ?", id).First(&dailyRoutine); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DailyRoutine not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dailyRoutine})
}

// DELETE /DailyRoutine/:id
func DeleteDailyRoutine(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM daily_routines WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DailyRoutines not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /DailyRoutine
func UpdateDailyRoutine(c *gin.Context) {
	var dailyRoutine entity.DailyRoutine
	var user entity.Member
	var activity entity.Activity
	var mealTime entity.MealTime
	var sleepSchedule entity.SleepSchedule

	if err := c.ShouldBindJSON(&dailyRoutine); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find Member By ID
	if tx := entity.DB().Where("id = ?", dailyRoutine.MemberID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// Find Activity By ID
	if tx := entity.DB().Where("id = ?", dailyRoutine.ActivityID).First(&activity); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "activity not found"})
		return
	}

	// Find MealTime By ID
	if tx := entity.DB().Where("id = ?", dailyRoutine.MealTimeID).First(&mealTime); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "MealTime not found"})
		return
	}
	// Find SleepSchedule By ID
	if tx := entity.DB().Where("id = ?", dailyRoutine.SleepSchedule).First(&sleepSchedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "SleepSchedule not found"})
		return
	}

	// Update DailyRoutine
	dailyUpdate := entity.DailyRoutine{
		Description:   dailyRoutine.Description,
		TimeStamp:     dailyRoutine.TimeStamp,
		Member:        user,
		Activity:      activity,
		MealTime:      mealTime,
		SleepSchedule: sleepSchedule,
	}

	// Record DailyRoutine
	if err := entity.DB().Where("id = ?", dailyRoutine.ID).Updates(&dailyUpdate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": dailyUpdate})
}
