import { createServer } from '../../actions/servers';
import * as types from '../../types';

describe('adding a server to the db', () => {
  it('should create an action to add a server to the db', () => {
    const server = {
      name: 'Server1'
    }
    const action = {
      type: types.SERVER_CREATED,
      server,
    }
    expect(createServer(server)).toEqual(action)
  })
})
