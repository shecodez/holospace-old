import React from "react";
import PropTypes from "prop-types";
// import React3 from "react-three-renderer";
import { Euler, Vector3, DoubleSide } from "three";

const Skybox = ({ position, rotation }) => (
  <group position={position} rotation={rotation}>
    <mesh>
      <boxGeometry width={1000} height={1000} depth={1000} />
      <meshBasicMaterial color={0x7ec0ee} side={DoubleSide} />
    </mesh>
  </group>
);

Skybox.propTypes = {
  position: PropTypes.instanceOf(Vector3).isRequired,
  rotation: PropTypes.instanceOf(Euler).isRequired
};

export default Skybox;
