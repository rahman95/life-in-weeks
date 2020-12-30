export interface DefaultStore {
  lifeExpectancy: number;
  dateOfBirth: string;
  collapsed: boolean;
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
