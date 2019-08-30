import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import Spinner from "../common/Spinner"
import { getPosts } from '../../actions/postActions';
import PostItem from "./PostItem"

class Posts extends Component {
  async componentDidMount() {
    await this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post
    let postContent;
    if(posts === null || loading) {
      postContent = <Spinner />
    } else {
      postContent = posts.map(post => <PostItem key={post.id} post={post}/>)
    }
    return (
      <div style={{minHeight: "100vh"}} className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              <div>
              {postContent}</div>
            </div>
          </div>
        </div>
      </div>
      
    )
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, {getPosts})(Posts)