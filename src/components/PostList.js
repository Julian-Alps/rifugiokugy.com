import React from 'react';
import PropTypes from 'prop-types';
import PostListItem from './PostListItem';

const PostList = ({posts}) => {
  return (
    <nav>
      <ul>
        {posts.map((post, id)=>
          <PostListItem key={id} post={post} />
        )}
      </ul>
    </nav>
  );
};

PostList.propTypes = {
  posts: PropTypes.array
};

export default PostList;
