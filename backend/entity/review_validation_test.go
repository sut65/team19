package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestReviewValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("check content not less than 10 characters", func(t *testing.T) {
		review := Review{
			Image:   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
			Content: "d",
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("content not less than 10 characters"))

	})

	t.Run("check content not more than 200 characters", func(t *testing.T) {
		review := Review{
			Image:   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
			Content: "fdsfsfsfsdfsdLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500ssdfsdfsdfsdfsfsdfsfdsfsdfsdfsfsdfsdfsdfsdsfsd", // ผิด (216 ตัว)
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("content not more than 200 characters"))

	})

	t.Run("check Image must be an images file", func(t *testing.T) {
		review := Review{
			Image:   "data:image/pdf;base64,iVBORw0KGgoAAAANSUhEUgAACB", // ผิด
			Content: "dsfsdfsafsdfasfsafsafsafsfasfasdf",
		}

		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Image must be images file"))

	})

}
