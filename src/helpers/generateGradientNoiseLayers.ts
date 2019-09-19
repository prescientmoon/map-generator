import { NoiseLayer } from './noise'

export const generateGradientNoiseLayers = (
  steps: number,
  mainIndex: 0 | 1 | 2,
  maxSecondaryColor: number
) => {
  const layers: NoiseLayer[] = []
  const stepSize = 1 / steps

  for (let i = 0; i < steps; i++) {
    // we dont need an upperbound to be 0
    const currentStop = stepSize * (i + 1)

    const color = [
      ...Array(3)
        .fill(1)
        .map((_, index) =>
          index === mainIndex ? 255 : currentStop * maxSecondaryColor
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
