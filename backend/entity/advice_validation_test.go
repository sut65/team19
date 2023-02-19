package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestAdviceValid(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("check Advice must be no more than 200 characters", func(t *testing.T) {
		adv := Advice{
			Advice: "เชื่อว่ามีไม่กี่ครั้งหรือไม่กี่คนหรอกที่ทบทวนเสมอว่าวัน ๆ หนึ่ง เราทำอะไรบ้างแต่ก็มีความรู้สึกหนึ่งน่าจะเป็นตัวชี้วัดได้คือ เมื่อใดที่เรารู้สึกว่าวันนี้ผ่านไปเร็วเหลือเกินแสดงว่าเป็นวันหรือช่วงเวลาที่ดีไม่ว่าจะเพราะกำลังมีความสุขหรือในภาวะที่กำลังมุ่งมั่นบางสิ่งอยู่ก็ตามหรือโดยสรุปคือช่วงวันที่เรารู้สึกว่ามีเวลาน้อยไป",  //ผิด
			RecordingDate: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(adv)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Advice must be no more than 200 characters"))
	})

	t.Run("check Advice cannot be blank", func(t *testing.T) {
		adv := Advice{
			Advice: "",  //ผิด
			RecordingDate: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(adv)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Advice cannot be blank"))
	})

	t.Run("RecordingDate must not be in the past", func(t *testing.T) {
		adv := Advice{
			Advice:        "กินโปรตีนเพิ่มให้ได้ 2 g ต่อน้ำหนักตัว 1 kg",
			RecordingDate: time.Date(2002, 1, 1, 12, 00, 00, 00, time.UTC), //ผิด
		}

		ok, err := govalidator.ValidateStruct(adv)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("RecordingDate must be current"))
	})

	t.Run("check RecordingDate must not be in the future", func(t *testing.T) {
		adv := Advice{
			Advice:        "กินโปรตีนเพิ่มให้ได้ 2 g ต่อน้ำหนักตัว 1 kg",
			RecordingDate: time.Date(2024, 1, 1, 12, 00, 00, 00, time.UTC), //ผิด
		}

		ok, err := govalidator.ValidateStruct(adv)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("RecordingDate must be current"))
	})

	t.Run("RecordingDate must be present", func(t *testing.T) {
		adv := Advice{
			Advice:        "กินโปรตีนเพิ่มให้ได้ 2 g ต่อน้ำหนักตัว 1 kg",
			RecordingDate: time.Now(), //ถูก
		}

		ok, err := govalidator.ValidateStruct(adv)

		g.Expect(ok).To(BeTrue())

		g.Expect(err).To(BeNil())
	})

}