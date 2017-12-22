import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchChannel } from "../../actions/channels";

// components
import SearchForm from "../forms/searchForm";

class CurrentChannel extends React.Component {
  state = {
    isOpen: false
  };

  componentDidMount() {
    if (this.props.match.params.channelId) {
      this.props.fetchChannel(this.props.match.params.channelId);
    }
  }

  submit = data => {
    this.toggleModal();
    console.log(data);
    // this.props.search(data).then(this.toggleModal());
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isOpen } = this.state;
    const { channel } = this.props;

    return (
      <div className="current-channel">
        <div>
          { channel && <h3 className="name">
            <span>{(channel.type === 'Text') ? '#' : ''}</span> {channel.name}
          </h3> }
          { channel && channel.topic &&
            <span className="topic">{channel.topic}</span>
          }
        </div>

        <Button.Group>
          <Button icon="bell outline" />
          <Button icon="search" onClick={this.toggleModal} />
          <Button icon="calendar plus" />
        </Button.Group>

        <Modal size={"small"} open={isOpen} onClose={this.toggleModal} basic>
          <Modal.Content>
            <SearchForm submit={this.submit} />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

CurrentChannel.defaultProps = {
  channel: null
};

CurrentChannel.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      channelId: PropTypes.string
    })
  }).isRequired,
  channel: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    topic: PropTypes.string,
    type: PropTypes.string
  }),
  fetchChannel: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  return {
    channel: state.channels.find(item => item._id === props.match.params.channelId) ||
    null
  };
}

export default connect(mapStateToProps, { fetchChannel })(CurrentChannel);
