import React from 'react';
import PropTypes from 'prop-types';
import { Statistic, Button } from "semantic-ui-react";

const ScoreVote = (props) => {
  return (
    <div style={{ marginRight: '1em' }}>
      <Button
        attached="top" size="mini" icon="plus" compact
        onClick={() => props.handleVote(props.id, 'upVote')}
      />
      <Statistic
        value={props.score}
        style={{ margin: '0.5em 0', minWidth: '30px' }}
        color={props.score >= 0 ? 'black' : 'red'}
        size="mini" />
      <Button
        attached="bottom" size="mini" icon="minus" compact
        onClick={() => props.handleVote(props.id, 'downVote')}
      />
    </div>
  );
};

ScoreVote.propTypes = {
  id: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  handleVote: PropTypes.func.isRequired
};

export default ScoreVote;
