import { WEEKS_IN_YEAR } from "./dateHelper";

const COLOR_BLACK = "rgb(42,42,42)";
const COLOR_GREY = "rgb(211,211,211)";

class Rect {
  constructor({ xPos, yPos, width, height, color }) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.color = color;
  }
}

const setUpCanvas = (targetCanvasId, width, height, pixelRatio) => {
  const canvas = document.getElementById(targetCanvasId);
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  canvas.getContext("2d").setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  return canvas;
};

const renderCanvas = (
  targetCanvasId,
  currentAgeInWeeks,
  lifeExpectancyInWeeks,
  pixelRatio
) => {
  const parent = document.getElementById(targetCanvasId).parentElement;
  const rectSizing = rectSizingFromParent(
    parent.offsetWidth,
    lifeExpectancyInWeeks / WEEKS_IN_YEAR
  );

  const canvas = setUpCanvas(
    targetCanvasId,
    parent.offsetWidth,
    rectSizing.canvasHeight,
    pixelRatio
  );
  const ctx = canvas.getContext("2d");

  let weekCount = 0;
  let xPos = 0;
  let yPos = 0;
  let color = COLOR_BLACK;

  const rows = [];
  for (let i = 0; i < lifeExpectancyInWeeks; i++) {
    // reset values back
    if (weekCount == WEEKS_IN_YEAR) {
      // update xPos back to start of row and reset weekCount
      weekCount = 0;
      xPos = 0;

      // add gap in between rows
      yPos += rectSizing.height + rectSizing.heightGap;
    }

    // Change color once iteration = currentAgeInWeeks
    if (i == currentAgeInWeeks) {
      color = COLOR_GREY;
    }

    const row = new Rect({
      xPos,
      yPos,
      width: rectSizing.width,
      height: rectSizing.height,
      color,
    });
    rows.push(row);

    xPos += rectSizing.width + rectSizing.widthGap;
    weekCount += 1;
  }

  const drawRect = function (rect, ctx) {
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

const getPixelRatio = () => {
  const ctx = document.createElement("canvas").getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const bsr =
    ctx?.webkitBackingStorePixelRatio ||
    ctx?.mozBackingStorePixelRatio ||
    ctx?.msBackingStorePixelRatio ||
    ctx?.oBackingStorePixelRatio ||
    ctx?.backingStorePixelRatio ||
    1;

  return dpr / bsr;
};

const rectSizingFromParent = (parentWidth, lifeExpectancy) => {
  const widthGap = parentWidth > 1050 ? 5 : 2.5;
  const gapWidthTotal = widthGap * WEEKS_IN_YEAR;
  const width = (parentWidth - gapWidthTotal) / WEEKS_IN_YEAR;

  const height = width * 0.75;
  const totalHeight = height * lifeExpectancy;
  const heightGap = widthGap == 5 ? 8.5 : 3.5;

  const buffer = 25;
  const canvasHeight = buffer + totalHeight + heightGap * lifeExpectancy;

  return {
    width,
    height,
    widthGap,
    heightGap,
    canvasHeight,
  };
};

export { renderCanvas, getPixelRatio };
