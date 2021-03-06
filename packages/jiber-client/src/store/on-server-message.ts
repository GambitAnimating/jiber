import {
  Action,
  LOGIN_RESULT,
  OPEN,
  SERVER,
  SELF,
  forEach
} from 'jiber-core'
import { ClientStore } from '../store/client-store'

/**
 * Trigger special behaviors for certain actions from the server
 * @hidden
 */
export const onServerMessage = (store: ClientStore) => (event: MessageEvent) => {
  const action: Action = JSON.parse(event.data)
  action.$src = SERVER

  if (action.type === LOGIN_RESULT) {
    const state = store.getState()

    // re-open docs
    forEach(state.optimisticDocs, (_doc, docId) => {
      store.dispatch({ type: OPEN, $doc: docId })
    })

    // re-send pending actions
    state.optimisticActions.forEach((pendingAction) => {
      if (pendingAction.$src === SELF) {
        store.dispatch(pendingAction)
      }
    })
  }

  store.dispatch(action)
}
