import React from "react";
import PropTypes from "prop-types";
import * as THREE from "three";

class ThreeScene extends React.Component {



  componentDidMount() {
    init();
  }

  init = () => {
    const { width, height } = this.props;

    const camera = new THREE.PerspectiveCamera( 70, width/height, 0.01, 10 );
	  camera.position.z = 1;

    const scene = new THREE.Scene();

    // geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
  	// material = new THREE.MeshNormalMaterial();

  	// mesh = new THREE.Mesh( geometry, material );
  	// scene.add( mesh );

    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( width, height );
    this.refs.anchor.appendChild( renderer.domElement );
};

  render() {
    const { width, height, style } = this.props;

    return (
      <div ref="anchor" style={ [{width, height}, style] } />
    );
  }
}

ThreeScene.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.string
}

export default ThreeScene;
