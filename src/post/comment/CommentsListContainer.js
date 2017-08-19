import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import {
  commentsSelector, retrieveComments, sortCommentsBy, editingCommentSelector,
  deleteComment, voteComment, handleCommentForm, changeModalVisibility, startEditingComment
} from "./reducer"

import CommentsList from "./CommentsList";

class CommentsListContainer extends Component {
  componentDidMount() {
    this.props.retrieveComments(this.props.postId);
  }

  /*
  * Form will call function below with 'voteScore/asc',
  * but reducer expects ('voteScore', 'asc')
  */
  handleSortByForm = (value) => {
    this.props.handleSortBy(...value.split('/'))
  };

  render() {
    return (
      <CommentsList
        postId={this.props.postId}
        comments={this.props.comments}
        sortedBy={this.props.sortedBy}
        handleSortBy={this.handleSortByForm}
        handleVote={this.props.handleVote}
        handleForm={this.props.handleForm}
        handleDelete={this.props.handleDelete}
        isModalOpen={this.props.isModalOpen}
        handleModalVisibility={this.props.handleModalVisibility}
        handleStartEditing={this.props.handleStartEditing}
        editingComment={this.props.editingComment}
      />
    )
  }
}

CommentsListContainer.propTypes = {
  postId: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    retrieveComments,
    handleVote: voteComment,
    handleSortBy: sortCommentsBy,
    handleForm: handleCommentForm,
    handleModalVisibility: changeModalVisibility,
    handleDelete: deleteComment,
    handleStartEditing: startEditingComment
  }, dispatch)
};

const mapStateToProps = (state, ownProps) => ({
  comments: commentsSelector(state.comments),
  sortedBy: state.comments.sortBy,
  isModalOpen: state.comments.isModalOpen,
  editingComment: editingCommentSelector(state.comments)
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsListContainer);
