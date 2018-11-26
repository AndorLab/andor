import * as React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
// import NoMatch from './components/NoMatch'
import Loading from '../components/Loading'
import DynamicImport from '../components/DynamicImport'

const Pages = () => {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={Index} />
          {/* <Route path='/login' component={LoginPage} />
          <Route path='/map' component={Map} />
          <Route path='/demo' component={AppComponent} />
          <Route path='/routerTest' component={RouterTest} />
          <Route path='/admin' component={Admin} /> */}
          {/* <Route component={NoMatch} /> */}
        </Switch>
    </Router>
  )
}

export default Pages

// 路由： App
const Index = (props) => (
  <DynamicImport load={() => import('./pages/Index/index')}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

// 路由： App
// const AppComponent = (props) => (
//   <DynamicImport load={() => import('@pages/Demo/index')}>
//     {(Component: any) => Component === null
//       ? <Loading />
//       : <Component {...props} />}
//   </DynamicImport>
// )