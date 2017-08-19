import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import CategoryPage from "./CategoryPage";
import {
  retrieveFromCategory, postsSelector, sortPostsBy, changeModalVisibility
} from "../post/reducer";

class CategoryPageContainer extends Component {
  getCategory() {
    return this.props.match.params.category;
  }

  componentDidMount() {
    this.retrieveData(this.getCategory());
  }

  /*
   * When we change categories. react-router doesn't re-mount the component.
   * instead, it just update the props. So, we also have to hook our method on
   * componentDidUpdate(). In order to avoid infinite loops, we check if category
   * has changed
   */
  componentWillReceiveProps(nextProps) {
    if (this.getCategory() !== nextProps.match.params.category) {
      this.retrieveData(nextProps.match.params.category);
    }
  }

  retrieveData(path) {
    this.props.retrieveFromCategory(path);
  }

  /*
   * Form will call function below with 'voteScore/asc',
   * but reducer expects ('voteScore', 'asc')
   */
  handleSortByForm = (value) => {
    this.props.sortPostsBy(...value.split('/'))
  };

  render() {
    const path = this.getCategory();

    return (
      this.props.posts ?
        <CategoryPage
          name={path}
          posts={this.props.posts}
          sortedBy={this.props.sortedBy}
          handleSortBy={this.handleSortByForm}
          handleModalVisibility={this.props.handleModalVisibility}
        />
        : null
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    retrieveFromCategory,
    sortPostsBy,
    handleModalVisibility: changeModalVisibility
  }, dispatch)
};

const mapStateToProps = (state) => ({
  posts: postsSelector(state.posts),
  sortedBy: state.posts.sortBy
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryPageContainer)
);
