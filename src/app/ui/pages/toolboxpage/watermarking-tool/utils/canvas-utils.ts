// Canvas drawing utilities
import type { WatermarkSettings, CanvasDrawOptions } from "../types"

export const getWatermarkPosition = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  position: WatermarkSettings["position"],
) => {
  const padding = 20
  let x = 0,
    y = 0

  switch (position) {
    case "top-left":
      x = padding
      y = padding
      break
    case "top-right":
      x = canvas.width - width - padding
      y = padding
      break
    case "center":
      x = (canvas.width - width) / 2
      y = (canvas.height - height) / 2
      break
    case "bottom-left":
      x = padding
      y = canvas.height - height - padding
      break
    case "bottom-right":
      x = canvas.width - width - padding
      y = canvas.height - height - padding
      break
  }

  return { x, y }
}

export const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, gridSize = 50): void => {
  ctx.save()
  ctx.strokeStyle = "rgba(0, 0, 0, 0.1)"
  ctx.lineWidth = 1

  for (let x = 0; x <= canvas.width; x += gridSize) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvas.height)
    ctx.stroke()
  }

  for (let y = 0; y <= canvas.height; y += gridSize) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(canvas.width, y)
    ctx.stroke()
  }
  ctx.restore()
}

export const drawImageWatermark = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  watermarkImage: HTMLImageElement,
  settings: WatermarkSettings,
): void => {
  const watermarkSize = (settings.size / 100) * Math.min(canvas.width, canvas.height)
  const aspectRatio = watermarkImage.width / watermarkImage.height
  const watermarkWidth = watermarkSize
  const watermarkHeight = watermarkSize / aspectRatio

  const position = getWatermarkPosition(canvas, watermarkWidth, watermarkHeight, settings.position)

  ctx.save()
  ctx.globalAlpha = settings.opacity / 100

  // Apply rotation if needed
  if (settings.rotation !== 0) {
    const centerX = position.x + watermarkWidth / 2
    const centerY = position.y + watermarkHeight / 2

    ctx.translate(centerX, centerY)
    ctx.rotate((settings.rotation * Math.PI) / 180)
    ctx.translate(-watermarkWidth / 2, -watermarkHeight / 2)

    ctx.drawImage(watermarkImage, 0, 0, watermarkWidth, watermarkHeight)
  } else {
    ctx.drawImage(watermarkImage, position.x, position.y, watermarkWidth, watermarkHeight)
  }

  ctx.restore()
}

export const drawTextWatermark = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  settings: WatermarkSettings,
): void => {
  const fontSize = (settings.fontSize / 100) * Math.min(canvas.width, canvas.height) * 0.1
  ctx.font = `${fontSize}px Arial`

  const textMetrics = ctx.measureText(settings.text)
  const textWidth = textMetrics.width
  const textHeight = fontSize

  const position = getWatermarkPosition(canvas, textWidth, textHeight, settings.position)

  ctx.save()
  ctx.globalAlpha = settings.opacity / 100

  // Apply shadow if enabled
  if (settings.shadow) {
    ctx.shadowColor = settings.shadowColor
    ctx.shadowBlur = settings.shadowBlur
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
  }

  // Apply rotation if needed
  if (settings.rotation !== 0) {
    const centerX = position.x + textWidth / 2
    const centerY = position.y + textHeight / 2

    ctx.translate(centerX, centerY)
    ctx.rotate((settings.rotation * Math.PI) / 180)
    ctx.translate(-textWidth / 2, -textHeight / 2)

    ctx.fillStyle = settings.color
    ctx.fillText(settings.text, 0, 0)
  } else {
    ctx.fillStyle = settings.color
    ctx.fillText(settings.text, position.x, position.y + textHeight)
  }

  ctx.restore()
}

export const clearCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export const drawMainImage = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  options: CanvasDrawOptions = {},
): void => {
  // Set canvas size to match image
  canvas.width = image.width
  canvas.height = image.height

  // Clear canvas
  clearCanvas(ctx, canvas)

  // Draw background if specified
  if (options.backgroundColor) {
    ctx.fillStyle = options.backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  // Draw grid if enabled
  if (options.showGrid) {
    drawGrid(ctx, canvas, options.gridSize)
  }

  // Draw main image
  ctx.drawImage(image, 0, 0)
}
