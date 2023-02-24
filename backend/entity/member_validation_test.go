package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestMemberValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("check ProfileUser must be only image", func(t *testing.T) {
		member := Member{
			Firstname:   "Fname1",
			Lastname:    "Lname1",
			Email:       "User1@mail.com",
			Password:    "111111111",
			ProfileUser: "data:image/pdf;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC", // ผิด
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(member)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Profile must be only image"))

	})

	t.Run("check Email cannot be blank", func(t *testing.T) {
		member := Member{
			Firstname:   "Fname1",
			Lastname:    "Lname1",
			Email:       "", // ผิด
			Password:    "111111111",
			ProfileUser: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(member)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Email cannot be blank"))

	})

	t.Run("check Password must be no less than 8 characters long", func(t *testing.T) {
		member := Member{
			Firstname:   "Fname1",
			Lastname:    "Lname1",
			Email:       "hot@mail.com",
			Password:    "1111", // ผิด
			ProfileUser: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
		}
		ok, err := govalidator.ValidateStruct(member)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Password must be no less than 8 characters long"))

	})

	t.Run("check Firstname cannot be blank", func(t *testing.T) {
		member := Member{
			Firstname:   "",
			Lastname:    "Lname1",
			Email:       "hot@mail.com",
			Password:    "111111111", // ผิด
			ProfileUser: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
		}
		ok, err := govalidator.ValidateStruct(member)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Firstname cannot be blank"))

	})

	t.Run("check Lastname cannot be blank", func(t *testing.T) {
		member := Member{
			Firstname:   "Lname1",
			Lastname:    "",
			Email:       "hot@mail.com",
			Password:    "111111111", // ผิด
			ProfileUser: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
		}
		ok, err := govalidator.ValidateStruct(member)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Lastname cannot be blank"))

	})

	t.Run("check Invalid email format", func(t *testing.T) {
		member := Member{
			Firstname:   "Lname1",
			Lastname:    "Lname1",
			Email:       "h",
			Password:    "111111111", // ผิด
			ProfileUser: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
		}
		ok, err := govalidator.ValidateStruct(member)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Invalid email format"))

	})

	t.Run("check Password cannot be blank", func(t *testing.T) {
		member := Member{
			Firstname:   "Fname1",
			Lastname:    "Lname1",
			Email:       "hot@mail.com",
			Password:    "", // ผิด
			ProfileUser: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
		}
		ok, err := govalidator.ValidateStruct(member)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Password cannot be blank"))

	})

	t.Run("check positive", func(t *testing.T) {
		member := Member{
			Firstname:   "Fname1",
			Lastname:    "Lname1",
			Email:       "hot@mail.com",
			Password:    "12345678",
			ProfileUser: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACBUAAAVmC",
		}
		ok, err := govalidator.ValidateStruct(member)

		g.Expect(ok).To(BeTrue())

		g.Expect(err).To(BeNil())

	})
}
