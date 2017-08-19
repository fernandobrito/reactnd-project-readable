import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import { Item } from "semantic-ui-react";

import {
  votePost, editingPostSelector, changeModalVisibility, handlePostForm, deletePost, startEditingPost
} from "../post/reducer";
import PostPreview from "./PostPreview";
import PostFormModal from "../post/PostFormModal";
import { withRouter } from "react-router-dom";


class PostsPreviewContainer extends Component {
  renderPosts() {
    return (
      <Item.Group divided relaxed>
        {this.props.posts.map(post => this.renderPost(post))}
      </Item.Group>
    );
  }

  renderPost(post) {
    const { id, title, body, author, category,
      timestamp, commentsCount, ...p } = post;

    return (
      <PostPreview
        key={id} id={id} title={title} body={body}
        author={author} score={p.voteScore} category={category}
        count={commentsCount}
        timestamp={timestamp}
        path={`${category}/${id}`}
        showBody={this.props.showBody}
        handleVote={this.props.handlePostVote}
        handleDelete={this.props.handleDelete}
        handleStartEditing={this.props.handleStartEditing}
      />
    );
  }

  render() {
    if (!this.props.isModalOpen && !this.props.posts.length)
      return null;

    return (
      <div>
        {this.renderPosts()}

        <PostFormModal
          show={this.props.isModalOpen}
          post={this.props.editingPost}
          handleForm={this.props.handleForm}
          handleModalVisibility={this.props.handleModalVisibility}
          categories={this.props.categories}
          category={this.props.match.params.category}
        />
      </div>
    )
  }
}

PostsPreviewContainer.propTypes = {
  posts: PropTypes.array.isRequired,
  showBody: PropTypes.bool.isRequired
};

PostsPreviewContainer.defaultProps = {
  showBody: false
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    handlePostVote: votePost,
    handleModalVisibility: changeModalVisibility,
    handleForm: handlePostForm,
    handleDelete: deletePost,
    handleStartEditing: startEditingPost
  }, dispatch)
};

const mapStateToProps = (state, ownProps) => ({
  isModalOpen: state.posts.isModalOpen,
  editingPost: editingPostSelector(state.posts),
  categories: state.categories
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostsPreviewContainer)
);
