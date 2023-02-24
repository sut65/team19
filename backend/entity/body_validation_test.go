package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบค่าว่างของชื่อแล้วต้องเจอ Error
func TestBodyValid(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("check Height must be greater than 0", func(t *testing.T) {
		body := Body{
			Height:      -1.00,
			Weight:      23.83,
			Hip:         23.46,
			UpperArm:    23.73,
			Thigh:       23.56,
			NarrowWaist: 23.12,
			NavelWaist:  23.231,
			Bmi:         23.32,
			Note:        "Test",
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(body)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("input must be greater than 0"))

	})

	t.Run("check Weight must be greater than 0", func(t *testing.T) {
		body := Body{
			Height:      11.00,
			Weight:      -23.83,
			Hip:         23.46,
			UpperArm:    23.73,
			Thigh:       23.56,
			NarrowWaist: 23.12,
			NavelWaist:  23.231,
			Bmi:         23.32,
			Note:        "Test",
		}

		ok, err := govalidator.ValidateStruct(body)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("input must be greater than 0"))

	})

	t.Run("check Hip must be greater than 0", func(t *testing.T) {
		body := Body{
			Height:      11.00,
			Weight:      23.83,
			Hip:         -23.46,
			UpperArm:    23.73,
			Thigh:       23.56,
			NarrowWaist: 23.12,
			NavelWaist:  23.231,
			Bmi:         23.32,
			Note:        "Test",
		}

		ok, err := govalidator.ValidateStruct(body)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("input must be greater than 0"))

	})

	t.Run("check UpperArm must be greater than 0", func(t *testing.T) {
		body := Body{
			Height:      11.00,
			Weight:      23.83,
			Hip:         3.46,
			UpperArm:    -23.23,
			Thigh:       23.56,
			NarrowWaist: 23.12,
			NavelWaist:  23.231,
			Bmi:         23.32,
			Note:        "Test",
		}

		ok, err := govalidator.ValidateStruct(body)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("input must be greater than 0"))

	})

	t.Run("check Thigh must be greater than 0", func(t *testing.T) {
		body := Body{
			Height:      11.00,
			Weight:      23.83,
			Hip:         3.46,
			UpperArm:    23.73,
			Thigh:       -23.56,
			NarrowWaist: 23.12,
			NavelWaist:  23.231,
			Bmi:         23.32,
			Note:        "Test",
		}

		ok, err := govalidator.ValidateStruct(body)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("input must be greater than 0"))

	})

	t.Run("check NarrowWaist must be greater than 0", func(t *testing.T) {
		body := Body{
			Height:      11.00,
			Weight:      23.83,
			Hip:         3.46,
			UpperArm:    23.73,
			Thigh:       23.56,
			NarrowWaist: -23.12,
			NavelWaist:  23.231,
			Bmi:         23.32,
			Note:        "Test",
		}

		ok, err := govalidator.ValidateStruct(body)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("input must be greater than 0"))

	})

	t.Run("check NavelWaist must be greater than 0", func(t *testing.T) {
		body := Body{
			Height:      11.00,
			Weight:      23.83,
			Hip:         3.46,
			UpperArm:    23.73,
			Thigh:       23.56,
			NarrowWaist: 23.12,
			NavelWaist:  -23.231,
			Bmi:         23.32,
			Note:        "Test",
		}

		ok, err := govalidator.ValidateStruct(body)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("input must be greater than 0"))

	})

	t.Run("check Bmi must be greater than 0", func(t *testing.T) {
		body := Body{
			Height:      11.00,
			Weight:      23.83,
			Hip:         3.46,
			UpperArm:    23.73,
			Thigh:       23.56,
			NarrowWaist: 23.12,
			NavelWaist:  23.231,
			Bmi:         -23.32,
			Note:        "Test",
		}

		ok, err := govalidator.ValidateStruct(body)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("input must be greater than 0"))

	})

	t.Run("check Note cannnot blank", func(t *testing.T) {
		body := Body{
			Height:      11.00,
			Weight:      23.83,
			Hip:         3.46,
			UpperArm:    23.73,
			Thigh:       23.67,
			NarrowWaist: 23.12,
			NavelWaist:  23.231,
			Bmi:         23.32,
			Note:        "",
		}

		ok, err := govalidator.ValidateStruct(body)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Note cannot be blank"))

	})

	t.Run("check Note must be no more than 30 characters long", func(t *testing.T) {
		body := Body{
			Height:      11.00,
			Weight:      23.83,
			Hip:         3.46,
			UpperArm:    23.73,
			Thigh:       23.67,
			NarrowWaist: 23.12,
			NavelWaist:  23.231,
			Bmi:         23.32,
			Note:        "12312312323123123123123123123123123123123123123123123",
		}

		ok, err := govalidator.ValidateStruct(body)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Note must be no more than 30 characters long"))

	})

	t.Run("check validation positive", func(t *testing.T) {
		body := Body{
			Height:      11.00,
			Weight:      23.83,
			Hip:         3.46,
			UpperArm:    23.73,
			Thigh:       23.67,
			NarrowWaist: 23.12,
			NavelWaist:  23.231,
			Bmi:         23.32,
			Note:        "3123123123123123123",
		}

		ok, err := govalidator.ValidateStruct(body)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())

	})

}
