export const dispatch = (element, event, payload) => {
  element.dispatchEvent(new CustomEvent(event, {
    bubbles: true,
    detail: payload,
    composed: true
  }));
};

export const createStore = (element, reducers, initialState = {}) => {
  const store = {
    subscribers: [],
    state: initialState,
    subscribe(subscriber) {
      this.subscribers.push(subscriber);
      this.stateChange(this.state);
    },
    stateChange() {
      this.subscribers.forEach((subscriber) => subscriber(store.state));
    }
  };

  Object.keys(reducers).forEach((key) => {
    element.addEventListener(key, ({ detail }) => {
      store.state = reducers[key](store.state, detail, dispatch);
      store.stateChange();
    });
  });
  return store;
};
