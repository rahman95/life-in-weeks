import { WEEKS_IN_YEAR } from "./dateHelper";
import type { CanvasItemConstructor } from "../types";

const CANVAS_HEIGHT = 1500;
const CANVAS_WIDTH = 1000;

const ROW_HEIGHT = 10;
const ROW_WIDTH = 1000;
const ROW_GAP = 15;

class RowRect {
  xPos: number;
  yPos: number;
  width: number;
  height: number;
  color: string;

  constructor({ xPos, yPos, width, height, color }: CanvasItemConstructor) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.color = color;
  }
}

const renderCanvas = (
  targetCanvasId: string,
  currentAgeInWeeks: number,
  lifeExpectancyInWeeks: number
) => {
  const canvas = document.getElementById(targetCanvasId) as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  // find out number of rows needed
  // lifeExpectancy in weeks divide by 52 = rows
  // render rows
  const numberOfElapsedRows = currentAgeInWeeks / WEEKS_IN_YEAR;
  const numberOfTotalRows = lifeExpectancyInWeeks / WEEKS_IN_YEAR;

  let xPos = 0;
  let yPos = 50;
  const rows: RowRect[] = [];
  for (let i = 0; i < numberOfTotalRows; i++) {
    const row = new RowRect({
      xPos,
      yPos,
      width: ROW_WIDTH,
      height: ROW_HEIGHT,
      color: "rgb(0,0,255)",
    });
    rows.push(row);

    yPos += ROW_GAP;
  }

  const drawRect = function (rect: RowRect, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.xPos, rect.yPos, rect.width, rect.height);
  };

  const draw = function () {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let i in rows) {
      drawRect(rows[i], ctx);
    }
  };

  const step = function () {
    draw();
    window.requestAnimationFrame(step);
  };

  step();
};

export { renderCanvas };
