package entity

import (
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"testing"
)

func TestCourseDetailValid(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("check CourseName must be no more than 50 characters", func(t *testing.T) {
		cd := CourseDetail{
			CourseName: "หากเราจะพูดเรื่องลดความอ้วนหรือลดน้ำหนัก ต้องใช้คำว่า lose weight ซึ่งทำได้โดยการออกกำลังกายหรือควบคุมอาหารแต่เมื่อเราใช้คำว่า Diet ก็จะเป็นการลดน้ำหนักโดยการควบคุมอาหารเพียงอย่างเดียววันนี้ ", //ผิด
			CoverPage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
			Description: "หุ่นดีได้ง่าย ๆ ห่างไกลจากโรคแทรกซ้อน ทำได้ ง่าย ๆ ที่บ้านด้วยตัวเอง",
			Goal: "เพิ่มน้ำหนักได้ 1-2 kg",
			
		}

		ok, err := govalidator.ValidateStruct(cd)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("CourseName must be no more than 50 characters"))
	})

	t.Run("check CourseName cannot be blank", func(t *testing.T) {
		cd := CourseDetail{
			CourseName: "", //ผิด
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
			CoverPage: "data:image/pdf;base64,iVBORw0KGgoAAAANSUhEUgAACB", //ผิด
			Description: "หุ่นดีได้ง่าย ๆ ห่างไกลจากโรคแทรกซ้อน ทำได้ ง่าย ๆ ที่บ้านด้วยตัวเอง",
			Goal: "เพิ่มน้ำหนักได้ 1-2 kg",
			
		}

		ok, err := govalidator.ValidateStruct(cd)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("CoverPage must be images file"))
	})

	t.Run("check Description must be no more than 300 characters", func(t *testing.T) {
		cd := CourseDetail{
			CourseName: "บอกลาร่างผม",
			CoverPage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
			Description: "ร้องไห้ราวกับกำลังแตกสลายไปเลยก็ได้ แต่ทุกครั้งที่ระบายอารมณ์และพักจนพอใจแล้ว อย่าลืมว่าเราสามารถหยิบชิ้นส่วนที่กระจัดกระจายอยู่ มาประกอบร่างสร้างเป็นตัวเรา และใช้ชีวิตต่อไปได้อีกครั้ง เพราะเราไม่ชอบความเจ็บปวด เราเลยหลีกเลี่ยงที่จะรู้สึกถึงมันหากทำได้ แต่ในการบำบัดนั้น เราต้องวางเกราะป้องกันเหล่านี้ลงและทำความเข้าใจกับสาเหตุที่แท้จริง แม้จะเจ็บปวดแค่ไหนก็ตาม", //ผิด
			Goal: "เพิ่มน้ำหนักได้ 1-2 kg",
			
		}

		ok, err := govalidator.ValidateStruct(cd)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Description must be no more than 300 characters"))
	})

	t.Run("check Description cannot be blank", func(t *testing.T) {
		cd := CourseDetail{
			CourseName: "บอกลาร่างผม",
			CoverPage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
			Description: "", //ผิด
			Goal: "เพิ่มน้ำหนักได้ 1-2 kg",
			
		}

		ok, err := govalidator.ValidateStruct(cd)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Description cannot be blank"))
	})

	t.Run("Goal must be no more than 100 characters", func(t *testing.T) {
		cd := CourseDetail{
			CourseName: "บอกลาร่างผม",
			CoverPage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
			Description: "หุ่นดีได้ง่าย ๆ ห่างไกลจากโรคแทรกซ้อน ทำได้ ง่าย ๆ ที่บ้านด้วยตัวเอง",
			Goal: "ร้องไห้ราวกับกำลังแตกสลายไปเลยก็ได้ แต่ทุกครั้งที่ระบายอารมณ์และพักจนพอใจแล้ว อย่าลืมว่าเราสามารถหยิบชิ้นส่วนที่กระจัดกระจายอยู่ มาประกอบร่างสร้างเป็นตัวเรา และใช้ชีวิตต่อไปได้อีกครั้ง", //ผิด
			
		}

		ok, err := govalidator.ValidateStruct(cd)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Goal must be no more than 100 characters"))
	})

	t.Run("check Goal cannot be blank", func(t *testing.T) {
		cd := CourseDetail{
			CourseName: "บอกลาร่างผม",
			CoverPage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
			Description: "หุ่นดีได้ง่าย ๆ ห่างไกลจากโรคแทรกซ้อน ทำได้ ง่าย ๆ ที่บ้านด้วยตัวเอง",
			Goal: "", //ผิด
			
		}

		ok, err := govalidator.ValidateStruct(cd)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Goal cannot be blank"))
	})


}
