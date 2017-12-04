import React from "react";
import PropTypes from "prop-types";
// import React3 from "react-three-renderer";
import * as THREE from "three";

const UserModel = ({ position, rotation }) => (
  <group position={position} rotation={rotation}>
    <mesh>
      <boxGeometry width={1} height={1} depth={1} />
      <meshBasicMaterial color={0x7a5ac3} side={THREE.DoubleSide} />
    </mesh>
  </group>
);

UserModel.propTypes = {
  position: PropTypes.instanceOf(THREE.Vector3).isRequired,
  rotation: PropTypes.instanceOf(THREE.Euler).isRequired
};

export default UserModel;

/* <resources>
  <texture
    resourceId="userImage"
    url={require("../../assets/user_texture.jpg")}
    anisotropy={16}
  />
  <meshPhongMaterial resourceId="userTexture" side={DoubleSide}>
    <textureResource resourceId="userImage" />
  </meshPhongMaterial>
  <geometry
    resourceId="userGeometry"
    faces={faces}
    vertices={vertices}
    faceVertexUvs={faceVertexUvs}
  />
</resources>

<meshPhongMaterial side={THREE.DoubleSide}>
  <geometryResource resourceId="userGeometry" />
  <materialResource resourceId="userTexture" />
</meshPhongMaterial>

const { faces, vertices, faceVertexUvs } = geometry; */
