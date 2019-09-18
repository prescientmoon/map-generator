import { Delaunay } from 'd3-delaunay'
import { gaussianPlane } from './helpers/gaussian'
import { generateBorder } from './helpers/generateBorder'
import { createTerritoyGenerator } from './helpers/generateTeritory'
import { createContextCleaner, resize } from './helpers/canvas'
import { renderTriangles } from './helpers/renderTriangles'
import { chunkGenerating } from './helpers/efficientGenerating'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const context = canvas.getContext('2d')!

const addBorder = true,
  debug = false

const islands = 50,
  continents = 8,
  continentChunks = 1,
  islandChunks = 1

const width = window.innerWidth,
  height = window.innerHeight,
  clear = createContextCleaner(context)

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
  clear(width, height, 'blue')

  if (debug) {
    renderTriangles(context, delaunay)
  }

  await chunkGenerating(continentChunks, continents, generateTerritory, {
    allowCollisions: true,
    minimumPoints: 100,
    maximumPoints: 2000
  })
  await chunkGenerating(islandChunks, islands, generateTerritory, {
    allowCollisions: false,
    minimumPoints: 4,
    maximumPoints: 20
  })
}

main()
