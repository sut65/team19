package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestBehaviorValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("check Meals not less than 4 characters", func(t *testing.T) {
		behavior := Behavior{
			Meals:       "ๅๅ",
			ProfileBody: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(behavior)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Meals not less than 4 characters"))

	})

	t.Run("check Profile must be only image", func(t *testing.T) {
		behavior := Behavior{
			Meals:       "เช้า กลางวัน",
			ProfileBody: "data:image/pdf;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(behavior)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Profile must be only image"))

	})

	t.Run("check Meals not more than 30 characters", func(t *testing.T) {
		behavior := Behavior{
			Meals:       "เช้าasdasdwqasdwrqaddsffsgdhgfhfvbdferadaasd",
			ProfileBody: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
		}

		ok, err := govalidator.ValidateStruct(behavior)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Meals not more than 30 characters"))

	})

}
