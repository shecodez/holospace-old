import React from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { connect } from "react-redux";

// import autobind from 'autobind-decorator';
// import { loadModel } from '../../utils/loaders';

// import userMovement from '../../reducers/user';
// import skyRotation from '../../reducers/world';

import "../../assets/css/style.min.css";

// conponents
import ConfirmEmailReminder from "../alerts/confirmEmailReminder";
// import Servers from '../server/servers';

import CurrentServer from "../server/currentServer";
// import Channels from '../channel/channels';
import CurrentUser from "../user/currentUser";

import CurrentChannel from "../channel/currentChannel";
import Chat from "../chat/chat";

import Scene3D from "../three/scene3D";
import Skybox from "../channel/vr/skybox";
import World from "../channel/vr/world";
import UserModel from "../user/userModel";

import Members from "../member/members";

class VR extends React.Component {
  state = {
    user: this.props.user,
    scene3D: { width: 0, height: 0 },
    cameraPosition: new THREE.Vector3(0, 0, 5),
    lookAt: new THREE.Vector3(0, 0, 0),
    userPosition: new THREE.Vector3(0, 0, 0),
    userRotation: new THREE.Euler(0, 0, 0, "XYZ"),
    skyRotation: new THREE.Euler(0, 0, 0, "XYZ"),
    worldRotation: new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(1, 0, 0),
      -Math.PI / 2
    )
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
  }

  componentWillUnmount() {
    this.mounted = false;

    window.removeEventListener("resize", this.onWindowResize);

    // this.cancelGameLoop();
  }

  /* @autobind
  requestGameLoop() {
    this.reqAnimId = window.requestAnimationFrame(this.gameLoop);
  }

  @autobind
  cancelGameLoopGameLoop() {
    window.cancelAnimationFrame(this.reqAnimId);
  }

  // Our game loop, which is managed as the window's requestAnimationFrame
  // callback
  @autobind
  gameLoop(time) {
    if (!this.mounted) {
      return;
    }

    this.requestGameLoop();

    const oldState = this.state;

    // Apply our reducer functions to the "game state", which for this
    // example is held in local container state. It could be moved into
    // a redux/flux store and udpated once per game loop.
    const newState = userMovement(oldState, time);

    this.setState(newState);
  } */

  onWindowResize = () => {
    this.setState({
      scene3D: {
        width: this.divRef.clientWidth,
        height: this.divRef.clientHeight
      }
    });
  };

  render() {
    const { match } = this.props;
    const { user, scene3D } = this.state;

    const {
      cameraPosition,
      lookAt,
      userPosition,
      userRotation,
      skyRotation,
      worldRotation
    } = this.state;

    return (
      <div className="grid grid-3c-vr">
        {!user.confirmed && <ConfirmEmailReminder />}

        <div className="nested">
          <div className="c2t section">
            <CurrentServer match={match} />
          </div>

          <div className="c2m stretch section">
            <Chat user={user} match={match} />
          </div>

          <div className="c2b section">
            <CurrentUser user={user} />
          </div>
        </div>

        <div className="nested">
          <div className="c3t section">
            <CurrentChannel match={match} />
          </div>

          <div
            className="c3m stretch section"
            ref={element => {
              this.divRef = element;
            }}
          >
            <Scene3D
              width={scene3D.width}
              height={scene3D.height}
              cameraPosition={cameraPosition}
              lookAt={lookAt}
            >
              <World
                position={new THREE.Vector3(0, 0, 0)}
                rotation={worldRotation}
              >
                <Skybox
                  position={new THREE.Vector3(0, 0, 0)}
                  rotation={skyRotation}
                />
                <UserModel
                  key={THREE.Math.generateUUID()}
                  position={userPosition}
                  rotation={userRotation}
                />
              </World>
            </Scene3D>
          </div>
        </div>

        <div className="c4 section">
          <Members match={match} />
        </div>
      </div>
    );
  }
}

VR.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    confirmed: PropTypes.bool.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      serverId: PropTypes.string.isRequired,
      channelId: PropTypes.string.isRequired
    })
  }).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(VR);

/* { geometry ?
  <Scene3D
    width={ width }
    height={ height }
    cameraPosition={ cameraPosition }
    lookAt={ lookAt }
    geometry={ geometry }
    userPosition={ userPosition }
    userRotation={ userRotation }
  /> : 'Loading' } */
