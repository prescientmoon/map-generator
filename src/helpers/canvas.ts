export const clear = (
  context: CanvasRenderingContext2D,
  width = window.innerWidth,
  height = window.innerHeight,
  color = 'black'
) => {
  context.fillStyle = color

  context.fillRect(0, 0, width, height)
}

export const createContextCleaner = (context: CanvasRenderingContext2D) => (
  width = window.innerWidth,
  height = window.innerHeight,
  color = 'black'
) => clear(context, width, height, color)

export const resize = (
  canvas: HTMLCanvasElement,
  width = window.innerWidth,
  height = window.innerHeight
) => {
  canvas.width = width
  canvas.height = height
}
