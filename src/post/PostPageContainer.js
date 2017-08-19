import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { retrievePost } from "./reducer";
import { postSelector } from "./reducer";

import PostPage from "./PostPage";

class CategoryPageContainer extends Component {
  componentDidMount() {
    this.props.retrievePost(this.props.match.params.postId);
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
    retrievePost
  }, dispatch)
};

const mapStateToProps = (state, ownProps) => ({
  post: postSelector(state.posts, ownProps.match.params.postId),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryPageContainer)
);
