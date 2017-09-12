import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { upVotePost, downVotePost, fetchCommentsForPost, deletePost } from '../actions';
import { getDateString } from '../utils/utilities';
import Voter from './Voter';
import * as _ from 'lodash';

class PostSummary extends Component {
  getCommentCount() {
    const commentArray = _.values(this.props.comments);
    return commentArray.filter(comment =>
      comment.parentId === this.props.post.id).length;
  }

  deleteThisPost() {
    console.log('Deleting post ' + this.props.post.id);
    this.props.delete(this.props.post.id,
      () => this.props.onDelete()
    );
  }

  componentDidMount() {
    this.props.fetchCommentsForPost(this.props.post.id);
  }

  render() {
    const commentCount = this.getCommentCount();
    const { category, id, title, author, timestamp } = this.props.post;

    return (     
      <div className='content'>

        <Link className='header' to={`/${category}/${id}`}>
          {title}
        </Link>
        <div className='meta'>
          <span>
            by {author} on {getDateString(timestamp)}
          </span>
        </div>
        <div>
          <Link to={`/edit/post/${id}`} className=''>Edit Post</Link>
          <button onClick={() => this.deleteThisPost()} className='negative ui button'>Delete</button>
        </div>
        <div>
          {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
        </div>
        <div>
          <Voter
            item={this.props.post}
            upVote={this.props.upVote}
            downVote={this.props.downVote}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts[ownProps.postId],
    comments: state.comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    upVote: (data) => dispatch(upVotePost(data)),
    downVote: (data) => dispatch(downVotePost(data)),
    fetchCommentsForPost: (data) => dispatch(fetchCommentsForPost(data)),
    delete: (id, callback) => dispatch(deletePost(id, callback))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostSummary);