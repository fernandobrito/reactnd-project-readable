import React, { Component } from 'react'
import { NavLink, withRouter } from "react-router-dom";
import { retrieveAll } from "../category/reducer";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import { Sidebar, Segment, Menu, Icon, Header } from 'semantic-ui-react'
import ReduxToastr from 'react-redux-toastr'

class Layout extends Component {
  componentDidMount() {
    this.props.retrieveAll();
  }

  renderCategoryIcon(category) {
    return (
      <Menu.Item as={NavLink} to={`/${category.path}`} name={category.path} key={category.path}>
        <Icon name='book' />
        {category.name}
      </Menu.Item>
    )
  }

  render() {
    return (
      <div className="App">
        <Sidebar as={Menu} animation='uncover' width='thin' visible icon='labeled' vertical inverted className="App-Sidebar">
          <Menu.Item as={NavLink} to='/' name='home' exact>
            <Icon name='home' />
            Home
          </Menu.Item>

          {this.props.categories.map(category => (
            this.renderCategoryIcon(category)
          ))}
        </Sidebar>

        <Segment className="App-Content" basic>
          <Segment color="blue">
            <Header as='h1'>Readable: a content and comment web app</Header>
          </Segment>

          {this.props.children}
        </Segment>

        <ReduxToastr
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ retrieveAll }, dispatch)
};

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
