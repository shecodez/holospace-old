import React, { Component } from 'react';

class ModalWrapper extends Component {

  onBackgroundClick = e => {
    if (e.target === e.currentTarget) props.hideModal();
  };

  onOk = () => {
    props.onOk();
    props.hideModal();
  };

  const okBtn = props.showOk
    ? (
      <button
        onClick={onOk}
        disable{props.okDisabled}
      >
        {props.okText}
      </button>
    ) : null;

  render() {
    return (
      <div onClick={onBackgroundClick}>
        <header>
          <h3>{props.title}</h3>
          <button onClick={props.hideModal}>Close</button>
        </header>

        {props.childern}

        {okBtn}
      </div>
    );
  }
}

/*
ModalWrapper.propTypes = {
  // props
  title: PropTypes.string,
  showOk: PropTypes.bool,
  okText: PropTypes.string,
  okDisabled: PropTypes.bool,
  width: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,

  // methods
  hideModal: PropTypes.func,
  onOk: PropTypes.func,
};

ModalWrapper.defaultProps = {
  title: '',
  showOk: true,
  okText: 'OK',
  okDisabled: false,
  width: 400,
  onOk: () => {}
};
*/

export default ModalWrapper;
