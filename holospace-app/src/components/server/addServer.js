import React, { Component } from 'react';

import uuid from 'uuid';

// components
import Modal from '../modal';

class AddServer extends Component {
  constructor() {
    super();
    this.state = {
      newServer: {},
      isOpen: false
    }
  }

  static defaultProps = {
    serverRealms: ['Cliffside', 'Sunny Oasis', 'Rustic Forest']
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleSubmit(e) {
    this.setState( {newServer:{
      id: uuid.v4(),
      name: this.refs.name.value,
      seed: this.refs.seed.value || '1234', // change this to the unique 4 digit UNID (username#1234)
      icon_url: this.refs.icon.value || 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_150/v1509126240/tesseract_z3vhkn.webp'
    }}, function() {
      // console.log(this.state);
      this.props.addServer(this.state.newServer);
      this.toggleModal();
    });
    e.preventDefault();
  }

  render() {
    /* USE THIS IN PLACE OF SEED
    let serverRealmOptions = this.prop.serverRealmOptions.map(realm => {
      return <option key={realm} value={realm}>{realm}</option>
    });
    <div>
      <label>Server Realm</label>
      <select ref="realm">{serverRealmOptions}</select>
    </div> */

    return (
      <div>
        <button className="add-server-btn" onClick={this.toggleModal}>
          +
        </button>

        <Modal show={this.state.isOpen}
          title="Create Server"
          onCancel={this.toggleModal}
          onSubmit={this.handleSubmit.bind(this)}
          >
          <form className="form add-server-form">
            <div className="group">
              <input type="text" ref="name" placeholder=" " required />
              <label>Name</label>
            </div>
            <div className="group">
              <input type="text" ref="seed" placeholder=" " />
              <label>Seed</label>
            </div>
            <div className="group">
              <input type="text" ref="icon" placeholder=" " />
              <label>Icon Url</label>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default AddServer;
