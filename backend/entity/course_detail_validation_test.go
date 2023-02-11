package entity

import (
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"testing"
)

func TestCourseNameValid(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("check CourseName must contain no more than 50 characters", func(t *testing.T) {
		cd := CourseDetail{
			CourseName: "หากเราจะพูดเรื่องลดความอ้วนหรือลดน้ำหนัก ต้องใช้คำว่า lose weight ซึ่งทำได้โดยการออกกำลังกายหรือควบคุมอาหารแต่เมื่อเราใช้คำว่า Diet ก็จะเป็นการลดน้ำหนักโดยการควบคุมอาหารเพียงอย่างเดียววันนี้ ",
			CoverPage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
			Description: "หุ่นดีได้ง่าย ๆ ห่างไกลจากโรคแทรกซ้อน ทำได้ ง่าย ๆ ที่บ้านด้วยตัวเอง",
			Goal: "เพิ่มน้ำหนักได้ 1-2 kg",
			
		}

		ok, err := govalidator.ValidateStruct(cd)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("CourseName must contain no more than 50 characters"))
	})

	t.Run("check CourseName cannot be blank", func(t *testing.T) {
		cd := CourseDetail{
			CourseName: "",
			CoverPage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
			Description: "หุ่นดีได้ง่าย ๆ ห่างไกลจากโรคแทรกซ้อน ทำได้ ง่าย ๆ ที่บ้านด้วยตัวเอง",
			Goal: "เพิ่มน้ำหนักได้ 1-2 kg",
			
		}

		ok, err := govalidator.ValidateStruct(cd)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("CourseName cannot be blank"))
	})

	t.Run("check CoverPage must be images file", func(t *testing.T) {
		cd := CourseDetail{
			CourseName: "บอกลาร่างผม",
			CoverPage: "data:image/pdf;base64,iVBORw0KGgoAAAANSUhEUgAACB",
			Description: "หุ่นดีได้ง่าย ๆ ห่างไกลจากโรคแทรกซ้อน ทำได้ ง่าย ๆ ที่บ้านด้วยตัวเอง",
			Goal: "เพิ่มน้ำหนักได้ 1-2 kg",
			
		}

		ok, err := govalidator.ValidateStruct(cd)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("CoverPage must be images file"))
	})

	t.Run("check Description cannot be blank", func(t *testing.T) {
		cd := CourseDetail{
			CourseName: "บอกลาร่างผม",
			CoverPage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
			Description: "",
			Goal: "เพิ่มน้ำหนักได้ 1-2 kg",
			
		}

		ok, err := govalidator.ValidateStruct(cd)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Description cannot be blank"))
	})

	t.Run("check Goal cannot be blank", func(t *testing.T) {
		cd := CourseDetail{
			CourseName: "บอกลาร่างผม",
			CoverPage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
			Description: "หุ่นดีได้ง่าย ๆ ห่างไกลจากโรคแทรกซ้อน ทำได้ ง่าย ๆ ที่บ้านด้วยตัวเอง",
			Goal: "",
			
		}

		ok, err := govalidator.ValidateStruct(cd)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Goal cannot be blank"))
	})


}
