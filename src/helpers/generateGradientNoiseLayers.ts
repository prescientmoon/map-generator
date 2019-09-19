import { NoiseLayer } from './noise'

export interface NoiseGradientOptions {
  steps: number
  mainIndex: 0 | 1 | 2
  minimumSecondaryColor: number
  maximumSecondaryColor: number
  minimumMainColor: number
  maximumMainColor: number
}

export const defaultNoiseGradientOptions: NoiseGradientOptions = {
  mainIndex: 0,
  minimumSecondaryColor: 0,
  maximumSecondaryColor: 255,
  steps: 10,
  minimumMainColor: 254,
  maximumMainColor: 255
}

export const generateGradientNoiseLayers = (
  partialOptions: Partial<NoiseGradientOptions> = {}
) => {
  const options = { ...defaultNoiseGradientOptions, ...partialOptions }
  const layers: NoiseLayer[] = []
  const stepSize = 1 / options.steps

  const deltaMainColor = options.maximumMainColor - options.minimumMainColor,
    deltaSecondaryColor =
      options.maximumSecondaryColor - options.minimumSecondaryColor

  for (let i = 0; i < options.steps; i++) {
    // we dont need an upperbound to be 0
    const currentStop = stepSize * (i + 1)

    const color = [
      ...Array(3)
        .fill(1)
        .map((_, index) =>
          index === options.mainIndex
            ? options.minimumMainColor + deltaMainColor * stepSize * i
            : options.minimumSecondaryColor + deltaSecondaryColor * stepSize * i
        ),
      255
    ] as [number, number, number, number]

    layers.push({
      upperBound: currentStop,
      color
    })
  }

  return layers
}
