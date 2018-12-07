export const dispatch = (element, event, payload) => {
  element.dispatchEvent(new CustomEvent(event, {
    bubbles: true,
    detail: payload
  }));
};

export const createStore = (element, reducers, subscribers, initialState = {}) => {
  const store = { state: initialState };

  Object.keys(reducers).forEach((key) => {
    element.addEventListener(key, ({ detail }) => {
      store.state = reducers[key](store.state, detail, dispatch);
      element.dispatchEvent(new CustomEvent('stateChange', {detail: store.state}));
    });
  });

  element.addEventListener('stateChange', ({detail: state}) => {
    Object.keys(subscribers).forEach((key) => {
      const subscriberElement = element.querySelector(key);
      if (subscriberElement) { subscribers[key](state, subscriberElement); }
    });
  });

  element.dispatchEvent(new CustomEvent('stateChange', {detail: store.state}));
  return store;
};
