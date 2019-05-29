# wc-state-reducers

wc-state-reducers is a very small library for managing state in an application built with 
web components. It expects web components to:

* get data passed to them via properties or attributes
* render appropriately when new data is given to them
* emit Custom Events when something happens that may change state

wc-state-reducers exports a createStore function as follows:

`createStore(element, reducers, subscribers, initialState?)`

The `element` is a DOMElement which "owns" the store in the sense that `stateChange` events are dispatched from this element. If you only need a single store for the page, it is fine to use `document`.

The `reducers` argument is an object whose keys are custom event names, and values are functions of the form `(currentState, eventDetail) => newState`. The eventDetail is the detail property of the CustomEvent. The `currentState` argument is the existing application state which may be destructured to pick off specific elements a given reducer is interested in. The return value is the new application state which is used as the payload in a `stateChange` Custom Event.

The store object returned has the following functions:

* `subscribe`, which expects to receive a function which will get invoked with the current state as an argument on state changes.

This module also exports: 

`dispatch(element, name, eventDetail)`

This is a lil helper function which dispatches a bubbling custom event (this is important!) with the specified name and detail.

## Example

To see it in action: 
* [Total Weight](https://github.com/gaslight/wc-state-reducers-example)
* [Tic Tac Toe](https://github.com/gaslight/litelement-tic-tac-toe)