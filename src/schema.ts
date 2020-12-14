import * as yup from "yup";

const formValidationSchema = yup
  .object()
  .shape({
    lifeExpectancy: yup
      .number()
      .min(1)
      .max(100)
      .required("Life expectancy is required"),
    dateOfBirth: yup.string().required("Date of birth is required"),
  })
  .test(
    "test-date-range-valid-for-age",
    "The data is not correct",
    function () {
      // TODO: parse date and see if age < date
      return this.parent.lifeExpectancy && this.parent.dateOfBirth;
    }
  );

const extractErrors = ({ inner }) => {
  return inner.reduce((acc, err) => {
    return { ...acc, [err.path]: err.message };
  }, {});
};

export { formValidationSchema, extractErrors };
