const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const x = width / 2;
    const y = height / 2;
    const w = width / 3;
    const h = height / 3;

    context.save();
    context.translate(x, y);
    context.rotate(0.3);

    context.beginPath();
    context.rect(-w / 2, -h / 2, w, h);
    context.fill();

    //restore하면 translate가 위치가 초기화됨.
    context.restore();

    context.translate(100, 400);
    context.beginPath();
    context.arc(0, 0, 50, 0, Math.PI * 2);
    context.fill();
  };
};

canvasSketch(sketch, settings);
