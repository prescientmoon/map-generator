import { TerritoryOptions, createTerritoyGenerator } from './generateTeritory'
import { generateInChunks } from './efficientGenerating'

export interface Layer {
  chunks: number
  total: number
  options?: Partial<TerritoryOptions>
}

export const executeLayers = async (
  layers: Layer[],
  generate: ReturnType<typeof createTerritoyGenerator>,
  parallel = true
) => {
  for (const layer of layers) {
    if (parallel) {
      generateInChunks(layer.chunks, layer.total, generate, layer.options)
    } else {
      await generateInChunks(layer.chunks, layer.total, generate, layer.options)
    }
  }
}
