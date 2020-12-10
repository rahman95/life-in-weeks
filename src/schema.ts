import * as yup from "yup";

const formValidationSchema = yup.object().shape({
  lifeExpectancy: yup
    .number()
    .min(1)
    .max(100)
    .required("Life expectancy is required"),
  dateOfBirth: yup.string().required("Date of birth is required"),
});

const extractErrors = ({ inner }) => {
  return inner.reduce((acc, err) => {
    return { ...acc, [err.path]: err.message };
  }, {});
};

export { formValidationSchema, extractErrors };
