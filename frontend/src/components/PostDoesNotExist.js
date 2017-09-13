import React from 'react';
import { Link } from 'react-router-dom';

const PostDoesNotExist = ({ location }) => (
  <div>
    <b>The post you are trying to access is loading or does not exist. </b>
    Please visit the homepage to see more posts. <Link to='/'>Homepage</Link>
    <div>
      <code>{location.pathname}</code>
    </div>
  </div>
);

export default PostDoesNotExist;