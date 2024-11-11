import * as PImage from "pureimage"
import { PassThrough } from "node:stream"

export default defineEventHandler((event) => {
  const {width, height} = getRouterParams(event)

  // generate a placeholder image server-side
  const image = generatePlaceholderImage(width, height)

  setResponseHeader(event, "Content-Type", "image/png")
  const passThroughStream = new PassThrough()
  const pngData = []
  passThroughStream.on("data", (chunk) => pngData.push(chunk))
  passThroughStream.on("end", () => {
  })

  return PImage.encodePNGToStream(image, passThroughStream).then(() => {
    let buf = Buffer.concat(pngData)
    return buf
  })
})

function generatePlaceholderImage(width: number, height: number) {
  const image = PImage.make(width, height)
  const ctx = image.getContext("2d")

  ctx.fillStyle = "#f0f0f0"
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = "#000000"
  ctx.fillText(`${width}x${height}`, 0, 0)

  return image
}