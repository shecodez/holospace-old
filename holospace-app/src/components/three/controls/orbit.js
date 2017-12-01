// node_modules\three\examples\js\controls\OrbitControls.js

import React from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { OCLib } from "three/examples/js/controls/OrbitControls";

class Orbit extends React.Component {
  componentDidUpdate() {
    this.updateTHREE(this.props);
  };

  updateTHREE = () => {
    const OrbitControls = OCLib(THREE);
    this.controls = new OrbitControls(this.context.camera, this.context.renderer);
  };

  render() {
    return null;
  }
};


Orbit.contextTypes = {
  camera: PropTypes.object,
  renderer: PropTypes.object
}

export default Orbit;
