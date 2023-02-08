package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestNutrient(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("check Comment Cannot more than 50 Characters", func(t *testing.T) {
	nutrient := Nutrient{
		Comment: "asdfsadfasdfasdfsdfasdfsadfasdfasdfsdfasdfsadfasdfasdfsdfasdfsadfasdfasdfsdfasdfsadfasdfasdfsdfasdfsadfasdfasdfsdfasdfsadfasdfasdfsdfasdfsadfasdfasdfsdfasdfsadfasdfasdfsdfasdfsadfasdfasdfsdfasdfsadfasdfasdfsdf", //ผิด
		TotalCalorie: 500,
	}

	ok, err := govalidator.ValidateStruct(nutrient)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Comment cannot more than 50 characters"))
	})

	t.Run("check Calorie Cannot More Than 10000", func(t *testing.T) {
	nutrient := Nutrient{
		Comment: "Hi", 
		TotalCalorie: 15000, //ผิด
	}

	ok, err := govalidator.ValidateStruct(nutrient)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Invalid calorie"))
	})

	t.Run("check Calorie Cannot Less Than 0", func(t *testing.T) {
	nutrient := Nutrient{
		Comment: "Hi", 
		TotalCalorie: -100, //ผิด
	}

	ok, err := govalidator.ValidateStruct(nutrient)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Invalid calorie"))
	})


}