import React from "react";
import PropTypes from "prop-types";
// import React3 from 'react-three-renderer';
import { Euler, Vector3, } from 'three';

const Skydome = ({ position, rotation }) => (
  <group
    position={ position }
    rotation={ rotation }
  >
    <mesh>
      <geometryResource
        resourceId="skydomeGeometry"
      />
      <materialResource
        resourceId="skydomeTexture"
      />
    </mesh>
  </group>
);

Skydome.propTypes = {
  position: PropTypes.instanceOf( Vector3 ).isRequired,
  rotation: PropTypes.instanceOf( Euler ).isRequired
};

export default Skydome;
