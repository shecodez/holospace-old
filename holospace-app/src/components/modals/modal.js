import React, { Component } from 'react';

class Modal extends Component {
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modal">
        <div className="content">
          <div className="header">
            <h3>{this.props.title}</h3>
            <button onClick={this.props.onCancel}>X</button>
          </div>

          <div className="body">
            {this.props.children}
          </div>

          <div className="footer">
            <button onClick={this.props.onCancel}>Cancel</button>
            <button onClick={this.props.onSubmit}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

/*
Modal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string
  show: PropTypes.bool,
  children: PropTypes.node
  onSubmit : PropTypes.func
};
*/

export default Modal;
