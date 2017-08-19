import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Item, Button, Label, Icon, Header } from "semantic-ui-react";
import Timestamp from 'react-timestamp';

import ScoreVote from "../shared/ScoreVote";
import PostCommentsCount from "./PostCommentsCount";

const PostPreview = (props) => {
  const createdAt = new Date(props.timestamp);

  const title = <Header>{props.title}</Header>;

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
            color="red" onClick={() => props.handleDelete(props.id, props.category)} />
        </Button.Group>

        {props.path ?
          <Item.Header as={Link} to={`/${props.path}`}>{title}</Item.Header> :
          <Item.Header>{title}</Item.Header>
        }

        {props.showBody && <Item.Description>{props.body}</Item.Description>}

        <Item.Meta>
          <Label.Group>
            <Label tag color="green" as={Link} to={`/${props.category}`}>
              {props.category}
            </Label>

            {!props.showBody &&
              <PostCommentsCount
                postId={props.id}
                count={props.count}
                path={`/${props.path}`}
              />
            }
          </Label.Group>

          <Label.Group>
            <Label color="blue">
              <Icon name='user' /> &nbsp; {props.author}
            </Label>

            <Label color="grey">
              <Icon name="clock" />
              <Timestamp time={createdAt} format="full" style={{ margin: '0' }} />
            </Label>
          </Label.Group>
        </Item.Meta>
      </Item.Content>
    </Item>
  );
};

PostPreview.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  showBody: PropTypes.bool.isRequired,
  author: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  handleVote: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleStartEditing: PropTypes.func.isRequired,
  path: PropTypes.string
};

PostPreview.defaultProps = {
  showBody: false
};

export default PostPreview;
