import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/postActions';
import { AppState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../types/types';
import { bindActionCreators } from 'redux';

interface PostItemProps {
	post: any;
}
interface PostItemState {}

type Props = PostItemProps & LinkDispatchProps & LinkStateProp;

class PostItem extends Component<Props, PostItemState> {
	render() {
		const { post, user } = this.props;

		return (
			<div key={post.id} className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<img className="rounded-circle d-none d-md-block" src={post.avatar} alt="" />
						<br />
						<p className="text-center">{post.name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{post.text}</p>
						{post.userid === user.id ? (
							<button
								onClick={async () => await this.props.deletePost(post.id)}
								type="button"
								className="btn btn-danger mr-1"
							>
								<i className="fas fa-times" />
							</button>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

interface LinkStateProp {
	user: any;
}
interface LinkDispatchProps {
	deletePost: (id: number) => any;
}

const mapStateToProps = (state: AppState): LinkStateProp => ({
	user: state.auth.user
});

const mapDispatchToProps = (
	dispatch: ThunkDispatch<any, any, AppActions>,
	props: PostItemProps
): LinkDispatchProps => ({
	deletePost: bindActionCreators(deletePost, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(PostItem);