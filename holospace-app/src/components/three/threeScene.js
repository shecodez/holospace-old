import React from "react";
import PropTypes from "prop-types";
import * as THREE from "three";

class ThreeScene extends React.Component {

  getChildContext() {
    return {
      scene: this.scene,
      renderer: this.renderer
    }
  };

  componentDidMount() {
    this.updateTHREE(this.props);

    this.refs.anchor.appendChild(this.renderer.domElement);
  };

  componentDidUpdate() {
    this.updateTHREE(this.props);
  };
  scene = new THREE.Scene();

  updateTHREE(props) {
    const { width, height } = props;

    this.renderer.setSize(width, height);
  };
  renderer = new THREE.WebGLRenderer({ antialias: true });

  render() {
    const { width, height, style, children } = this.props;
    
    return (
      <div ref="anchor" style={ [{width, height}, style] }>
        { children }
      </div>
    );
  }
}

ThreeScene.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

ThreeScene.childContextTypes = {
  scene: PropTypes.object,
  renderer: PropTypes.object
};

export default ThreeScene;
