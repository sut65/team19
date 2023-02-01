package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestBlogValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("check title not less than 5 characters", func(t *testing.T) {
		blog := Blog{
			CoverImage: "fsdf",
			Title:      "d", //ผิด
			Content:    "dsfsdfdsfsdfsdfsfdsdfsd",
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(blog)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Title not less than 5 characters"))

	})

	t.Run("check content not less than 20 characters", func(t *testing.T) {
		blog := Blog{
			CoverImage: "fsdf",
			Title:      "dfsfsfsdf",
			Content:    "dsfsdf", // ผิด
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(blog)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Content not less than 20 characters"))

	})

}
