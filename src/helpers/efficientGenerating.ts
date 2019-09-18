import { TerritoryOptions, createTerritoyGenerator } from './generateTeritory'
import { generationOutput } from '../constants/generationOutput'

export const generateInChunks = (
  chunks: number,
  total: number,
  generateTerritory: ReturnType<typeof createTerritoyGenerator>,
  options: Partial<TerritoryOptions> = {}
) => {
  const r = total % chunks
  const chunkSize = total - r

  return Promise.all(
    Array(chunks)
      .fill(1)
      .map(async (_, index) => {
        const target = chunkSize + (index === chunks - 1 ? r : 0)
        let countryCount = 0

        do {
          const result = await generateTerritory(options)

          if (result === generationOutput.filled) {
            countryCount++
          }
        } while (countryCount < target)
      })
  )
}
