import queryString from "query-string"
import {
  addCartItem,
  cartLayerInitialized,
  changecustomerProperties,
  checkout,
  customerData,
  deleteCartItem,
  fetchMoreProducts,
  fetchPaymentMethods,
  fetchShippingMethods,
  forgotPassword,
  loggedinUserTimeUp,
  loginUser,
  registerUser,
  resetPassword,
  setSort,
  updateCart,
  updateCartItemQuantiry,
} from "./actions"
import { getJSONLD } from "./lib/jsonld"

const setQuery = (
  history: { location: { pathname: string }; push: Function },
  query
) => {
  if (history && history.location) {
    const newLocation = `${history.location.pathname}?${queryString.stringify(
      query
    )}`
    history.push(newLocation)
  }
}

export const mapStateToProps = (state: { app: string }) => ({
  state: state.app,
})

export const mapDispatchToProps = (dispatch: Function, ownProps) => ({
  addCartItem: (item: string) => {
    dispatch(addCartItem(item))
  },
  deleteCartItem: (itemId: string) => {
    dispatch(deleteCartItem(itemId))
  },
  updateCartItemQuantiry: (itemId: string, quantity: string) => {
    dispatch(updateCartItemQuantiry(itemId, quantity))
  },
  updateCart: (data: string, callback: string) => {
    dispatch(updateCart(data, callback))
  },
  loginUser: (data: string, callback: string) => {
    dispatch(loginUser(data, callback))
  },
  loggedinUserTimeUp: (data: string, callback: string) => {
    dispatch(loggedinUserTimeUp(data, callback))
  },
  changecustomerProperties: (data: string, callback: string) => {
    dispatch(changecustomerProperties(data, callback))
  },
  customerData: (data: string, callback: string) => {
    dispatch(customerData(data, callback))
  },
  registerUser: (data: string, callback: string) => {
    dispatch(registerUser(data, callback))
  },
  cartLayerInitialized: (data: string, callback: string) => {
    dispatch(cartLayerInitialized(data, callback))
  },
  forgotPassword: (data: string, callback: string) => {
    dispatch(forgotPassword(data, callback))
  },
  resetPassword: (data: string, callback: string) => {
    dispatch(resetPassword(data, callback))
  },
  checkout: (data: string) => {
    dispatch(checkout(data, ownProps.history))
  },
  loadMoreProducts: () => {
    dispatch(fetchMoreProducts())
  },
  loadShippingMethods: () => {
    dispatch(fetchShippingMethods())
  },
  loadPaymentMethods: () => {
    dispatch(fetchPaymentMethods())
  },
  setSearch: (search: string) => {
    const query = queryString.parse(ownProps.history.location.search)
    query.search = search
    setQuery(ownProps.history, query)
  },
  setSort: (sort: string) => {
    dispatch(setSort(sort))
  },
  setPriceFromAndTo: (priceFrom: string, priceTo: string) => {
    const query = queryString.parse(ownProps.history.location.search)
    query.price_from = priceFrom
    query.price_to = priceTo
    setQuery(ownProps.history, query)
  },
  setPriceFrom: (priceFrom: string) => {
    const query = queryString.parse(ownProps.history.location.search)
    query.price_from = priceFrom
    setQuery(ownProps.history, query)
  },
  setPriceTo: (priceTo: string) => {
    const query = queryString.parse(ownProps.history.location.search)
    query.price_to = priceTo
    setQuery(ownProps.history, query)
  },
  setFilterAttribute: (name: string, value: string) => {
    const query = queryString.parse(ownProps.history.location.search)
    const queryKey = `attributes.${name}`

    if (query[queryKey]) {
      if (Array.isArray(query[queryKey])) {
        query[queryKey].push(value)
      } else {
        query[queryKey] = [query[queryKey], value]
      }
    } else {
      query[queryKey] = [value]
    }

    setQuery(ownProps.history, query)
  },
  unsetFilterAttribute: (name: string, value: string) => {
    const query = queryString.parse(ownProps.history.location.search)
    const queryKey = `attributes.${name}`
    const values = query[queryKey]

    if (values) {
      if (Array.isArray(values)) {
        query[queryKey] = values.filter(v => v !== value)
      } else {
        query[queryKey] = undefined
      }
    }

    setQuery(ownProps.history, query)
  },
  setLocation: (path: string) => {
    ownProps.history.push(path)
  },
  goBack: () => {
    if (ownProps.history.length > 0) {
      ownProps.history.goBack()
    }
  },
  getJSONLD: (state: string) => getJSONLD(state),
})
