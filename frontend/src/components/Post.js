import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import {fetchPost, deletePost, fetchCommentsForPost, sortComments, toggleCommentEdit} from '../actions';
import Comment from './Comment';
import CommentForm from './CommentForm';
import PostDoesNotExist from './PostDoesNotExist';
import PostSummary from './PostSummary';
import Remarkable from 'remarkable';
import sortBy from 'sort-by';
import { Input} from 'reactstrap';

class Post extends Component {
  constructor(props) {
    super(props);

    this.sortChange = this
      .sortChange
      .bind(this);
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this
      .props
      .fetchPost(id);
    this
      .props
      .fetchCommentsForPost(id);
  }

  sortChange(event) {
    this
      .props
      .sortComments(event.target.value);
  }

  displayComments() {
    const orderedComments = _
      .values(this.props.comments)
      .sort(sortBy(this.props.commentSortOrder));

    return _.map(orderedComments, comment => {
      return (
        <div key={comment.id}>
          {comment.id === this.props.commentToEdit
            ? <CommentForm
                parentId={comment.parentId}
                comment={comment}
                heading='Edit Comment'/>
            : <Comment comment={comment}/>
}
        </div>
      );
    });
  }

  deleteThisPost() {
    this
      .props
      .delete(this.props.post.id, () => {
        this
          .props
          .history
          .push('/')
      });
  }

  displayMarkdown(rawMarkdown) {
    var md = new Remarkable();
    return {
      __html: md.render(rawMarkdown)
    };
  }

  render() {
    const {post} = this.props;

    if (!post) {
      return (
        <div><Route component={PostDoesNotExist}/></div>
      )
    }

    return (
      <div className="container">
        <div>
          <h1>Post Details</h1>
          <div>
            <PostSummary
              postId={post.id}
              onDelete={() => {
              this
                .props
                .history
                .push('/')
            }}/>
          </div>
          <h4>Post Content</h4>
          <div>
            <div dangerouslySetInnerHTML={this.displayMarkdown(post.body)}></div>
          </div>
        </div >
        <div >
          <h2>Comments</h2>
          {Object
            .keys(this.props.comments)
            .length > 0
            ? <div>
            <Input
            value={this.props.postSortOrder}
            onChange={this.sortChange}
            type="select"
            name="select"
            id="exampleSelect">
            <option value='-voteScore'>Sort by votes DESC</option>
            <option value='voteScore'>Sort by votes ASC</option>
            <option value='-timestamp'>Sort by date NEW</option>
            <option value='timestamp'>Sort by date OLD</option>
          </Input>
                <div>
                  {this.displayComments()}
                </div>
              </div>
            : <div>
              <h5>Comments not found.</h5>
            </div>}
          <div className='page-action'>
            {this.props.commentToEdit === 'new'
              ? <CommentForm parentId={post.id} heading='Add a Comment'/>
              : <button
                className="btn btn-info"
                onClick={() => this.props.toggleCommentEdit('new')}>
                Add a Comment
              </button>
}
          </div>
        </div>
      </div >
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts[ownProps.match.params.id],
    comments: _.filter(state.comments, {'parentId': ownProps.match.params.id}),
    commentSortOrder: state.sorts.commentSort,
    commentToEdit: state.editing.commentId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (data) => dispatch(fetchPost(data)),
    delete: (id, callback) => dispatch(deletePost(id, callback)),
    fetchCommentsForPost: (data) => dispatch(fetchCommentsForPost(data)),
    sortComments: (data) => dispatch(sortComments(data)),
    toggleCommentEdit: (data) => dispatch(toggleCommentEdit(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);