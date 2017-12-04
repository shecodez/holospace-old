import React from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";

import '../../assets/css/style.min.css';

// conponents
import ConfirmEmailReminder from '../alerts/confirmEmailReminder';

import Servers from '../server/servers';

import Scene3D from '../three/scene3D';
// import OrbitControls from '../three/controls/orbit';
import UserModel from '../user/userModel';
import CurrentUser from '../user/currentUser';

import ProfileNav from '../navigation/profileNav';
import UserModelCustomization from '../user/userModelCustomization';

class Profile extends React.Component {
  state = {
    user: this.props.user,
    scene3D: { width: 0, height: 0 },
    cameraPosition: new THREE.Vector3(0, 0, 5),
    lookAt: new THREE.Vector3(0, 0, 0),
    userPosition: new THREE.Vector3(0, 0, 0),
    userRotation: new THREE.Euler(0, 0, 0, 'XYZ')
  };

  componentDidMount() {
    this.mounted = true;

    // Expose the global THREE object for use in debugging console
    window.THREE = THREE;

    /* loadModel( require( '../../assets/user_model.json' ) ).then( geometry =>
        this.setState({ geometry })
    ); */

    this.onWindowResize();
    window.addEventListener("resize", this.onWindowResize);

    // this.requestGameLoop();
  };

  componentWillUnmount() {
    this.mounted = false;

    window.removeEventListener("resize", this.onWindowResize);

    // this.cancelGameLoop();
  }

  onWindowResize = () => {
    this.setState({
      scene3D: {
        width: this.divRef.clientWidth,
        height: this.divRef.clientHeight
      }
    });
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    const { rotation } = this.state;

    this.setState({
      rotation: { x: rotation.x + 0.03, y: rotation.y + 0.03 }
    });
  }

  render() {
    const { user, scene3D } = this.state;

    const { cameraPosition, lookAt, userPosition, userRotation } = this.state;

    return (
      <div className="profile grid grid-3c">
        { !user.confirmed && <ConfirmEmailReminder /> }

        <div className="c1 section">
          <div className="dmsg-btn">
            <Button primary circular size='huge' icon="envelope" />
          </div>
          <Servers />
        </div>

        <div className='nested'>
          <div className="c2t section">
            <div style={{ textAlign: 'center', height: '28px', lineHeight: '28px' }}>
              Preview
            </div>
          </div>

          <div className="c2m stretch section"
            ref={(element) => { this.divRef = element; }}>

            <Scene3D
              width={scene3D.width}
              height={scene3D.height}
              cameraPosition={cameraPosition}
              lookAt={lookAt}
            >
              <UserModel position={userPosition} rotation={userRotation}/>
            </Scene3D>
          </div>

          <div className="c2b section">
            <CurrentUser user={user} />
          </div>
        </div>

        <div className='nested'>
          <div className="c3t section">
            <ProfileNav />
          </div>

          <div className="c3m stretch section">
            <UserModelCustomization />
          </div>
        </div>
      </div>
    );
  }
};

Profile.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    confirmed: PropTypes.bool.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  }
};

export default connect(mapStateToProps)(Profile);
