import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";

import '../../assets/css/style.min.css';

// conponents
import ConfirmEmailReminder from '../alerts/confirmEmailReminder';

import Servers from '../server/servers';

import Scene3D from '../three/scene3D';
import PerspectiveCamera from '../three/perspectiveCamera';
// import OrbitControls from '../three/controls/orbit';
import UserModel from '../user/userModel';
import CurrentUser from '../user/currentUser';

import ProfileNav from '../navigation/profileNav';
import UserModelCustomization from '../user/userModelCustomization';

class Profile extends React.Component {
  state = {
    user: this.props.user,
    rotation: { x: 0, y: 0 },
    scene3D: { width: 0, height: 0 }
  };

  componentDidMount() {
    this.update3DSceneDimensions();
    window.addEventListener('resize', this.update3DSceneDimensions);

    this.animate();
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.update3DSceneDimensions);
  }

  update3DSceneDimensions = () => {
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
    const { user, rotation, scene3D } = this.state;

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
              style={{ margin: '0 auto' }}>

              <PerspectiveCamera
                fov={75}
                aspect={ scene3D.width / scene3D.height }
                near={0.1}
                far={1000}
                position={{ x:0, y:0, z:5 }}>

                <UserModel rotation={ rotation } />

              </PerspectiveCamera>
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
