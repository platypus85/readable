import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {addComment, editComment, toggleCommentEdit} from '../actions';
import uuid from 'uuid';
import {FormGroup, Label, Input} from 'reactstrap';

class CommentForm extends Component {
  renderTextField(field) {
    const {
      meta: {
        touched,
        error
      }
    } = field;
    
    return (
      <FormGroup>
        <Label>{field.label}</Label>
        <Input 
            className='form-control'
            type='text'
            placeholder={field.placeholder}
            {...field.input}/>
        <div className='error-text'>
          {touched
            ? error
            : ''}
        </div>
      </FormGroup>
    );
  }

  renderMarkdownField(field) {
    const {
      meta: {
        touched,
        error
      }
    } = field;
    

    return (
      <FormGroup>
        <Label>{field.label}</Label>
        <Input type="textarea"placeholder={field.placeholder} {...field.input}/>
        <div className='error-text'>
          {touched
            ? error
            : ''}
        </div>
      </FormGroup>
    );
  }

  submitForm(values) {
    if (this.props.initialValues) {
      values.id = this.props.initialValues.id;
      this
        .props
        .editComment(values);
    } else {
      values.id = uuid.v4();
      values.parentId = this.props.parentId;
      values.timestamp = Date.now();
      this
        .props
        .addComment(values);
      this
        .props
        .reset();
    }

    this
      .props
      .toggleCommentEdit('');
  }

  render() {
    const {handleSubmit, submitting, heading} = this.props;

    return (
      <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
        <div>
          <h3>{heading}</h3>
          <div>
            <Field
              name='author'
              placeholder='Author'
              className='field'
              component={this.renderTextField}
              label='Author: '/>
          </div>
          <div>
            <Field
              name='body'
              placeholder='Comment text, Markdown accepted...'
              className='field'
              component={this.renderMarkdownField}
              label='Comment: '/>
          </div>
          <button className='btn btn-success' type='submit'>
            Submit
          </button>
          <button
            className='btn btn-danger'
            type='button'
            disabled={submitting}
            onClick={() => this.props.toggleCommentEdit('')}>
            Cancel
          </button>
        </div>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.author) {
    errors.author = 'Enter an author';
  }

  if (!values.body) {
    errors.body = 'Your comment needs a body';
  }

  return errors;
}

function mapStateToProps(state, ownProps) {
  return {initialValues: ownProps.comment}
}

CommentForm = reduxForm({validate, form: 'CommentForm', enableReinitialize: true})(CommentForm);

CommentForm = connect(mapStateToProps, {addComment, editComment, toggleCommentEdit})(CommentForm);

export default CommentForm;