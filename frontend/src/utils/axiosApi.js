import axios from 'axios';
const ROOT_URL = `${process.env.REACT_APP_BACKEND || 'http://localhost:3001'}`;

const headers = {
  'Accept': 'application/json',
  'Authorization': 'authorized'
}

// Posts
export const fetchPosts = () => {
  const request = axios.get(`${ROOT_URL}/posts`, { headers, credentials: 'include' });
  return request;
}

export const fetchPostsForCategory = (category) => {
  const request = axios.get(`${ROOT_URL}/${category}/posts`, { headers, credentials: 'include' });
  return request;
}

export const fetchPost = (id) => {
  const request = axios.get(`${ROOT_URL}/posts/${id}`, { headers, credentials: 'include' });
  return request;
}

export const addPost = (post, callback) => {
  const request = axios
    .post(`${ROOT_URL}/posts`, post, { headers, credentials: 'include' })
    .then(() => callback());

  return request;
}

export const updatePost = (post, callback) => {
  const request = axios
    .put(`${ROOT_URL}/posts/${post.id}`, post, { headers, credentials: 'include' })
    .then(() => callback());

  return request;
}

export const voteOnPost = (id, option) => {
  const request = axios
    .post(`${ROOT_URL}/posts/${id}`,
      { option },
      { headers, credentials: 'include' });

  return request;
}

export const deletePost = (id, callback) => {
  const request = axios
    .delete(`${ROOT_URL}/posts/${id}`, { headers, credentials: 'include' })
    .then(() => callback());

  return request;
}

// Categories
export const fetchCategories = () => {
  const request = axios.get(`${ROOT_URL}/categories`, { headers , credentials: 'include'});
  return request;
}

// Comments
export const fetchCommentsForPost = (postId) => {
  const request = axios.get(`${ROOT_URL}/posts/${postId}/comments`, { headers, credentials: 'include' });
  return request;
}

export const fetchComment = (id) => {
  const request = axios.get(`${ROOT_URL}/comments/${id}`, { headers, credentials: 'include' });
  return request;
}

export const postComment = (comment) => {
  const request = axios.post(`${ROOT_URL}/comments`, comment, { headers, credentials: 'include' });
  return request;
}

export const voteOnComment = (id, option) => {
  const request = axios
    .post(`${ROOT_URL}/comments/${id}`, { option }, { headers, credentials: 'include' });

  return request;
}

export const updateComment = (comment) => {
  const request = axios
    .put(`${ROOT_URL}/comments/${comment.id}`, comment, { headers, credentials: 'include' });

  return request;
}

export const deleteComment = (id) => {
  const request = axios
    .delete(`${ROOT_URL}/comments/${id}`, { headers, credentials: 'include' });
    
  return request;
}