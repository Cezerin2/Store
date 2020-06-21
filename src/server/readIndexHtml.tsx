import fs from "fs"
import path from "path"
import winston from "winston"

const FILE_PATH = path.resolve("theme/assets/index.html")

let indexHtml: string = ""

try {
  indexHtml = fs.readFileSync(FILE_PATH, "utf8")
} catch (err) {
  winston.error("Fail to read file", FILE_PATH, err)
}

export default indexHtml
