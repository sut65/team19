package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestBlogValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("check title cannot be blank", func(t *testing.T) {
		blog := Blog{
			CoverImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
			Title:      "", //wrong
			Content:    "dsfsdfdsfsdfsdfsfdsdfsdsdfs",
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(blog)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Title cannot be blank"))

	})

	t.Run("check title not more than 70 characters", func(t *testing.T) {
		blog := Blog{
			CoverImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
			Title:      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum", //wrong 86 characters
			Content:    "dsfsdfdsfsdfsdfsfdsdfsdsdfs",
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(blog)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Title not more than 70 characters"))

	})

	t.Run("check content not less than 20 characters", func(t *testing.T) {
		blog := Blog{
			CoverImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
			Title:      "dfsfsfsdf",
			Content:    "dsfsdf", // wrong
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(blog)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Content not less than 20 characters"))

	})

	t.Run("check CoverImage must be an images file", func(t *testing.T) {
		blog := Blog{
			CoverImage: "data:image/pdf;base64,iVBORw0KGgoAAAANSUhEUgAACB", // wrong
			Title:      "dfsfsfsdf",
			Content:    "dsfsdfsafsdfasfsafsafsafsfasfasdf",
		}

		ok, err := govalidator.ValidateStruct(blog)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("CoverImage must be images file"))

	})

}
