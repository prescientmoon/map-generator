import { Delaunay } from 'd3-delaunay'
import { gaussianPlane } from './helpers/gaussian'
import { generateBorder } from './helpers/generateBorder'
import { createTerritoyGenerator } from './helpers/generateTeritory'
import { createContextCleaner, resize } from './helpers/canvas'
import { renderTriangles } from './helpers/renderTriangles'
import { Layer, executeLayers } from './helpers/executeLayers'
import {
  createNoiseDataGenerator,
  NoiseLayer,
  NoiseOptions
} from './helpers/noise'
import { generateGradientNoiseLayers } from './helpers/generateGradientNoiseLayers'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const context = canvas.getContext('2d')!

context.globalAlpha = 0.5
// context.globalCompositeOperation = 'lighter'

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

const waterNoiseOptions: NoiseOptions[] = [
    {
      smoothnes: 300,
      offset: 0,
      weight: 1
    }
  ],
  landNoiseOptions: NoiseOptions[] = [
    {
      smoothnes: 10,
      offset: 0,
      weight: 1
    },
    {
      smoothnes: 100,
      offset: 1000,
      weight: 4
    },
    {
      smoothnes: 50,
      offset: 2000,
      weight: 2
    }
  ],
  steps = 20

// different offsets
const generateWaterNoise = createNoiseDataGenerator(context, width, height),
  generateLandNoise = createNoiseDataGenerator(context, width, height, 1000)

const waterLayers = generateGradientNoiseLayers({
  minimumSecondaryColor: 0,
  maximumSecondaryColor: 120,

  mainIndex: 2,
  steps
})

const landLayers = generateGradientNoiseLayers({
  minimumSecondaryColor: 0,
  maximumSecondaryColor: 30,

  minimumMainColor: 128,
  maximumMainColor: 200,

  mainIndex: 1,
  steps
})

const water = generateWaterNoise(waterLayers, waterNoiseOptions)
const land = generateLandNoise(landLayers, landNoiseOptions)

resize(canvas, width, height)

const sequence = gaussianPlane(width, height, 5),
  points = sequence
    .generate(10000)
    .concat(...(addBorder ? generateBorder(width, height, 10, 0) : [])),
  delaunay = Delaunay.from(points)

const generateTerritory = createTerritoyGenerator(context, delaunay, {
  debug,
  fast: true,
  fill: land
})

const main = async () => {
  // clear(width, height)
  context.beginPath()
  context.rect(0, 0, width, height)
  water()

  if (debug) {
    renderTriangles(context, delaunay)
  }

  executeLayers(layers, generateTerritory, false)
}

main()
