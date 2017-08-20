import orderBy from 'lodash/orderBy';
import { toastr } from 'react-redux-toastr'
import omit from 'lodash/omit';
import merge from 'lodash/merge';
import uuid from 'uuid/v4';

import * as API from "../utils/api";

/*
 * Constants
 */

export const SORT_BY_OPTIONS = [
  { key: 'timestamp/desc', text: 'Created at (desc)', value: 'timestamp/desc' },
  { key: 'timestamp/asc', text: 'Created at (asc)', value: 'timestamp/asc' },
  { key: 'voteScore/desc', text: 'Vote Score (desc)', value: 'voteScore/desc' },
  { key: 'voteScore/asc', text: 'Vote Score (asc)', value: 'voteScore/asc' },
  { key: 'title/desc', text: 'Title (desc)', value: 'title/desc' },
  { key: 'title/asc', text: 'Title (asc)' , value: 'title/asc' }
];


/*
 * Action creators
 */

const RETRIEVE = 'post/RETRIEVE';
const RETRIEVE_FROM_CATEGORY = 'post/RETRIEVE_FROM_CATEGORY';
const RETRIEVE_COMMENTS_COUNT = 'post/RETRIEVE_COMMENTS_COUNT';
const ADD = 'post/ADD';
const SORT_BY = 'post/SORT_BY';
const DELETE = 'post/DELETE';
const START_EDITING = 'post/START_EDITING';
const STOP_EDITING = 'post/STOP_EDITING';
const VOTE = 'post/VOTE_POST';
const MODAL_VISIBILITY = 'post/MODAL_VISIBILITY';

export function retrieveFromCategory(categoryPath) {
  return (dispatch) => {
    API.getPostsFromCategory(categoryPath)
      .then((posts) => {
        dispatch({ type: RETRIEVE_FROM_CATEGORY, posts });

        posts.map(post => dispatch(retrievePostCommentsCount(post.id)));
      });
  };
}

export function retrievePost(postId) {
  return (dispatch) => {
    API.getPost(postId)
      .then(post => dispatch({ type: RETRIEVE, postId, post }));
  };
}

export function retrievePostCommentsCount(postId) {
  return (dispatch) => {
    API.getCommentsFromPost(postId)
      .then(comments => dispatch({
        type: RETRIEVE_COMMENTS_COUNT, postId,
        commentsCount: comments.length,
      }));
  };
}

export function handlePostForm() {
  return (dispatch, getState) => {
    const form = getState().form;
    let values = form.post.values;

    if (values.id) {
      // Editing existing comment
      const post = {...values, timestamp: Date.now()};

      API.updatePost(post)
        .then((post) => {
          dispatch({ type: ADD, post });
          toastr.success('Success', 'Post updated successfully.');
        });
    } else {
      // Creating a new comment
      const post = {
        id: uuid(),
        timestamp: Date.now(),
        title: values.title,
        body: values.body,
        author: values.author,
        category: values.category
      };

      API.addPost(post)
        .then((post) => {
          dispatch({ type: ADD, post });
          toastr.success('Success', 'Post posted successfully.');
        });
    }
  }
}

export function startEditingPost(postId) {
  return (dispatch) => {
    dispatch({ type: START_EDITING, postId });
    dispatch({ type: MODAL_VISIBILITY, visibility: true });
  };
}

export function sortPostsBy(key, order) {
  return { type: SORT_BY, key, order };
}

export function votePost(postId, option) {
  return (dispatch) => {
    API.votePost(postId, option)
      .then((post) => {
        dispatch({ type: VOTE, post });
        toastr.success('Success', 'Vote posted successfully.');
      });
  };
}

// Editing is cleaned when modal is closed
export function changeModalVisibility(visibility) {
  return (dispatch) => {
    if (!visibility) dispatch({ type: STOP_EDITING });
    dispatch({ type: MODAL_VISIBILITY, visibility });
  };
}

export function deletePost(postId, category) {
  return (dispatch) => {
    API.deletePost(postId)
      .then(() => {
        dispatch({ type: DELETE, postId });
        toastr.success('Success', 'Post deleted successfully.');
      });
  };
}

/*
 * Selectors
 */

export function postsSelector(state) {
  const notDeleted = Object.values(state.byId).filter((post) => !post.deleted);
  return orderBy(notDeleted, state.sortBy.key, state.sortBy.order);
}

export function postSelector(state, postId) {
  return state.byId[postId];
}

export function editingPostSelector(state) {
  return state.byId[state.editingPostId]
}

/*
 * Reducer
 */

const INITIAL_STATE = {
  byId: {},
  sortBy: { key: 'voteScore', order: 'desc' },
  selected: null,
  isModalOpen: false,
  editingPostId: null
};

export default function postsReducer(state = INITIAL_STATE, action) {
  let updatedInfo;

  switch (action.type) {
    case RETRIEVE_FROM_CATEGORY:
      const postsById = action.posts
        .reduce((posts, post) => (Object.assign(posts, { [post.id]: post })), {});

      return Object.assign({}, state, { byId: postsById });
    case RETRIEVE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: action.post
        },
        selected: action.postId
      };
    case RETRIEVE_COMMENTS_COUNT:
      updatedInfo = { [action.postId]: { commentsCount: action.commentsCount } };
      return merge({}, state, { byId: updatedInfo });
    case SORT_BY:
      return Object.assign({}, state, { sortBy: { key: action.key, order: action.order } });
    case VOTE:
      updatedInfo = { [action.post.id]: { voteScore: action.post.voteScore } };
      return merge({}, state, { byId: updatedInfo });
    case DELETE:
      return {
        ...state,
        byId: omit(state.byId, action.postId)
      };
    case ADD:
      updatedInfo = { [action.post.id]: action.post };
      return merge({}, state, { byId: updatedInfo });
    case START_EDITING:
      return Object.assign({}, state, { editingPostId: action.postId });
    case STOP_EDITING:
      return Object.assign({}, state, { editingPostId: null });
    case MODAL_VISIBILITY:
      return Object.assign({}, state, { isModalOpen: action.visibility });
    default:
      return state;
  }
}
