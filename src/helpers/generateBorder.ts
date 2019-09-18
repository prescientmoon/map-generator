import { IVectorArray } from '../types/IVectorArray'

export const generateBorder = (
  width: number,
  height: number,
  density: number,
  offset = 0
) => {
  const result: IVectorArray = []
  const permutations: IVectorArray = [[0, 0], [0, 1], [1, 0], [1, 1]]

  for (const permutation of permutations) {
    const dimenssion = (permutation[0] ? width : height) - 2 * offset

    const getPoint = (value: number): [number, number] => {
      if (permutation[0]) {
        return [value, permutation[1] ? height - offset : offset]
      } else {
        return [permutation[1] ? height - offset : offset, value]
      }
    }

    for (let i = 0; i <= density; i++) {
      result.push(getPoint((i * dimenssion) / density + offset))
    }
  }

  return result
}
