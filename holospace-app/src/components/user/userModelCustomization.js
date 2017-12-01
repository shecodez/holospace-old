import React from "react";
import { Accordion } from "semantic-ui-react";

// Components
import Tabs from '../tab/tabs';
import Pane from '../tab/pane';

class UserModelCustomization extends React.Component {
  state = {
    bodyOptions: [ 'type', 'skin', 'arms', 'legs', 'hands', 'feet', 'measurments'],
    headOptions: [ 'face', 'ears', 'hairstyles', 'beard', 'eyebrows', 'eyes', 'lips', 'adjustments'],
    wardrobeOptions: [ 'head', 'shoulders', 'chest', 'back', 'legs', 'hands', 'feet']
  };

  render() {

    const { bodyOptions, headOptions, wardrobeOptions } = this.state;

    const bodyOpts = [];
    const headOpts = [];
    const wearOpts = [];

    bodyOptions.forEach((option, i) => {
      bodyOpts.push(
        {
          title: option,
          content: [
            i
          ].join(' ')
        },
      );
    });

    headOptions.forEach((option, i) => {
      headOpts.push(
        {
          title: option,
          content: [
            i
          ].join(' ')
        },
      );
    });

    wardrobeOptions.forEach((option, i) => {
      wearOpts.push(
        {
          title: option,
          content: [
            i
          ].join(' ')
        },
      );
    });

    return (
      <div className="user-model-customization">
        <Tabs selected={0}>
          <Pane label="Body">
            <Accordion defaultActiveIndex={0} panels={ bodyOpts } />
          </Pane>

          <Pane label="Head">
            <Accordion defaultActiveIndex={0} panels={ headOpts } />
          </Pane>

          <Pane label="Wardrobe">
            <Accordion defaultActiveIndex={0} panels={ wearOpts } />
          </Pane>
        </Tabs>
      </div>
    );
  }
};

export default UserModelCustomization
