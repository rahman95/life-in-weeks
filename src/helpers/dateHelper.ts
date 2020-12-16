const WEEKS_IN_YEAR = 52;

const getAge = (dateString: string): number => {
  const today = new Date();
  const birthDate = new Date(dateString);

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const getAgeInWeeks = (age: number): number => {
  return age * WEEKS_IN_YEAR;
};

export { getAge, getAgeInWeeks };
