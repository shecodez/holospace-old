import React from "react";
import PropTypes from "prop-types";
import React3 from "react-three-renderer";
import * as THREE from "three";

class Scene3D extends React.Component {
  componentDidMount() {
    // this.controls = new THREE.OrbitControls(this.camera, this.canvas);
  }

  render() {
    const { width, height, cameraPosition, lookAt } = this.props;

    return (
      <React3
        ref={element => {
          this.canvas = element;
        }}
        mainCamera="camera"
        width={width}
        height={height}
        antialias
      >
        <scene
          ref={element => {
            this.scene = element;
          }}
        >
          <perspectiveCamera
            ref={element => {
              this.camera = element;
            }}
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={cameraPosition}
            lookAt={lookAt}
          />

          <ambientLight color={0xdddddd} />

          <directionalLight
            color={new THREE.Color(0xffffff)}
            intensity={1.5}
            position={new THREE.Vector3(0, 0, 60)}
          />

          {this.props.children}
          
        </scene>
      </React3>
    );
  }
}

Scene3D.defaultProps = {
  children: null
};

Scene3D.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  cameraPosition: PropTypes.instanceOf(THREE.Vector3).isRequired,
  lookAt: PropTypes.instanceOf(THREE.Vector3).isRequired,
  children: PropTypes.node
};

export default Scene3D;
