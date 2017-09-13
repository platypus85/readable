import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {fetchPosts, fetchCommentsForPost, sortPosts} from '../actions';
import '../App.css';
import PostSummary from './PostSummary';
import {Link} from 'react-router-dom';
import sortBy from 'sort-by';
import {Form, FormGroup, Input} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.sortChange = this
      .sortChange
      .bind(this);
  }

  componentDidMount() {
    this
      .props
      .fetchPosts();
  }

  sortChange(event) {
    this
      .props
      .sortPosts(event.target.value);
  }

  displayPosts() {
    const category = this.props.match.params.category;
    const matchingPosts = category
      ? _.filter(this.props.posts, post => post.category === category)
      : this.props.posts;

    const orderedMatchingPosts = _
      .values(matchingPosts)
      .sort(sortBy(this.props.postSortOrder));

    return _.map(orderedMatchingPosts, post => {
      return (
        <div key={post.id === undefined
          ? 1
          : post.id}>
          <PostSummary postId={post.id} onDelete={() => {}}/>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <h2>Posts</h2>
        <Form>
          <FormGroup>
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
          </FormGroup>
        </Form>

        <div>
          <div>

            {this.displayPosts()}

          </div>
        </div>
        <div>
          <Link to='/new'>
            <button className="btn btn-info">
              Create Post
            </button>
          </Link>
        </div>
      </div >
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {posts: state.posts, categories: state.categories, postSortOrder: state.sorts.postSort}
}

export default connect(mapStateToProps, {fetchPosts, fetchCommentsForPost, sortPosts})(App);
