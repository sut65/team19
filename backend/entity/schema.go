package entity

import (
	_ "time"

	"gorm.io/gorm"
)

type Category struct {
	gorm.Model
	Name  string
	Blogs []Blog `gorm:"foreignKey:CategoryID"`
}

type Tag struct {
	gorm.Model
	Name  string
	Blogs []Blog `gorm:"foreignKey:TagID"`
}

type Blog struct {
	gorm.Model
	CoverImage string
	Title      string
	Content    string

	CategoryID *uint
	Category   Category

	TagID *uint
	Tag   Tag
}
