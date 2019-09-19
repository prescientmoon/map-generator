import OpenSimplexNoise from 'open-simplex-noise'

export interface NoiseLayer {
  upperBound: number
  color: [number, number, number, number]
}

export interface NoiseOptions {
  chunkSize: [number, number]
  smoothnes: number
}

export const defaultNoiseOptions: NoiseOptions = {
  chunkSize: [1, 1],
  smoothnes: 100
}

export const createNoiseDataGenerator = (
  context: CanvasRenderingContext2D,
  width = window.innerWidth,
  height = window.innerHeight
) => {
  const openSimplex = new OpenSimplexNoise(Date.now())

  return (layers: NoiseLayer[], partialOptions: Partial<NoiseOptions> = {}) => {
    const options = { ...defaultNoiseOptions, ...partialOptions }

    const imageData = context.createImageData(width, height)

    for (let x = 0; x < width; x += options.chunkSize[0]) {
      for (let y = 0; y < height; y += options.chunkSize[1]) {
        const i = (x + y * width) * 4
        const value =
          (openSimplex.noise2D(x / options.smoothnes, y / options.smoothnes) +
            1) /
          2

        let color: NoiseLayer['color'] = [0, 0, 0, 255]

        for (const layer of layers) {
          if (layer.upperBound >= value) {
            color = layer.color

            break
          }
        }

        imageData.data[i] = color[0]
        imageData.data[i + 1] = color[1]
        imageData.data[i + 2] = color[2]
        imageData.data[i + 3] = color[3]
      }
    }

    // context.drawImage(imageData,0)

    const canvas = new OffscreenCanvas(width, height)
    const offscrenContext = canvas.getContext('2d')!

    offscrenContext.putImageData(imageData, 0, 0)

    return () => {
      context.clip()
      context.drawImage(canvas as HTMLCanvasElement, 0, 0, width, height)
    }
  }
}
