import React, { Component } from 'react';
import uuid from 'uuid';

//components
import Modal from '../modal';

class AddChannel extends Component {
  constructor() {
    super();
    this.state = {
      newChannel: {},
      isOpen: false
    }
  }
  static defaultProps = {
    channelTypes: ['Text', 'Voice', 'VR']
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleSubmit(e) {
    this.setState({ newChannel: {
      id: uuid.v4(),
      name: this.refs.name.value,
      type: this.props.type,
      topic: this.refs.topic.value
    }}, function() {
      //console.log(this.state);
      this.props.addChannel(this.state.newChannel);
      this.toggleModal();
    });
    e.preventDefault();
  }

  render() {
    const channelType = this.props.type + ' channel';
    return (
      <div>
        <div className="add-channel">
          <button className="select-channel-btn">
            { channelType +'s' }
          </button>
          <a className="link" onClick={this.toggleModal}>
            <span>+</span>
          </a>
        </div>

        <Modal show={this.state.isOpen}
          title={'Create new ' + channelType }
          onCancel={this.toggleModal}
          onSubmit={this.handleSubmit.bind(this)}
          >
          <form className="form add-channel-form">
            <div className='group'>
              <input type="text" ref="name" placeholder=" " required />
              <label>Name</label>
            </div>
            <div className='group'>
              <input type="text" ref="topic" placeholder=" " />
              <label>Topic</label>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default AddChannel;
