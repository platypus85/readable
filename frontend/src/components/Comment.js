import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteComment, upVoteComment, downVoteComment, toggleCommentEdit } from '../actions';
import { getDateString } from '../utils/utilities';
import Voter from './Voter';
import Remarkable from 'remarkable';

class Comment extends Component {
  deleteThisComment() {
    this.props.delete(this.props.comment.id);
  }

  toggleEdit(id) {
    this.props.editComment(id);
  }

  displayMarkdown(rawMarkdown) {
    var md = new Remarkable();
    return { __html: md.render(rawMarkdown) };
  }

  render() {
    return (
      <div>
        <a>
          <i></i>
        </a>
        <div>
          <a>{this.props.comment.author}</a>
          <div>
            <div>{getDateString(this.props.comment.timestamp)}
            </div>
          </div>
          <div
          
            dangerouslySetInnerHTML={this.displayMarkdown(this.props.comment.body)}
          ></div>
          <div>
            <button onClick={() => this.toggleEdit(this.props.comment.id)} className=''>Edit</button>
            <button onClick={() => this.deleteThisComment()} className=''>Delete</button>
          </div>
          <Voter
            item={this.props.comment}
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

  }
}

function mapDispatchToProps(dispatch) {
  return {
    upVote: (data) => dispatch(upVoteComment(data)),
    downVote: (data) => dispatch(downVoteComment(data)),
    delete: (id) => dispatch(deleteComment(id)),
    editComment: (id) => dispatch(toggleCommentEdit(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);