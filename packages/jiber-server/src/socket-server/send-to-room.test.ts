import { sendToDoc } from './send-to-'
import { createServerStore } from '../server-store'
import * as sts from './send-to-socket'

const stsa = sts as any
let calls: any[] = []

beforeEach(() => {
  calls = []
  stsa._sendToSocket = sts.sendToSocket
  stsa.sendToSocket = (getState: any, socketId: any, action: any) => {
    calls.push([getState, socketId, action])
  }
})

afterEach(() => {
  stsa._sendToSocket = sts.sendToSocket
})

test('call sendToSocket for every member of a ', () => {
  const store = createServerStore({initialState: {
    1: {
      members: {
        user1: { uid: 'user1', actionId: 0 },
        user2: { uid: 'user2', actionId: 0 }
      },
      state: undefined,
    }
  }})
  sendToDoc(store, '1', { type: 'hi' })
  expect(calls).toEqual([
    ['s1', { type: 'hi' }],
    ['s2', { type: 'hi' }]
  ])
})

test('do nothing if  does not exist', () => {
  const store = createServerStore({initialState: {}})
  sendToDoc(store, '1', { type: 'hi' })
  expect(calls).toEqual([])
})

test('only send to users that exist', () => {
  const store = createServerStore({initialState: {
    1: {
      members: {
        user1: { uid: 'user1', actionId: 0 },
        user2: { uid: 'user2', actionId: 0 }
      },
      state: undefined,
    }
  }})
  sendToDoc(store, '1', { type: 'hi' })
  expect(calls).toEqual([
    ['s2', { type: 'hi' }]
  ])
})
