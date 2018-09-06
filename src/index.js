export const dispatch = (event, payload) => {
  document.dispatchEvent(new CustomEvent(event, {
    bubbles: true,
    detail: payload
  }));
};

export const connect = (reducers, subscribers, initialState = {}) => {
  const store = { state: initialState };

  Object.keys(reducers).forEach((key) => {
    document.addEventListener(key, ({ detail }) => {
      store.state = reducers[key](store.state, detail, dispatch);
      document.dispatchEvent(new CustomEvent('stateChange', {detail: store.state}));
    });
  });

  Object.keys(subscribers).forEach((key) => {
    document.addEventListener('stateChange', ({detail: state}) => {
      const element = document.querySelector(key);
      subscribers[key](state, element);
    });
  });

  document.dispatchEvent(new CustomEvent('stateChange', {detail: store.state}));
};
