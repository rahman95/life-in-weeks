export interface FormModel {
  lifeExpectancy: number;
  dateOfBirth: string;
  age?: number;
}

export interface ErrorObject {
  [key: string]: string;
}

export interface CanvasItemConstructor {
  xPos: number;
  yPos: number;
  width: number;
  height: number;
  color?: string;
}
