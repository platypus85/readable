import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPosts, fetchCommentsForPost, sortPosts } from '../actions';
import '../App.css';
import PostSummary from './PostSummary';
import { Link } from 'react-router-dom';
import sortBy from 'sort-by';
import Button from 'material-ui/Button';


class App extends Component {
  constructor(props) {
    super(props);

    this.sortChange = this.sortChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  sortChange(event) {
    this.props.sortPosts(event.target.value);
  }

  displayPosts() {
    const category = this.props.match.params.category;
    const matchingPosts = category ?
      _.filter(this.props.posts, post => post.category === category) :
      this.props.posts;

    const orderedMatchingPosts = _.values(matchingPosts).sort(sortBy(this.props.postSortOrder));

    return _.map(orderedMatchingPosts, post => {
      return (
        <li key={post.id === undefined ? 1 : post.id}>
          <PostSummary postId={post.id} onDelete={() => { }} />
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Posts</h2>
        <div>
          <select value={this.props.postSortOrder} onChange={this.sortChange}>
            <option value='-voteScore'>Order by Votes</option>
            <option value='voteScore'>Order by Votes Ascending</option>
            <option value='-timestamp'>Order by Date Newest</option>
            <option value='timestamp'>Order by Date Oldest</option>
          </select>
        </div>
        <div>
          <div>
            <ul >
              {this.displayPosts()}
            </ul>
          </div>
        </div>
        <div>
          <div>
            <Link to='/new'>
              <Button>
                Add a Post
              </Button>
            </Link>
          </div>
        </div>
      </div >
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts,
    categories: state.categories,
    postSortOrder: state.sorts.postSort
  }
}

export default connect(mapStateToProps, { fetchPosts, fetchCommentsForPost, sortPosts })(App);
