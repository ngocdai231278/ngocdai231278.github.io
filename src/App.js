import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Redux-setup/Store'
import Header from './Shared/Components/Layout/Header'
import Menu from './Shared/Components/Layout/Menu'
import Slider from './Shared/Components/Layout/Slider'
import SideBar from './Shared/Components/Layout/SideBar'
import Footer from './Shared/Components/Layout/Footer'

import Home from "./Pages/Home"
import ProductDetail from './Pages/ProductDetail'
import Category from './Pages/Category'
import Cart from './Pages/Cart'
import Search from './Pages/Search'
import Success from './Pages/Success'
import NotFound from './Pages/NotFound'

import { getCategories } from './Services/Api'

function App() {
  const [categories, setCategories] = React.useState([])

  React.useEffect (() => {
    // data dùng destructing
    getCategories().then(({data}) => {
      setCategories(data.data.docs)
    })
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div id="body">
          <div className="container">
            <Menu data={categories} />
            <div className="row">
              <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                <Slider />
                <Switch>
                  <Route path="/" component={Home} exact />
                  <Route path="/product-detail-:id" component={ProductDetail} exact />
                  <Route path="/category-:id" component={Category} exact />
                  <Route path="/cart-:id" component={Cart} exact />
                  <Route path="/search" component={Search} exact />
                  <Route path="/success" component={Success} exact />
                  <Route path="/404" component={NotFound} exact />
                  <Route render={() => <Redirect to="/404" />} />
                </Switch>
              </div>
              <SideBar />
            </div>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  )
}

export default App