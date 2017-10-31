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
      //type: this.state.type,
      topic: this.refs.topic.value
    }}, function() {
      console.log(this.state);
      this.props.addChannel(this.state.newChannel);
      this.toggleModal();
    });
    e.preventDefault();
  }

  render() {
    // let the button determin if the channel is 'Text', 'Voice', or 'VR'
    const channelType = this.props.type + ' channel';
    return (
      <div>
        <a className="add-channel-link" onClick={this.toggleModal}>
          <h4>{ 'Add new '+ channelType }<span>(plus)</span></h4>
        </a>

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
