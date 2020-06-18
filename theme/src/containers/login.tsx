import React from "react"
import Login from "../components/login/index"

const LoginContainer = props => (
  <>
    <section className="section">
      <div className="container">
        <div className="content">
          <Login {...props} />
        </div>
      </div>
    </section>
  </>
)

export default LoginContainer
