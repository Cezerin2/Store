import jwt from "jsonwebtoken"
import serverConfigs from "../../Config"

const cert = serverConfigs.jwtSecretKey
class AuthHeader {
  encodeUserLoginAuth(userId: string) {
    return jwt.sign({ userId }, cert)
  }

  decodeUserLoginAuth(token: string) {
    try {
      return jwt.verify(token, cert)
    } catch (error) {
      return error
    }
  }

  encodeUserPassword(token: string) {
    return jwt.sign({ password: token }, cert)
  }

  decodeUserPassword(token: string) {
    return jwt.verify(token, cert)
  }
}
export default new AuthHeader()
