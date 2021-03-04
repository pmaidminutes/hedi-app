# HEDI Messaging Client
_= custom matrix client_

The original idea to _just use_ the [matrix-react-sdk](https://github.com/matrix-org/matrix-react-sdk) had to be omitted due to a couple of reasons:
* built as drop in sdk but as standalone webapp together with the element frontend (=skin)
* covers all features, however, we need to deliberately hide or customize some
* _grown_ codebase: a mix of different react styles, js and ts

## HEDI architecture

#### Naming and Nesting

since we also build upon [matrix-js-sdk](https://github.com/matrix-org/matrix-js-sdk)
and still want to lean on the react sdk the __naming__ of the components doesn't follow HEDI conventions but retain the names from the react sdk

### App / Component structure

The underlying matrix-js-sdk is a __pub/sub__ architecture, with the MatrixClient as bus, some backing __data stores__ and a minimal mutating object model.

This architecture creates some friction 'standard' react component composition, props nesting and state change detection.

matrix-react-sdk tackles this issue via big statefull class components, which sometimes grow to 2000 LOCs. (also a reason, it was hard to reuse only parts)

#### Approach

__props / data__ is always pulled from the matrix client. avoid storing in (state)hooks to avoid a different state between client and app 

split up the state into
* __subscription__: attaches and listens to events of the matrixClient, tracks properties of interest as a (partial state)
* __ui state__: isolate interaction state, should only trigger events on the client, subscription will pick up effects and set the state 
* __app state__: react-sdk introduced a couple of stores for component states which must be stored on local storage for ux (session view state)

a rough data flow schema would be something like
1. initialize component with props which fetched from matrix client
2. create and track state by listening to the appropriate events
3. handle interaction by calling the functions on matrix client, avoid sideeffects and don't wait for the async function results. client will raise events
4. track interaction and store user view state (scroll position, read markers, last visited rooms), reload this after 2. on next session