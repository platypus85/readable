const ROOT_URL = `${process.env.REACT_APP_BACKEND || 'http://localhost:3001'}`;

const headers = {
  'Accept': 'application/json',
  'Authorization': 'authorized'
}

// Posts
export const fetchPosts = () => {
  return fetch(`${ROOT_URL}/posts`, { headers, credentials: 'include' })
  .then((res) => res.json());
}

export const fetchPosts2 = () => {
  let posts = {};
  fetch(`${ROOT_URL}/posts`, { headers, credentials: 'include' })
  .then((res) => res.json())
  .then(data => posts = data);
  return posts;
}

export const fetchPostsForCategory = (category) =>
  fetch(`${ROOT_URL}/${category}/posts`, { headers, credentials: 'include' })
    .then((res) => res.json())
    .then(data => data.posts);

export const fetchPost = (id) =>
  fetch(`${ROOT_URL}/posts/${id}`, { headers, credentials: 'include' })
    .then((res) => res.json());

export const addPost = (post) =>
  fetch()

export const updatePost = (post) =>
  fetch()

export const voteOnPost = (post, option) =>
  fetch()

export const deletePost = (post) =>
  fetch()

// Categories
export const fetchCategories = () =>
  fetch(`${ROOT_URL}/categories`, { headers, credentials: 'include' })
    .then((res) => res.json());

// Comments
export const fetchCommentsForPost = (postId) =>
  fetch(`${ROOT_URL}/posts/${postId}/comments`, { headers, credentials: 'include' })
    .then((res) => res.json())

export const fetchComment = (id) =>
  fetch(`${ROOT_URL}/comments/${id}`, { headers, credentials: 'include' })
    .then((res) => res.json());

export const postComment = (comment) =>
  fetch()

export const voteOnComment = (comment, option) =>
  fetch()

export const updateComment = (comment) =>
  fetch()

export const deleteComment = (comment) =>
  fetch()