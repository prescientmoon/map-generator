export const distance = (a: [number, number], b: [number, number]) =>
  Math.sqrt((a[0] - b[0]) ** 2 + (a[0] - b[0]) ** 2)

export const getClosestPoint = (
  points: number[],
  position: [number, number]
) => {
  let minDistance = distance([points[0], points[1]], position)
  let currentIndex = 0

  for (let i = 2; i < points.length; i += 2) {
    const x = points[i]
    const y = points[i + 1]

    const d = distance(position, [x, y])

    if (d < minDistance) {
      minDistance = d
      currentIndex = i / 2
    }
  }

  return currentIndex
}
