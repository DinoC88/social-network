import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../types/types';
import { AppState } from '../../reducers';
import { bindActionCreators } from 'redux';
import PostItem from './PostItem';
import PostForm from './PostForm';

interface PostsProps {}
interface PostsState {}

type Props = PostsProps & LinkDispatchProps & LinkStateProp;

class Posts extends Component<Props, PostsState> {
  async componentDidMount() {
    await this.props.getPosts();
  }
  render() {
    const { posts, isLoading } = this.props;
    let postContent;
    if (posts === null || isLoading) {
      postContent = <Spinner />;
    } else {
      postContent = posts.map((post: any) => <PostItem key={post.id} post={post} />);
    }
    return (
      <div style={{ minHeight: '100vh' }} className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              <div>{postContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

interface LinkStateProp {
  posts: any;
  isLoading: boolean;
}
interface LinkDispatchProps {
  getPosts: () => any;
}

const mapStateToProps = (state: AppState): LinkStateProp => ({
  posts: state.posts.posts,
  isLoading: state.posts.isLoading
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: PostsProps): LinkDispatchProps => ({
  getPosts: bindActionCreators(getPosts, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
