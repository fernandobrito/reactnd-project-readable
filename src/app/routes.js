import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from "react-router-redux";

import Layout from "./Layout";
import CategoryPageContainer from "../category/CategoryPageContainer";
import PostPageContainer from "../post/PostPageContainer";

class Routes extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history} >
        <Layout>
          <Switch>
            <Route exact path='/' component={CategoryPageContainer} />
            <Route exact path='/:category' component={CategoryPageContainer} />
            <Route exact path='/:category/:postId' component={PostPageContainer} />
          </Switch>
        </Layout>
      </ConnectedRouter>
    );
  }
}

export default Routes;
