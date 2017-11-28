import React from 'react'
import { List } from 'semantic-ui-react'

const OnlineStatus = () => (
  <List selection verticalAlign='middle'>
    <List.Item>
      <List.Icon name='bullseye' color='teal' />
      <List.Content>
        <List.Header as='a'>Show</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='bullseye' color='yellow' />
      <List.Content>
        <List.Header as='a'>Away</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='bullseye' color='red' />
      <List.Content>
        <List.Header as='a'>Busy</List.Header>
        <List.Description as='a'>Do NOT Disturb</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='bullseye' color='grey' />
      <List.Content>
        <List.Header as='a'>Hide</List.Header>
        <List.Description>You ARE Invisible</List.Description>
      </List.Content>
    </List.Item>
  </List>
)

export default OnlineStatus;
