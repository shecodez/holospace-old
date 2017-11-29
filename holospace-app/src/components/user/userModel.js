import React from "react";
import PropTypes from "prop-types";
import * as THREE from "three";

class UserModel extends React.Component {

  componentWillMount() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshNormalMaterial();
    this.model = new THREE.Mesh(this.geometry, this.material);

    this.context.scene.add(this.model);
  };

  componentDidUpdate() {
    const { rotation } = this.props;

    this.model.rotation.x = rotation.x;
    this.model.rotation.y = rotation.y;
  }

  render() {
    return null;
  }
};

UserModel.propTypes = {
  rotation: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
}

UserModel.contextTypes = {
  scene: PropTypes.object
}

export default UserModel;
