import React from 'react';
import PropTypes from 'prop-types';
import { Item, Button } from "semantic-ui-react";
import Timestamp from 'react-timestamp';

import ScoreVote from "../../shared/ScoreVote";

const Comment = (props) => {
  const createdAt = new Date(props.timestamp);

  return (
    <Item>
      <ScoreVote score={props.score} handleVote={props.handleVote} id={props.id} />

      <Item.Content>
        <Button.Group floated="right" compact size="mini">
          <Button
            content="Edit" icon="edit" basic
            color="blue" onClick={() => props.handleStartEditing(props.id)} />

          <Button
            content="Delete" icon="trash" basic
            color="red" onClick={() => props.handleDelete(props.id)} />
        </Button.Group>

        <Item.Header>{props.author}</Item.Header>

        <Item.Description>{props.body}</Item.Description>

        <Item.Extra>
          <em>
            <Timestamp time={createdAt} format="full" style={{ margin: '0' }} />
            {' '}
            (<Timestamp time={createdAt} precision="2" style={{ margin: '0' }} />)
          </em>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  handleVote: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleStartEditing: PropTypes.func.isRequired
};

export default Comment;
