import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteComment, upVoteComment, downVoteComment, toggleCommentEdit} from '../actions';
import {getDateString} from '../utils/utilities';
import Voter from './Voter';
import Remarkable from 'remarkable';
import {Card, CardHeader, CardFooter, CardBlock} from 'reactstrap';

class Comment extends Component {
  deleteThisComment() {
    this
      .props
      .delete(this.props.comment.id);
  }

  toggleEdit(id) {
    this
      .props
      .editComment(id);
  }

  displayMarkdown(rawMarkdown) {
    var md = new Remarkable();
    return {
      __html: md.render(rawMarkdown)
    };
  }

  render() {
    return (
      <Card>
        <CardHeader>
          by {this.props.comment.author}
        </CardHeader>
        <CardBlock>
          <p>{getDateString(this.props.comment.timestamp)}</p>
          <div dangerouslySetInnerHTML={this.displayMarkdown(this.props.comment.body)}></div>

          <Voter
            item={this.props.comment}
            upVote={this.props.upVote}
            downVote={this.props.downVote}/>

        </CardBlock>
        <CardFooter>

          <button
            onClick={() => this.toggleEdit(this.props.comment.id)}
            className='btn btn-secondary'>
            <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit Comment</button>
          <button onClick={() => this.deleteThisComment()} className='btn btn-secondary'>
            <i className="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Delete</button>

        </CardFooter>
      </Card>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    upVote: (data) => dispatch(upVoteComment(data)),
    downVote: (data) => dispatch(downVoteComment(data)),
    delete: (id) => dispatch(deleteComment(id)),
    editComment: (id) => dispatch(toggleCommentEdit(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);