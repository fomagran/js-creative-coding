const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const Tweakpane = require('tweakpane')

const settings = {
  dimensions: [2048, 2048],
  animate: true
};

const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  frame: 0,
  animate: true,
  lineCap: 'butt'
}

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = params.cols
    const rows = params.rows
    const numCells = cols * rows

    const gridW = width * 0.8
    const gridH = height * 0.8
    const cellW = gridW / cols
    const cellH = gridH / rows
    const marginX = (width - gridW) * 0.5
    const marginY = (height - gridH) * 0.5

    for (let i = 0; i < numCells; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)

      const x = col * cellW
      const y = row * cellH
      const w = cellW * 0.8
      const h = cellH * 0.8

      const f = params.animate ? frame : params.frame

      const n = random.noise2D(x + f * 10, y, params.freq)
      const angle = n * Math.PI * params.amp
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax)

      context.save()
      context.translate(x, y)
      context.translate(marginX, marginY)
      context.translate(cellW * 0.5, cellH * 0.5)

      context.rotate(angle)
      context.lineWidth = scale
      context.lineCap = params.lineCap
      context.beginPath()
      context.moveTo(w * -0.5, 0)
      context.lineTo(w * 0.5, 0)
      context.stroke()
      context.restore()
    }
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane()
  let folder;

  folder = pane.addFolder({ title: 'Grid' })
  folder.addInput(params,'lineCap',{options:{butt:'butt',round:'round',square:'square'}})
  folder.addInput(params, 'cols', { min: 2, max: 50, step: 1 })
  folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 })
  folder.addInput(params, 'scaleMin', { min: 1, max: 100 })
  folder.addInput(params, 'scaleMax', { min: 1, max: 100 })
  folder = pane.addFolder({ title: 'Noise' })
  folder.addInput(params, 'freq', { min: -0.01, max: .01 })
  folder.addInput(params, 'amp', { min: 0, max: 1 })
  folder.addInput(params, 'animate')
  folder.addInput(params, 'frame', { min: 0, max: 999 })
}

createPane()
canvasSketch(sketch, settings);
