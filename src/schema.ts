import * as yup from "yup";

const formValidationSchema = yup.object().shape({
  lifeExpectancy: yup
    .number()
    .min(1)
    .max(100)
    .required("Life expectancy is required"),
  dateOfBirth: yup
    .string()
    .test(
      "is-less-or-equal-to-life-expectancy",
      "Age should be less or equal to expected life expactancy",
      function (value) {
        if (value.length == 0) {
          return false;
        }

        const age = getAge(value);
        const lifeExpectancy = this.parent.lifeExpectancy;

        return lifeExpectancy >= age;
      }
    )
    .required("Date of birth is required"),
});

const getAge = (dateString) => {
  const today = new Date();
  const birthDate = new Date(dateString);

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const extractErrors = ({ inner }) => {
  return inner.reduce((acc, err) => {
    return { ...acc, [err.path]: err.message };
  }, {});
};

export { formValidationSchema, extractErrors };
