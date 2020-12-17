import { WEEKS_IN_YEAR } from "./dateHelper";
import type { CanvasItemConstructor } from "../types";

const CANVAS_HEIGHT = 1500;
const CANVAS_WIDTH = 1000;

const RECT_HEIGHT = 5;
const RECT_WIDTH = 10;
const RECT_X_GAP = 15;
const RECT_Y_GAP = 10;

const COLOR_BLACK = "rgb(42,42,42)";
const COLOR_GREY = "rgb(211,211,211)";

class Rect {
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

  let weekCount = 0;
  let xPos = 0;
  let yPos = 0;
  const rows: Rect[] = [];
  for (let i = 0; i < lifeExpectancyInWeeks; i++) {
    // reset values back
    if (weekCount == WEEKS_IN_YEAR) {
      // update xPos back to start of row and reset weekCount
      weekCount = 0;
      xPos = 0;

      // add gap in between rows
      yPos += RECT_Y_GAP;
    }

    // Change color once iteration passes currentAgeInWeeks
    const color = currentAgeInWeeks > i ? COLOR_BLACK : COLOR_GREY;

    const row = new Rect({
      xPos,
      yPos,
      width: RECT_WIDTH,
      height: RECT_HEIGHT,
      color,
    });
    rows.push(row);

    xPos += RECT_X_GAP;
    weekCount += 1;
  }

  const drawRect = function (rect: Rect, ctx: CanvasRenderingContext2D) {
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
