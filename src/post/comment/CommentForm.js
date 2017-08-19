import React  from 'react';

import { Field, reduxForm } from 'redux-form';
import { Form } from "semantic-ui-react";
import { combineValidators, isRequired } from 'revalidate';

import SemanticFormField from "../../shared/SemanticFormField";

const validate = combineValidators({
  body: isRequired('body'),
  author: isRequired('author')
});

let CommentForm = ({ handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="body" component={SemanticFormField} as={Form.TextArea}
        label="Comment" placeholder="Your message" required
      />

      <Field
        name="author" component={SemanticFormField} as={Form.Input}
        label="Author" placeholder="Your name" required
      />
    </Form>
  )
};

CommentForm = reduxForm({
  form: 'comment',
  fields: ['body', 'author'],
  validate
})(CommentForm);

export default CommentForm;
