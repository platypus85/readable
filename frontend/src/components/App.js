import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {fetchPosts, fetchCommentsForPost, sortPosts} from '../actions';
import '../App.css';
import PostSummary from './PostSummary';
import {Link} from 'react-router-dom';
import sortBy from 'sort-by';
import {
  Form,
  FormGroup,
  Label,
  Input} from 'reactstrap';

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
            <Label for="exampleSelect">Select</Label>
            <Input
              value={this.props.postSortOrder}
              onChange={this.sortChange}
              type="select"
              name="select"
              id="exampleSelect">
              <option value='-voteScore'>Order by Votes</option>
              <option value='voteScore'>Order by Votes Ascending</option>
              <option value='-timestamp'>Order by Date Newest</option>
              <option value='timestamp'>Order by Date Oldest</option>
            </Input>
          </FormGroup>
        </Form>

        <div>
          <div>

            {this.displayPosts()}

          </div>
        </div>
        <div>
          <div>
            <Link to='/new'>
              <button>
                Add a Post
              </button>
            </Link>
          </div>
        </div>
      </div >
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {posts: state.posts, categories: state.categories, postSortOrder: state.sorts.postSort}
}

export default connect(mapStateToProps, {fetchPosts, fetchCommentsForPost, sortPosts})(App);
