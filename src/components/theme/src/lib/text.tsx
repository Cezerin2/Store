import Config from "../config"
import Languages from "./locales"

const { de, en, en_US, fr, it, pt_BR, ru, si, ta, uk, zh_CN } = Languages

const lang = Config.language
let selected = en_US

switch (lang) {
  case "de":
    selected = de
    break
  case "en":
    selected = en
    break
  case "en_US":
    selected = en_US
    break
  case "fr":
    selected = fr
    break
  case "it":
    selected = it
    break
  case "pt_BR":
    selected = pt_BR
    break
  case "ru":
    selected = ru
    break
  case "si":
    selected = si
    break
  case "ta":
    selected = ta
    break
  case "uk":
    selected = uk
    break
  case "zh_CN":
    selected = zh_CN
    break

  default:
    console.warn("Invalid language selected!")
    selected = en_US
    break
}

const APPLICATION_TEXT = selected

export default APPLICATION_TEXT
