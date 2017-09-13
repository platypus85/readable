import React, {Component} from 'react';
import _ from 'lodash';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost, updatePost, fetchCategories, fetchPost} from '../actions';
import uuid from 'uuid';
import {
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

class PostForm extends Component {
  componentDidMount() {
    this
      .props
      .fetchCategories();

    if (this.props.match.params.id) {
      this
        .props
        .fetchPost(this.props.match.params.id);
    }
  }

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
        <Input type="text" placeholder={field.placeholder} {...field.input}/>
        <div className="error-text">
          {touched
            ? error
            : ""}
        </div>
      </FormGroup>
    );
  }

  renderDropdown(field) {
    const {
      meta: {
        touched,
        error
      }
    } = field;

    return (
      <FormGroup>
        <Label>{field.label}</Label>
        <Input type="select" className='ui dropdown' {...field.input}>
          <option value=''>Select a Category</option>
          {_.map(field.categories, cats => {
            return (_.map(cats, cat => {
              return (
                <option value={cat.name} key={cat.name}>{cat.name}</option>
              );
            }));
          })}
        </Input>
        <div className="error-text">
          {touched
            ? error
            : ""}
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
        <Input type="textarea" placeholder={field.placeholder} {...field.input}/>
        <div className="error-text">
          {touched
            ? error
            : ""}
        </div>
      </FormGroup>
    );
  }

  submitForm(values) {
    if (this.props.initialValues) {
      values.id = this.props.initialValues.id;
      this
        .props
        .updatePost(values, () => {
          this
            .props
            .history
            .push('/');
        });
    } else {
      values.id = uuid.v4();
      values.timestamp = Date.now();
      this
        .props
        .createPost(values, () => {
          this
            .props
            .history
            .push('/');
        });
    }
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <div className="container">
        <Form onSubmit={handleSubmit(this.submitForm.bind(this))}>

          <Field
            name='title'
            placeholder='Title'
            className='field'
            component={this.renderTextField}
            label='Title for Post: '/>

          <Field
            name='category'
            className='field'
            component={this.renderDropdown}
            label='Category: '
            categories={this.props.categories}/>

          <Field
            name='author'
            className='field'
            component={this.renderTextField}
            placeholder='Author'
            label='Author: '/>

          <Field
            label='Content: '
            name='body'
            className='field'
            component={this.renderMarkdownField}
            placeholder='Body of post. Markdown allowed.'/>

          <button className='btn btn-success'type='submit'>Submit</button>
          <Link className='btn btn-danger' to='/'>Cancel</Link>
        </Form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Please, enter a title';
  }

  if (!values.category) {
    errors.category = 'Select a category'
  }

  if (!values.author) {
    errors.author = 'Enter an author';
  }

  if (!values.body) {
    errors.body = 'Content is needed';
  }

  return errors;
}

function mapStateToProps(state, ownProps) {
  const match = state.posts[ownProps.match.params.id];

  return {
    post: match
      ? match
      : null,
    categories: state.categories,
    initialValues: match
      ? match
      : null
  }
}

PostForm = reduxForm({validate, form: 'PostForm', enableReinitialize: true})(PostForm);

PostForm = connect(mapStateToProps, {createPost, updatePost, fetchCategories, fetchPost})(PostForm);

export default PostForm;