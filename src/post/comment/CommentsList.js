import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Item, Icon, Dropdown, Button } from "semantic-ui-react";

import { SORT_BY_OPTIONS } from "./reducer";

import Comment from "./Comment";
import CommentFormModal from "./CommentFormModal";

const CommentsList = (props) => {
  return (
    <section>
      <Grid stackable>
        <Grid.Column width={10}>
          <h2>Comments ({props.comments.length})</h2>
        </Grid.Column>
        <Grid.Column width={4} floated="right" textAlign="right">
          <Icon name='sort' />
          Sort By:
          {' '}
          <Dropdown
            inline header='Sorting criteria'
            options={SORT_BY_OPTIONS} defaultValue={`${props.sortedBy.key}/${props.sortedBy.order}`}
            onChange={(event, data) => props.handleSortBy(data.value)}
          />
        </Grid.Column>
      </Grid>

      <br />

      <Button
        content="Add a new comment" icon="add" basic
        fluid onClick={()=> props.handleModalVisibility(true)}
      />

      <CommentFormModal
        show={props.isModalOpen}
        comment={props.editingComment}
        postId={props.postId}
        handleForm={props.handleForm}
        handleModalVisibility={props.handleModalVisibility}
      />

      <Item.Group divided>
        {props.comments.length ? props.comments.map((comment) => (
          <Comment
            key={comment.id} id={comment.id} body={comment.body}
            author={comment.author} timestamp={comment.timestamp}
            score={comment.voteScore} handleVote={props.handleVote}
            handleDelete={props.handleDelete} handleStartEditing={props.handleStartEditing}
          />
        )) :
        <h3>There are no comments in this post yet. Be the first one to comment something!</h3>}
      </Item.Group>
    </section>
  );
};

CommentsList.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  sortedBy: PropTypes.object.isRequired,
  handleSortBy: PropTypes.func.isRequired,
  handleForm: PropTypes.func.isRequired,
  handleVote: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  editingComment: PropTypes.object,
  handleStartEditing: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  handleModalVisibility: PropTypes.func.isRequired
};

export default CommentsList;
