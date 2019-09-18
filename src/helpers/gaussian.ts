// returns a gaussian random function with the given mean and stdev.
export const gaussianSequence = (
  mean: number,
  standardDeviation: number,
  min = -Infinity,
  max = Infinity,
  absolute = false
) => {
  let y2: number
  let useLast = false

  const generate = (): number => {
    let y1
    if (useLast) {
      y1 = y2
      useLast = false
    } else {
      let x1, x2, w
      do {
        x1 = 2.0 * Math.random() - 1.0
        x2 = 2.0 * Math.random() - 1.0
        w = x1 * x1 + x2 * x2
      } while (w >= 1.0)
      w = Math.sqrt((-2.0 * Math.log(w)) / w)
      y1 = x1 * w
      y2 = x2 * w
      useLast = true
    }

    const result = mean + standardDeviation * y1

    if (result < min || result > max) {
      return generate()
    }

    return absolute ? Math.abs(result) : result
  }

  return generate
}

export const gaussianPlane = (width: number, height: number, sd: number) => {
  const widthSequence = gaussianSequence(width / 2, width / sd, 0, width)
  const heightSequence = gaussianSequence(height / 2, height / sd, 0, height)

  return {
    generate: (count: number) => {
      const result: Array<[number, number]> = []

      for (let index = 0; index < count; index++) {
        result.push([widthSequence(), heightSequence()])
      }

      return result
    }
  }
}
