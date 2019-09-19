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

interface HTMLCanvasElement extends HTMLElement {
  // ...
  transferControlToOffscreen(): OffscreenCanvas
}

interface OffscreenCanvasRenderingContext2D
  extends CanvasState,
    CanvasTransform,
    CanvasCompositing,
    CanvasImageSmoothing,
    CanvasFillStrokeStyles,
    CanvasShadowStyles,
    CanvasFilters,
    CanvasRect,
    CanvasDrawPath,
    CanvasUserInterface,
    CanvasText,
    CanvasDrawImage,
    CanvasImageData,
    CanvasPathDrawingStyles,
    CanvasTextDrawingStyles,
    CanvasPath {
  readonly canvas: OffscreenCanvas
}
declare var OffscreenCanvasRenderingContext2D: {
  prototype: OffscreenCanvasRenderingContext2D
  new (): OffscreenCanvasRenderingContext2D
}
interface OffscreenCanvas extends EventTarget {
  width: number
  height: number
  getContext(
    contextId: '2d',
    contextAttributes?: CanvasRenderingContext2DSettings
  ): OffscreenCanvasRenderingContext2D | null
}
declare var OffscreenCanvas: {
  prototype: OffscreenCanvas
  new (width: number, height: number): OffscreenCanvas
}
