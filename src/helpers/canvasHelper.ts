import { WEEKS_IN_YEAR } from "./dateHelper";
import type { CanvasItemConstructor } from "../types";

const CANVAS_HEIGHT = 1500;

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
  const parent = canvas.parentElement;

  const rectSizing = rectSizingFromParent(
    parent.offsetWidth,
    lifeExpectancyInWeeks / WEEKS_IN_YEAR
  );

  canvas.width = parent.offsetWidth;
  canvas.height = CANVAS_HEIGHT;

  let weekCount = 0;
  let xPos = 0;
  let yPos = 0;
  let color = COLOR_BLACK;

  const rows: Rect[] = [];
  for (let i = 0; i < lifeExpectancyInWeeks; i++) {
    // reset values back
    if (weekCount == WEEKS_IN_YEAR) {
      // update xPos back to start of row and reset weekCount
      weekCount = 0;
      xPos = 0;

      // add gap in between rows
      yPos += rectSizing.HEIGHT + rectSizing.HEIGHT_GAP;
    }

    // Change color once iteration = currentAgeInWeeks
    if (i == currentAgeInWeeks) {
      color = COLOR_GREY;
    }

    const row = new Rect({
      xPos,
      yPos,
      width: rectSizing.WIDTH,
      height: rectSizing.HEIGHT,
      color,
    });
    rows.push(row);

    xPos += rectSizing.WIDTH + rectSizing.WIDTH_GAP;
    weekCount += 1;
  }

  const drawRect = function (rect: Rect, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.xPos, rect.yPos, rect.width, rect.height);
  };

  const draw = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

const rectSizingFromParent = (parentWidth: number, lifeExpectancy: number) => {
  const widthGap = parentWidth > 1050 ? 5 : 2.5;
  const gapWidthTotal = widthGap * WEEKS_IN_YEAR;
  const width = (parentWidth - gapWidthTotal) / WEEKS_IN_YEAR;

  const height = width * 0.75;
  const totalHeight = height * lifeExpectancy;
  const remainingHeight = CANVAS_HEIGHT - totalHeight;
  const heightGap = remainingHeight / lifeExpectancy;

  return {
    WIDTH: width,
    HEIGHT: height,
    WIDTH_GAP: widthGap,
    HEIGHT_GAP: heightGap,
  };
};

export { renderCanvas };
