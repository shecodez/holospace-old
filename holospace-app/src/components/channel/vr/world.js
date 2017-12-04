import React from "react";
import PropTypes from "prop-types";
import * as THREE from "three";

// static displayName = "World";
const World = ({ position, rotation, children }) => (
  <group key={"world"} quaternion={rotation}>
    <mesh key={"floor"} position={position}>
      <planeBufferGeometry
        width={300}
        height={300}
        widthSegments={30}
        heightSegments={30}
      />
      <meshBasicMaterial
        opacity={0.5}
        color={0x333000}
        side={THREE.DoubleSide}
        wireframe
      />
    </mesh>
    {children}
  </group>
);

World.defaultProps = {
  children: null
};

World.propTypes = {
  position: PropTypes.instanceOf(THREE.Vector3).isRequired,
  rotation: PropTypes.instanceOf(THREE.Quaternion).isRequired,
  children: PropTypes.node
};

export default World;
