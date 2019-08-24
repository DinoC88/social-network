import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePost} from "../../actions/postActions";

class PostItem extends Component {
  render() {
    const {post, auth} = this.props;

    return (
      <div key={post.id} className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
              <img className="rounded-circle d-none d-md-block" 
                  src={post.avatar}
                  alt="" />
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
              {post.userid  === auth.user.id ? (
                <button 
                  onClick={async () => await this.props.deletePost(post.id)}
                  type="button" className="btn btn-danger mr-1">
                  <i className="fas fa-times" />
                </button>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deletePost })(PostItem);