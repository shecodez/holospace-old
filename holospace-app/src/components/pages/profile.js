import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { allServersSelector } from "../../reducers/servers";
// import { allChannelsSelector } from "../../reducers/channels";

import '../../assets/css/style.min.css';

// conponents
import ConfirmEmailReminder from '../alerts/confirmEmailReminder';
import Servers from '../server/servers';

import ThreeScene from '../three/threeScene';
import PerspectiveCamera from '../three/perspectiveCamera';
import Layer from '../three/layer';

import UserModel from '../user/userModel';

import CurrentUser from '../user/currentUser';

class Profile extends React.Component {
  state = {
    user: this.props.user,
    rotation: { x: 0, y: 0 },
    modelDisplayDiv: { width: 0, height: 0 }
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    this.animate();
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      modelDisplayDiv: { width: this.divRef.clientWidth, height: this.divRef.clientHeight }
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
    const { user, rotation, modelDisplayDiv } = this.state;

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
            search form
          </div>

          <div className="c2m stretch section"
            ref={(element) => { this.divRef = element; }}>

            <ThreeScene width={modelDisplayDiv.width} height={modelDisplayDiv.height}
              style={{ margin: '0 auto' }}>
              <PerspectiveCamera
                fov={75}
                aspect={ modelDisplayDiv.width / modelDisplayDiv.height }
                near={0.1}
                far={1000}
                position={{ x:0, y:0, z:5 }}>

                <Layer>
                  <UserModel rotation={ rotation } />
                </Layer>
              </PerspectiveCamera>
            </ThreeScene>
          </div>

          <div className="c2b section">
            <CurrentUser user={user} />
          </div>
        </div>

        <div className='nested'>
          <div className="c3t section">
            Tabs to change between friends and avatar wardrobe
          </div>

          <div className="c3m stretch section">
            Friends mutual servers
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
  /*  servers: PropTypes.arrayOf(PropTypes.shape({
    icon_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired */
};

function mapStateToProps(state) {
  return {
    user: state.user,
    servers: allServersSelector(state)
  }
}

export default connect(mapStateToProps)(Profile);
