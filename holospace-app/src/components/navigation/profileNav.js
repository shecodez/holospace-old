import React from "react";
import { Button, Label } from "semantic-ui-react";

const ProfileNav = () => (
  <div className="profile-nav">
    <div>
      <Label.Group className="user-roles">
        <Label as='a' color='violet'>
          Customize
        </Label>
        <Label as='a' basic color='violet'>
          Friends
        </Label>
      </Label.Group>
    </div>

    <Button.Group>
      <Button icon="bell outline" />
      <Button icon="search" />
      <Button icon="calendar plus" />
    </Button.Group>
  </div>
);

export default ProfileNav;
