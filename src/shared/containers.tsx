import { connect } from "react-redux"
import { withRouter } from "react-router"
import { mapStateToProps, mapDispatchToProps } from "./containerProps"
import {
  AccountContainer,
  CategoryContainer,
  CheckoutContainer,
  CheckoutSuccessContainer,
  ForgotPasswordContainer,
  IndexContainer,
  LoginContainer,
  NotFoundContainer,
  PageContainer,
  ProductContainer,
  RegisterContainer,
  ResetPasswordContainer,
  SearchContainer,
  SharedContainer,
} from "theme"

export const account = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AccountContainer)
)
export const category = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryContainer)
)
export const checkout = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer)
)
export const heckoutSuccess = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutSuccessContainer)
)
export const forgotPassword = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer)
)
export const index = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(IndexContainer)
)
export const login = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
)
export const notFound = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NotFoundContainer)
)
export const page = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PageContainer)
)
export const product = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductContainer)
)
export const register = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
)
export const resetPassword = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer)
)
export const serach = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
)
export const shared = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SharedContainer)
)
