import * as React from 'react';

export default class Tabs extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: 0
    }
  }
  /*getDefaultProps() {
    return {
      selected: 0
    };
  }

  getInitialState() {
    return {
      selected: this.props.selected
    };
  }*/

  handleClick(index, e) {
    e.preventDefault();
    this.setState({
      selected: index
    });
  }

  _renderTabTitles() {
    function labels(child, index) {
      let activeClass = (this.state.selected === index ? 'active' : '');
      return(
        <li key={index} className={activeClass}>
          <button onClick={this.handleClick.bind(this, index)}>
            {child.props.label}
          </button>
        </li>
      );
    }
    return (
      <ul className="tab-labels">
        {this.props.children.map(labels.bind(this))}
      </ul>
    );
  }

  _renderTabContent() {
    return (
        <div className="tab-content">
          {this.props.children[this.state.selected]}
        </div>
    );
  }

  render() {
    return (
      <div className="tabs">
        {this._renderTabTitles()}
        {this._renderTabContent()}
      </div>
    );
  }
}
