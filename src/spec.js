import { connect, dispatch } from './index.js';
import { expect } from 'chai';

describe('dispatch', () => {
  it('is a function', () => {
    expect(typeof(dispatch)).to.equal('function')
  });
});

describe('connect', () => {
  const states = [];
  before(() => {
    document.addEventListener('stateChange', ({detail: state}) => {
      states.push(state);
    })
  });
  afterEach(() => {
    states.splice(0, states.length);
  });

  it('calls reducers and builds a new state', (done) => {
    const foo = (state, { bar }) => {
      return Object.assign({}, state, {bar});
    }
    connect({ foo }, {});
    dispatch('foo', {bar: 'baz'});
    setTimeout(() => {
      console.log(states);
      expect(states.pop().bar).to.equal('baz');
      done();
    });
  });
  
  it('preserves new state with multiple events', (done) => {
    const foo = (state, { foo }) => {
      return Object.assign({}, state, {foo});
    }
    const bar = (state, { bar }) => {
      return Object.assign({}, state, {bar});
    }
    connect({ foo, bar }, {});
    dispatch('foo', {foo: 'bar'});
    setTimeout(() => {
      const state = states.pop(); 
      expect(state.foo).to.equal('bar');
      expect(state.bar).to.equal('foo');
      done();
    });
    dispatch('bar', {bar: 'foo'});
  });
});