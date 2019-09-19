import { Delaunay } from 'd3-delaunay'
import { random, choice } from './random'
import { wait } from './wait'
import { generationOutput } from '../constants/generationOutput'

export interface TerritoryGeneratorOptions {
  debug: boolean
  fast: boolean
  fill: (context: CanvasRenderingContext2D) => void
}

export interface TerritoryOptions {
  minimumPoints: number
  maximumPoints: number
  allowCollisions: boolean
  closeAutomatically: boolean
}

export const defaultTerritoryGeneratorOptions: TerritoryGeneratorOptions = {
  debug: false,
  fast: false,
  fill: (context: CanvasRenderingContext2D) => {
    context.fill()
  }
}

export const defaultTerritoryOptions: TerritoryOptions = {
  allowCollisions: false,
  closeAutomatically: true,
  minimumPoints: 3,
  maximumPoints: Infinity
}

export const createTerritoyGenerator = (
  context: CanvasRenderingContext2D,
  delaunay: Delaunay<number[]>,
  partialOptions: Partial<TerritoryGeneratorOptions> = {}
) => {
  const factoryOptions = {
    ...defaultTerritoryGeneratorOptions,
    ...partialOptions
  }

  return async (partialOptions: Partial<TerritoryOptions> = {}) => {
    const options = { ...defaultTerritoryOptions, ...partialOptions }

    const points = delaunay.points
    const visited = new Set<number>()
    const initialIndex = random(points.length / 2)

    let currentIndex = initialIndex
    visited.add(currentIndex)

    context.lineWidth = 3
    context.strokeStyle = 'red'
    // context.fillStyle = 'rgba(0,255,0,0.8)'
    context.beginPath()
    context.moveTo(points[currentIndex * 2], points[currentIndex * 2 + 1])

    while (true) {
      const neighbors = Array.from(delaunay.neighbors(currentIndex)).filter(
        neighbor =>
          options.allowCollisions ||
          !visited.has(neighbor) ||
          neighbor === initialIndex
      )

      if (neighbors.length === 0) {
        break
      }

      const newCurrentIndex =
        options.closeAutomatically &&
        neighbors.includes(initialIndex) &&
        visited.size >= options.minimumPoints
          ? initialIndex
          : choice(neighbors)

      visited.add(newCurrentIndex)
      currentIndex = newCurrentIndex

      context.lineTo(
        points[newCurrentIndex * 2],
        points[newCurrentIndex * 2 + 1]
      )

      if (factoryOptions.debug) {
        context.stroke()

        if (!factoryOptions.fast) {
          await wait(0)
        }
      }

      if (
        visited.size >= options.minimumPoints &&
        visited.size <= options.maximumPoints &&
        newCurrentIndex === initialIndex
      ) {
        context.closePath()
        factoryOptions.fill(context)

        if (!factoryOptions.fast) {
          await wait(0)
        }

        return generationOutput.filled
      }

      if (visited.size >= options.maximumPoints) {
        break
      }
    }

    if (!(factoryOptions.debug || !factoryOptions.fast)) {
      await wait(0)
    }

    return generationOutput.blocked
  }
}
