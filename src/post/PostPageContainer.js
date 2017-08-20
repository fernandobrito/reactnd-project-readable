import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { retrievePost } from "./reducer";
import { postSelector } from "./reducer";

import { push } from 'react-router-redux';

import PostPage from "./PostPage";

class CategoryPageContainer extends Component {
  componentDidMount() {
    this.props.retrievePost(this.props.match.params.postId);
  }

  componentWillReceiveProps(nextProps) {
    // Post was deleted. Redirect user to category page
    if (this.props.post && nextProps.post === undefined) {
      alert("deleted");
      this.props.redirectTo(`/${this.props.post.category}`);
    }
  }

  render() {
    if (!this.props.post)
      return null;

    return (
      <PostPage post={this.props.post} />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    retrievePost,
    redirectTo: path => push(path)
  }, dispatch)
};

const mapStateToProps = (state, ownProps) => ({
  post: postSelector(state.posts, ownProps.match.params.postId)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryPageContainer)
);
