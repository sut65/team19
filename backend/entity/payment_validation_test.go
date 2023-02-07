package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPaymentValidate(t *testing.T) {
	g := NewGomegaWithT(t) // start testing

	t.Run("check payment conpletely", func(t *testing.T) {
		p := Payment{
			PaymentDate: time.Date(2023, 02, 05, 04, 25, 49, 651387237, time.UTC),
			Slip:        "data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
			Balance:     2000,
		}

		ok, err := govalidator.ValidateStruct(p)
		// ok = true
		// err = nil

		// เช็ค ok เป็นจริง
		g.Expect(ok).To(BeTrue())

		// เช็ค err เป็นเท็จ
		g.Expect(err).To(BeNil())
	})

	t.Run("check slip cannot blank", func(t *testing.T) {
		p := Payment{
			PaymentDate: time.Date(2023, 02, 05, 04, 25, 49, 651387237, time.UTC),
			Slip:        "", // incorrect
			Balance:     2000,
		}

		ok, err := govalidator.ValidateStruct(p)
		// ok = nil
		// err = true

		// เช็ค ok ไม่เป็นจริง (เพราะเกิด error ที่ Slip)
		g.Expect(ok).NotTo(BeTrue())

		// เช็ค err ไม่เป็นเท็จ (เพราะเกิด error ที่ Slip)
		g.Expect(err).ToNot(BeNil())

		// เช็ค err message เป็น Please upload slip (เพราะเกิด error ที่ Slip)
		g.Expect(err.Error()).To(Equal("Please upload slip"))
	})

	// ================================================================================================
	// ทำเทสขนาดไฟล์น้อยกว่า 2 MB ไม่ได้เพราะ VSCODE ค้าง
	// ================================================================================================

	t.Run("check slip must be images file", func(t *testing.T) {
		p := Payment{
			PaymentDate: time.Date(2023, 02, 05, 04, 25, 49, 651387237, time.UTC),
			Slip:        "data:image/pdf;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC", // incorrect > PDF file
			Balance:     2000,
		}

		ok, err := govalidator.ValidateStruct(p)
		// ok = nil
		// err = true

		// เช็ค ok ไม่เป็นจริง (เพราะเกิด error ที่ Slip)
		g.Expect(ok).NotTo(BeTrue())

		// เช็ค err ไม่เป็นเท็จ (เพราะเกิด error ที่ Slip)
		g.Expect(err).ToNot(BeNil())

		// เช็ค err message เป็น Slip must be image file (เพราะเกิด error ที่ Slip)
		g.Expect(err.Error()).To(Equal("Slip must be image file"))
	})
}
