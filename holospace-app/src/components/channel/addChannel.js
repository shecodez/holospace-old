import React, { Component } from 'react';

class AddChannel extends Component {
  static defaultProps = {
    channelTypes: ['Text', 'Voice', 'VR']
  }

  handleSubmit() {
    console.log('Submitted');
  }

  render() {
    let channelTypeOptions = this.prop.channelTypeOptions.map(type => {
      return <option key={type} value={type}>{type}</option>
    });
    return (
      <div>
        <h3>Create Channel</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Name</label>
            <input type="text" ref="name" />
          </div>
          <div>
            <label>Topic</label>
            <input type="text" ref="topic" />
          </div>
          <div>
            <label>Type</label>
            <select ref="type">{channelTypeOptions}</select>
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddChannel;
