import { WEEKS_IN_YEAR } from "./dateHelper";

class Row {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
}

class Box {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
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
  const w = 1000;
  const h = 1500;

  // find out number of rows needed
  // lifeExpectancy in weeks divide by 52 = rows
  // render rows

  const numberOfRows = lifeExpectancyInWeeks / WEEKS_IN_YEAR;

  let x = 0;
  let y = 50;
  const rows = [];
  for (let i = 0; i < numberOfRows; i++) {
    const row = new Row(x, y, w, 10, "rgb(0,0,255)");
    rows.push(row);

    y += 15;
  }

  //   const rect = new GameCharacter(50, 50, 50, 50, "rgb(0,0,255)");
  //   const rect1 = new GameCharacter(200, 50, 50, 50, "rgb(0,0,255)");
  //   const rect2 = new GameCharacter(350, 50, 50, 50, "rgb(0,0,255)");
  //   const rect3 = new GameCharacter(550, 50, 50, 50, "rgb(0,0,255)");
  //   const rects = [rect, rect1, rect2, rect3];

  const drawRect = function (rect, ctx) {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  };

  const draw = function () {
    ctx.clearRect(0, 0, w, h);
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
