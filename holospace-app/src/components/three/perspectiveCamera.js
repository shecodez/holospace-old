import React from "react";
import PropTypes from "prop-types";
import * as THREE from "three";

class PerspectiveCamera extends React.Component {
  constructor(props) {
    super(props);

    this.updateTHREE(props);
  };

  componentDidMount() {
    this.draw();
  };

  componentDidUpdate() {
    this.updateTHREE(this.props);
    this.draw();
  };

  updateTHREE() {
    const { fov, aspect, near, far, position } = this.props;

    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.x = position.x;
    this.camera.position.y = position.y;
    this.camera.position.z = position.z;
  };

  draw() {
    this.context.renderer.render(this.context.scene, this.camera);
  }

  render() {
    return <div>{ this.props.children }</div>
  }
};

PerspectiveCamera.propTypes = {
  fov: PropTypes.number.isRequired,
  aspect: PropTypes.number.isRequired,
  near: PropTypes.number.isRequired,
  far: PropTypes.number.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired
}

PerspectiveCamera.contextTypes = {
  scene: PropTypes.object,
  renderer: PropTypes.object
}

export default PerspectiveCamera;
