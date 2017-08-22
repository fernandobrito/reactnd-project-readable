import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button } from "semantic-ui-react";

import CommentForm from "./CommentForm";

class CommentFormModal extends Component {
  // Submit button is outside <Form /> (because of Modal markup)
  // This method programmatically submits the form.
  submitForm = () => {
    this.form.submit();
  };

  handleModalClose = () => {
    this.props.handleModalVisibility(false)
  };

  renderForm = () => {
    let initialValues;

    if (this.props.comment) {
      initialValues = this.props.comment
    } else {
      initialValues = { postId: this.props.postId };
    }

    return (
      <CommentForm
        ref={form => { this.form = form }}
        onSubmit={this.props.handleForm}
        onSubmitSuccess={this.handleModalClose}
        initialValues={initialValues}
      />
    )
  };

  render() {
    return (
      <Modal
        open={this.props.show} size="tiny"
        onClose={this.handleModalClose}
        closeOnDimmerClick={false}
      >
        <Modal.Header>
          {this.props.comment ?
            'Editing Comment' :
            'Creating Comment'}
        </Modal.Header>
          <Modal.Content>
            {this.renderForm()}
          </Modal.Content>
          <Modal.Actions>
            <Button content='Cancel' onClick={this.handleModalClose} />
            <Button content='Submit' positive onClick={() => this.submitForm()} />
          </Modal.Actions>
      </Modal>
    );
  }
}

CommentFormModal.propTypes = {
  show: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object,
  handleModalVisibility: PropTypes.func.isRequired,
  handleForm: PropTypes.func.isRequired
};

export default CommentFormModal;
