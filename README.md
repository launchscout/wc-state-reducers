# wc-fluxish

wc-fluxish is a very small library for managing state in an application built with 
web components. It roughly follows the flux pattern. It expects web components to:

* get data passed to them via properties or attributes
* render appropriately when new data is given to them
* emit custom events when something happens that may change state

wc-fluxish uses Custom Events in place of actions. It emits a custom event, `stateChange` on new state changes. It exports two functions:

`connect(reducers, subscribers)`

where reducers are an object whose keys are custom event names, and values are functions of the form `(currentState, eventDetail) => newState`. The eventDetail is the detail property of the CustomEvent.

`dispatch(name, eventDetail)`

This is a lil helper function which dispatches a bubbling custom event (this is important!) with the specified name an detail.