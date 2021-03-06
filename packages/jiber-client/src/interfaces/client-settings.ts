import { Reducer, Middleware } from 'jiber-core'
import { ActionCreators } from './action-creators'

/**
 * The settings passed in will have their gaps filled with defaults
 * to create an object that always confirms to this interface
 */
export interface ClientSettings {

  /**
   * Attach helper functions to your doc instances.
   * @example actionCreators: {
   *   sayHello: () => ({type: 'HELLO'})
   * }
   */
  actionCreators: ActionCreators,
  backoffMs: number,
  credential?: string
  initialState: any,
  maxPeers: number,
  middleware: Array<Middleware>,
  reducer: Reducer,
  stunServers: string[],
  url?: string
}
