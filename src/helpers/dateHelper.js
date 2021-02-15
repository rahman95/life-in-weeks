const WEEKS_IN_YEAR = 52;

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

const getAgeInWeeks = (age) => {
  return age * WEEKS_IN_YEAR;
};

const getWeeksFromDoB = (dateString) => {
  const dateOfBirth = new Date(dateString);
  const now = new Date();
  const diff = Math.round(Number(now) - Number(dateOfBirth));

  return Math.round(diff / 1000 / 60 / 60 / 24 / 7);
};

export { getAge, getAgeInWeeks, getWeeksFromDoB, WEEKS_IN_YEAR };
