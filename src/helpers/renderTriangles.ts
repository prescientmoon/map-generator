import { Delaunay } from 'd3-delaunay'

export const renderTriangles = (
  context: CanvasRenderingContext2D,
  delaunay: Delaunay<number[]>
) => {
  const { points, halfedges, triangles } = delaunay

  context.lineWidth = 1
  context.fillStyle = 'white'

  for (let i = 0, n = halfedges.length; i < n; ++i) {
    const j = halfedges[i]
    if (j < i) continue
    const ti = triangles[i]
    const tj = triangles[j]
    context.moveTo(points[ti * 2], points[ti * 2 + 1])
    context.lineTo(points[tj * 2], points[tj * 2 + 1])
  }

  context.stroke()
}
