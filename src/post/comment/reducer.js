import orderBy from 'lodash/orderBy';
import { toastr } from 'react-redux-toastr'
import omit from 'lodash/omit';
import uuid from 'uuid/v4';

import * as API from "../../utils/api";

/*
 * Constants
 */

export const SORT_BY_OPTIONS = [
  { key: 'timestamp/desc', text: 'Created at (desc)', value: 'timestamp/desc' },
  { key: 'timestamp/asc', text: 'Created at (asc)', value: 'timestamp/asc' },
  { key: 'voteScore/desc', text: 'Vote Score (desc)', value: 'voteScore/desc' },
  { key: 'voteScore/asc', text: 'Vote Score (asc)', value: 'voteScore/asc' }
];

/*
 * Action creators
 */
const RETRIEVE = 'comment/RETRIEVE_COMMENTS';
const ADD = 'comment/ADD';
const DELETE = 'comment/DELETE';
const START_EDITING = 'comment/START_EDITING';
const STOP_EDITING = 'comment/STOP_EDITING';
const MODAL_VISIBILITY = 'comment/MODAL_VISIBILITY';
const VOTE = 'comment/VOTE_COMMENT';
const SORT_BY = 'comment/SORT_BY';

export function retrieveComments(postId) {
  return (dispatch) => {
    API.getCommentsFromPost(postId)
      .then(comments => dispatch({ type: RETRIEVE, comments }));
  };
}

export function handleCommentForm() {
  return (dispatch, getState) => {
    const form = getState().form;
    let values = form.comment.values;

    if (values.id) {
      // Editing existing comment
      const comment = {...values, timestamp: Date.now()};

      API.updateComment(comment)
        .then((comment) => {
          dispatch({ type: ADD, comment });
          toastr.success('Success', 'Comment updated successfully.');
        });
    } else {
      // Creating a new comment
      const comment = {
        id: uuid(),
        timestamp: Date.now(),
        parentId: values.postId,
        author: values.author,
        body: values.body
      };

      API.addComment(comment)
        .then((comment) => {
          dispatch({ type: ADD, comment });
          toastr.success('Success', 'Comment posted successfully.');
        });
    }
  }
}

export function voteComment(commentId, option) {
  return (dispatch) => {
    API.voteComment(commentId, option)
      .then((comment) => {
        dispatch({ type: VOTE, comment });
        toastr.success('Success', 'Vote posted successfully.');
      });
  };
}

export function deleteComment(commentId) {
  return (dispatch) => {
    API.deleteComment(commentId)
      .then(() => {
        dispatch({ type: DELETE, commentId });
        toastr.success('Success', 'Comment deleted successfully.');
      });
  };
}

export function startEditingComment(commentId) {
  return (dispatch) => {
    dispatch({ type: START_EDITING, commentId });
    dispatch({ type: MODAL_VISIBILITY, visibility: true });
  };
}

export function sortCommentsBy(key, order) {
  toastr.success('Success', 'Comments sorted successfully.');
  return { type: SORT_BY, key, order };
}

// Editing is cleaned when modal is closed
export function changeModalVisibility(visibility) {
  return (dispatch) => {
    if (!visibility) dispatch({ type: STOP_EDITING });
    dispatch({ type: MODAL_VISIBILITY, visibility });
  };
}


/*
 * Selectors
 */

export function commentsSelector(state) {
  const notDeleted = Object.values(state.byId).filter((comment) => !comment.deleted);
  return orderBy(notDeleted, state.sortBy.key, state.sortBy.order);
}

export function editingCommentSelector(state) {
  return state.byId[state.editingCommentId]
}


/*
 * Reducer
 */

const INITIAL_STATE = {
  byId: {},
  sortBy: { key: 'voteScore', order: 'desc' } ,
  isModalOpen: false,
  editingCommentId: null
};

function commentsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RETRIEVE:
      const commentsById = action.comments
        .reduce((comments, comment) => (Object.assign(comments, { [comment.id]: comment })), {});

      return {
        ...state,
        byId: commentsById
      };
    case VOTE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: action.comment
        }
      };
    case ADD:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: action.comment
        }
      };
    case DELETE:
      return {
        ...state,
        byId: omit(state.byId, action.commentId)
      };
    case SORT_BY:
      return {
        ...state,
        sortBy: { key: action.key, order: action.order }
      };
    case START_EDITING:
      return Object.assign({}, state, { editingCommentId: action.commentId });
    case STOP_EDITING:
      return Object.assign({}, state, { editingCommentId: null });
    case MODAL_VISIBILITY:
      return Object.assign({}, state, { isModalOpen: action.visibility });
    default :
      return state;
  }
}

export default commentsReducer;
