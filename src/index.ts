import { Delaunay } from 'd3-delaunay'
import { gaussianPlane } from './helpers/gaussian'
import { generateBorder } from './helpers/generateBorder'
import { createTerritoyGenerator } from './helpers/generateTeritory'
import { createContextCleaner, resize } from './helpers/canvas'
import { renderTriangles } from './helpers/renderTriangles'
import { Layer, executeLayers } from './helpers/executeLayers'
import { createNoiseDataGenerator, NoiseLayer } from './helpers/noise'
import { generateGradientNoiseLayers } from './helpers/generateGradientNoiseLayers'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const context = canvas.getContext('2d')!

context.globalAlpha = 0.5
context.globalCompositeOperation = 'lighter'

const addBorder = true,
  debug = false

const layers: Layer[] = [
  {
    chunks: 1,
    total: 8,
    options: {
      allowCollisions: true,
      minimumPoints: 100,
      maximumPoints: 2000
    }
  },
  {
    chunks: 1,
    total: 50,
    options: {
      allowCollisions: false,
      minimumPoints: 4,
      maximumPoints: 20
    }
  }
]

const width = window.innerWidth,
  height = window.innerHeight

const generateNoise = createNoiseDataGenerator(context, width, height)
const waterLayers = generateGradientNoiseLayers(20, 2, 120)

const water = generateNoise(waterLayers, {
  chunkSize: [1, 1],
  smoothnes: 300
})

resize(canvas, width, height)

const sequence = gaussianPlane(width, height, 5),
  points = sequence
    .generate(10000)
    .concat(...(addBorder ? generateBorder(width, height, 10, 0) : [])),
  delaunay = Delaunay.from(points)

const generateTerritory = createTerritoyGenerator(context, delaunay, {
  debug,
  fast: true
})

const main = async () => {
  // clear(width, height)
  context.beginPath()
  context.rect(0, 0, width, height)
  water()

  if (debug) {
    renderTriangles(context, delaunay)
  }

  executeLayers(layers, generateTerritory, true)
}

main()
