import { Action, User, LOGIN_RESULT } from 'jiber-core'

/**
 * Keep track of the currently logged in user
 * @hidden
 */
export const me = (state: User, action: Action): User => {
  switch (action.type) {
    case LOGIN_RESULT:
      return action.user

    default:
      return state
  }
}
