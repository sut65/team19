package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบค่าว่างของชื่อแล้วต้องเจอ Error
func TestTrainerNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	trainer := Trainer{
		Name:       "",
		University: "SUT",
		Gpax:       3.83,
		Gender:     "ชาย",
		Age:        21,
		Address:    "90/8 บ.โคกก่อง",
		Email:      "Aonaon_123@gmail.com",
		Password:   "123456",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(trainer)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Name cannot be blank"))
}

func TestEmailMustBeValid(t *testing.T) {
	g := NewGomegaWithT(t)

	trainer := Trainer{
		Name:       "Aon",
		University: "SUT",
		Gpax:       3.83,
		Gender:     "ชาย",
		Age:        21,
		Address:    "90/8 บ.โคกก่อง",
		Email:      "",
		Password:   "123456",
	}

	ok, err := govalidator.ValidateStruct(trainer)

	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("Email cannot be blank"))
}

func TestEmailFormCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	trainer := Trainer{
		Name:       "Aon",
		University: "SUT",
		Gpax:       3.83,
		Gender:     "ชาย",
		Age:        21,
		Address:    "90/8 บ.โคกก่อง",
		Email:      "s9ei7r8945",
		Password:   "123456",
	}

	ok, err := govalidator.ValidateStruct(trainer)

	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("Invalid email format"))
}

func TestEmailMaxLength(t *testing.T) {
	g := NewGomegaWithT(t)

	trainer := Trainer{
		Name:       "Aon",
		University: "SUT",
		Gpax:       3.83,
		Gender:     "ชาย",
		Age:        21,
		Address:    "90/8 บ.โคกก่อง",
		Email:      "aonaonaonaon1234567890@gmail.com", //32
		Password:   "1234567",
	}

	ok, err := govalidator.ValidateStruct(trainer)

	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("must be no more than 20 characters long"))
}

func TestUniversityNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	trainer := Trainer{
		Name:       "Aon",
		University: "",
		Gpax:       3.83,
		Gender:     "ชาย",
		Age:        21,
		Address:    "90/8 บ.โคกก่อง",
		Email:      "Aon@mail.com",
		Password:   "123456",
	}

	ok, err := govalidator.ValidateStruct(trainer)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("University cannot be blank"))

}

func TestGpaxMustbeGpax(t *testing.T) {
	g := NewGomegaWithT(t)

	trainer := Trainer{
		Name:       "Aon",
		University: "aweawe",
		Gpax:       4.01,
		Gender:     "ชาย",
		Age:        21,
		Address:    "90/8 บ.โคกก่อง",
		Email:      "Aon@mail.com",
		Password:   "123456",
	}

	ok, err := govalidator.ValidateStruct(trainer)

	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal(fmt.Sprintf("Gpax must be between 0-4")))

}

func TestGenderNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	trainer := Trainer{
		Name:       "Aonmaon",
		University: "SUT",
		Gpax:       3.83,
		Gender:     "",
		Age:        21,
		Address:    "90/8 บ.โคกก่อง",
		Email:      "Aonaon_123@gmail.com",
		Password:   "123456",
	}

	ok, err := govalidator.ValidateStruct(trainer)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("Gender cannot be blank"))
}

func TestAgeMustbeNumber(t *testing.T) {
	g := NewGomegaWithT(t)

	trainer := Trainer{
		Name:       "Aon",
		University: "aweawe",
		Gpax:       3.33,
		Gender:     "ชาย",
		Age:        -1,
		Address:    "90/8 บ.โคกก่อง",
		Email:      "Aon@mail.com",
		Password:   "123456",
	}

	ok, err := govalidator.ValidateStruct(trainer)

	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("Age must be positive integer"))

}

func TestAddressNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	trainer := Trainer{
		Name:       "aonaon",
		University: "SUT",
		Gpax:       3.83,
		Gender:     "ชาย",
		Age:        21,
		Address:    "",
		Email:      "Aonaon_123@gmail.com",
		Password:   "123456",
	}

	ok, err := govalidator.ValidateStruct(trainer)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("Adrress cannot be blank"))
}

func TestPasswordNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	trainer := Trainer{
		Name:       "aonaon",
		University: "SUT",
		Gpax:       3.83,
		Gender:     "ชาย",
		Age:        21,
		Address:    "Ubon",
		Email:      "Aonaon_123@gmail.com",
		Password:   "",
	}
	ok, err := govalidator.ValidateStruct(trainer)

	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("Password cannot be blank"))
}

func TestPasswordMaxLength(t *testing.T) {
	g := NewGomegaWithT(t)

	trainer := Trainer{
		Name:       "aonaon",
		University: "SUT",
		Gpax:       3.83,
		Gender:     "ชาย",
		Age:        21,
		Address:    "Ubon",
		Email:      "Aonaon_123@gmail.com",
		Password:   "123456789012345678901",
	}
	ok, err := govalidator.ValidateStruct(trainer)

	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("Password must be no more than 20 characters long"))
}