import OpenSimplexNoise from 'open-simplex-noise'

export interface NoiseLayer {
  upperBound: number
  color: [number, number, number, number]
}

export interface NoiseOptions {
  offset: number
  smoothnes: number
  weight: number
}

export const createNoiseDataGenerator = (
  context: CanvasRenderingContext2D,
  width = window.innerWidth,
  height = window.innerHeight,
  timeOffset = 0
) => {
  const openSimplex = new OpenSimplexNoise(Date.now() + timeOffset)

  return (layers: NoiseLayer[], options: NoiseOptions[] = []) => {
    const imageData = context.createImageData(width, height)
    const totalWeight = options.reduce(
      (previous, current) => previous + current.weight,
      0
    )

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const i = (x + y * width) * 4
        const value =
          options.reduce((prev: number, current) => {
            const noise =
              (openSimplex.noise2D(
                (current.offset + x) / current.smoothnes,
                (current.offset + y) / current.smoothnes
              ) +
                1) /
              2

            return prev + current.weight * noise
          }, 0) / totalWeight

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

    const canvas = new OffscreenCanvas(width, height)
    const offscrenContext = canvas.getContext('2d')!

    offscrenContext.putImageData(imageData, 0, 0)

    return () => {
      context.save()
      context.clip()
      context.drawImage(canvas as HTMLCanvasElement, 0, 0, width, height)
      context.restore()
    }
  }
}
