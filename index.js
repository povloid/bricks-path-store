import { assign_, get, set_, thread, update_ } from 'bricks-fp'

// const inc = (m) => {
//     m.i += 1
//     return m
// }

// export const updatesIncByPath = (obj, [head, ...rest]) => {
//     if (!head) {
//         return obj
//     }

//     const nextObj = inc(obj[head] || { i: 0, j: 0, childs: {} })
//     obj[head] = update(nextObj, ['childs'], updatesIncByPath, rest)
//     return obj
// }

// export const setAsUpdated = (m) => {
//     m.j = m.i
//     return m
// }

export default class PathStore {
    constructor(initState) {
        this.state = initState
        this.listeners = {}
        this.keySeq = 0
    }

    addChangeStateListener(fun) {
        const key = this.keySeq++
        this.listeners[key] = fun
        return key
    }

    removeChangeStateListener(key) {
        delete this.listeners[key]
    }

    runChageListeners(path) {
        Object.values(this.listeners).forEach((fun) => fun({ state: this.state, path }))
    }

    getState() {
        return this.state
    }

    getStateIn(path, defaultValue) {
        return get(this.state, path, defaultValue)
    }

    updateState(fun, ...args) {
        this.state = thread({}, assign_(this.state), (o) => fun(o, ...args))
        this.runChageListeners([])
        return this
    }

    setStateIn(path, value) {
        this.state = thread({}, assign_(this.state), set_(path, value))
        this.runChageListeners(path)
        return this
    }

    updateStateIn(path, fun, ...args) {
        this.state = thread({}, assign_(this.state), update_(path, fun, ...args))
        this.runChageListeners(path)
        return this
    }
}
