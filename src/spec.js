import { createStore, dispatch } from './index.js';
import { expect } from 'chai';

describe('dispatch', () => {
  it('is a function', () => {
    expect(typeof(dispatch)).to.equal('function')
  });
});

describe('createStore', () => {
  const states = [];
  let sandbox;
  before(() => {
    sandbox = document.createElement('div');
    sandbox.setAttribute('id', 'sandbox');
    document.body.appendChild(sandbox);
  });

  afterEach(() => {
    sandbox.innerHTML = '';
    states.splice(0, states.length);
  });

  it('calls reducers and builds a new state', (done) => {
    const element = document.createElement('div');
    sandbox.appendChild(element);
    const foo = (state, { bar }) => {
      return Object.assign({}, state, {bar});
    }
    const store = createStore(element, { foo }, {});
    dispatch(element, 'foo', {bar: 'baz'});
    setTimeout(() => {
      expect(store.state.bar).to.equal('baz');
      done();
    });
  });

  it("calls subscribers for matched selectors", (done) => {
    const element = document.createElement('div');
    sandbox.appendChild(element);
    const subscriberElement = document.createElement('div');
    subscriberElement.setAttribute('id', 'subscriber');
    element.appendChild(subscriberElement)
    let calledSubscriber = false;
    let calledSubscriberWithoutElement = false;
    const subscribers = {
      "#subscriber": ({ bar }, el) => {
        calledSubscriber = true;
        el.setAttribute("bar", bar)
      },
      "#notfound": (state, el) => {
        calledSubscriberWithoutElement = true;
      }
    };
    const foo = (state, { bar }) => {
      return Object.assign({}, state, {bar});
    }
    createStore(element, { foo }, subscribers);
    dispatch(element, 'foo', {bar: 'baz'});
    setTimeout(() => {
      debugger;
      expect(calledSubscriber).to.be.true;
      expect(subscriberElement.getAttribute('bar')).to.equal('baz');
      expect(calledSubscriberWithoutElement).to.be.false;
      done();
    });
  });

  it('preserves new state with multiple events', (done) => {
    const element = document.createElement('div');
    sandbox.appendChild(element);
    const foo = (state, { foo }) => {
      return Object.assign({}, state, {foo});
    }
    const bar = (state, { bar }) => {
      return Object.assign({}, state, {bar});
    }
    const store = createStore(element, { foo, bar }, {});
    dispatch(element, 'foo', {foo: 'bar'});
    setTimeout(() => {
      expect(store.state.foo).to.equal('bar');
      expect(store.state.bar).to.equal('foo');
      done();
    });
    dispatch(element, 'bar', {bar: 'foo'});
  });

});