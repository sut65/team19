package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestFoodInformation(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("check Name Cannot Be Blank", func(t *testing.T) {
	foodinformation := FoodInformation{
		Name: "", //ผิด
		Image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
	}

	// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(foodinformation)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Name cannot be blank"))

	})

	t.Run("check Name Cannot More Than 20 Characters", func(t *testing.T) {
		foodinformation := FoodInformation{
			Name: "food_name_mai_gern_20_characters", //ผิด
			Image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
		}
	
		// ตรวจสอบด้วย govalidator
			ok, err := govalidator.ValidateStruct(foodinformation)
	
			g.Expect(ok).NotTo(BeTrue())
	
			g.Expect(err).ToNot(BeNil())
	
			g.Expect(err.Error()).To(Equal("Food Name cannot more than 20 characters"))
	
		})

	t.Run("check Image must be an image file", func(t *testing.T) {
	foodinformation := FoodInformation{
		Name: "Meme",
		Image: "data:image/pdf;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC", //ผิด
	}
	
	// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(foodinformation)
	
		g.Expect(ok).NotTo(BeTrue())
	
		g.Expect(err).ToNot(BeNil())
	
		g.Expect(err.Error()).To(Equal("Image must be image file"))
	
	})
}