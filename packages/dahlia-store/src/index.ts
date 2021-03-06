export { raw, action, isObservable } from 'dahlia-observable'
export { createStore } from './store'
export { observe } from './observe'
export { Observer } from './Observer'

if (typeof Proxy === 'undefined') {
  throw new Error('Require Proxy support.')
}
