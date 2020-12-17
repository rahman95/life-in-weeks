export interface FormModel {
  lifeExpectancy: number;
  dateOfBirth: string;
  age?: number;
}

export interface ErrorObject {
  [key: string]: string;
}
