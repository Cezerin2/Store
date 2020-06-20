import cookieParser from "cookie-parser"
import express from "express"
import helmet from "helmet"
import responseTime from "response-time"
import winston from "winston"
import pageRendering from "./pageRendering"
import redirects from "./redirects"
import robotsRendering from "./robotsRendering"
import settings from "./settings"
import sitemapRendering from "./sitemapRendering"

const app = express()

const STATIC_OPTIONS = {
  maxAge: 31536000000, // One year
}

app.set("trust proxy", 1)
app.use(helmet())
app.use(express.static("public/content", STATIC_OPTIONS))
app.use("/assets", express.static("theme/assets", STATIC_OPTIONS))
app.use("/sw.js", express.static("theme/assets/sw.js"))
app.get(
  /^.+\.(jpg|jpeg|gif|png|bmp|ico|webp|svg|css|js|zip|rar|flv|swf|xls)$/,
  (req, res) => {
    res.status(404).end()
  }
)
app.get("/robots.txt", robotsRendering)
app.get("/sitemap.xml", sitemapRendering)
app.get("*", redirects)
app.use(responseTime())
app.use(cookieParser(settings.cookieSecretKey))
app.get("*", pageRendering)

const server = app.listen(settings.storeListenPort, () => {
  const serverAddress = server.address()
  winston.info(`Store running at http://localhost:${serverAddress.port}`)
})
