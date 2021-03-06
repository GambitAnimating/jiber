``` javascript
{
  db: memoryDB,
  initialState: undefined,
  login: memAccounts,
  maxDocAge: 1000 * 60 * 60, // one hour
  port: 80,
  reducer: patcher,
  server: undefined,
  snapshotInterval: 5000 // five seconds
}
```

# port
The port to listen for incoming client connections on.

__Default__  
80
--------------------------------------------------------------------------------

# reducer
Your app logic.

__Default__  
``` javascript
(state: any = {}, action: Action): any => {
  switch (action.type) {
    case SET:
      if (typeof action.set !== 'object') return state
      return { ...state, ...action.set }
    default:
      return state
  }
}
```
--------------------------------------------------------------------------------

# login
A function to login users as they connect.

__Default__  
``` javascript
async (request, credential) => {
  return { uid: randStr(12) }
}
```
--------------------------------------------------------------------------------

# db
An instance of [DB](db.md). This controlls how jiber-server instances share and
store their data.

__Default__  
jiber-server/src/memory-db/memory-db.ts
--------------------------------------------------------------------------------

# snapshotInterval
How often to save  states to the db.

__Default__  
5000
--------------------------------------------------------------------------------

# maxDocAge
How long to store an inactive  in active memory before closing it.
(A closed  is still saved in the db, and can be re-opened)

__Default__  
360000
--------------------------------------------------------------------------------

# initialState
This setting can be used to restore a previously saved state.

__Default__  
undefined
