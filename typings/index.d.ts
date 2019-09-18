declare module 'poisson-disk-sampling' {
  class PoissonDiskSampling {
    public constructor(
      shape: number[],
      min: number,
      max?: number,
      tries?: number
    )

    public fill(): void
    public reset(): void
    public getAllPoints(): number[][]
  }

  export default PoissonDiskSampling
}
