import React from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
// import axios from "axios";

class UserModel extends React.Component {
  state: {
    // geometry, material
    userModel: []
  };

  componentWillMount() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshNormalMaterial();
    this.model = new THREE.Mesh(this.geometry, this.material);

    this.context.scene.add(this.model);
  };

  /* componentDidMount() {
    axios.get(`/api/models/${this.props.userId}`).then(res => {
      this.setState({ models: res.data });
    });
  }; */

  componentDidUpdate() {
    this.animation();
  }

  animation = () => {
    const { rotation } = this.props;

    this.model.rotation.x = rotation.x;
    this.model.rotation.y = rotation.y;
  };

  render() {
    return null;
  }
};

UserModel.propTypes = {
  rotation: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  // geometry: PropTypes.string
}

UserModel.contextTypes = {
  scene: PropTypes.object
}

export default UserModel;
