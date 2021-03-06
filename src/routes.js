import { Switch, Route } from "react-router";

import Home from './pages/Home';
import Cart from './pages/Cart';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cart" component={Cart} />
    </Switch>
  );
};

export default Routes;
