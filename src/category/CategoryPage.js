import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Segment, Grid, Icon, Button } from "semantic-ui-react";

import PostsPreviewContainer from "../post/PostsPreviewContainer";
import { SORT_BY_OPTIONS } from "../post/reducer";

const CategoryPage = (props) => {
  return (
    <div>
      <Segment.Group>
        <Segment color="orange">
          <Grid stackable>
            <Grid.Column width={10}>
              {props.name ?
                <h2>Category: {props.name}</h2> :
                <h2>All categories</h2>
              }

            </Grid.Column>
            <Grid.Column width={4} floated="right" textAlign="right">
              <Icon name='sort' />
              Sort By:
              {' '}
              <Dropdown
                inline header='Sorting criteria'
                options={SORT_BY_OPTIONS} defaultValue={`${props.sortedBy.key}/${props.sortedBy.order}`}
                onChange={(event, data) => props.handleSortBy(data.value)}
              />
            </Grid.Column>
          </Grid>
        </Segment>

        <Segment secondary>
          <p>
            Explore below the posts from this category. You can comment on an existing post or
            {' '}
            <Button
              content="submit your own" icon="add" size="small" color="green"
              onClick={()=> props.handleModalVisibility(true)}
            />.
          </p>
        </Segment>
      </Segment.Group>

      <Segment color="black">
        <PostsPreviewContainer posts={props.posts} />
        {props.posts.length === 0 && <h3>There are no posts in this category yet. Start by creating your own!</h3>}
      </Segment>
    </div>
  );
};

CategoryPage.propTypes = {
  name: PropTypes.string,
  posts: PropTypes.array.isRequired,
  sortedBy: PropTypes.object.isRequired,
  handleSortBy: PropTypes.func.isRequired,
  handleModalVisibility: PropTypes.func.isRequired
};

export default CategoryPage;
