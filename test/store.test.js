/**
 * @jest-environment node
 */
import { jest, test, expect } from '@jest/globals'
import { update, get } from 'bricks-fp'
import { join2, setAsUpdated, updatesIncByPath } from '../src/common/store'

test('test updatesIncByPath', () => {
    let a = {}

    updatesIncByPath(a, [1, 2, 3])
    expect(a).toStrictEqual({
        1: { i: 1, j: 0, childs: { 2: { i: 1, j: 0, childs: { 3: { i: 1, j: 0, childs: {} } } } } }
    })

    updatesIncByPath(a, [1, 2, 3])
    expect(a).toStrictEqual({
        1: { i: 2, j: 0, childs: { 2: { i: 2, j: 0, childs: { 3: { i: 2, j: 0, childs: {} } } } } }
    })

    updatesIncByPath(a, [1, 2])
    expect(a).toStrictEqual({
        1: { i: 3, j: 0, childs: { 2: { i: 3, j: 0, childs: { 3: { i: 2, j: 0, childs: {} } } } } }
    })

    updatesIncByPath(a, [1])
    expect(a).toStrictEqual({
        1: { i: 4, j: 0, childs: { 2: { i: 3, j: 0, childs: { 3: { i: 2, j: 0, childs: {} } } } } }
    })

    updatesIncByPath(a, [1, 5])
    expect(a).toStrictEqual({
        1: {
            i: 5,
            j: 0,
            childs: {
                5: { i: 1, j: 0, childs: {} },
                2: { i: 3, j: 0, childs: { 3: { i: 2, j: 0, childs: {} } } }
            }
        }
    })

    update(a, join2([1, 5]), setAsUpdated)
    expect(a).toStrictEqual({
        1: {
            i: 5,
            j: 0,
            childs: {
                5: { i: 1, j: 1, childs: {} },
                2: { i: 3, j: 0, childs: { 3: { i: 2, j: 0, childs: {} } } }
            }
        }
    })

    update(a, join2([1, 2, 3]), setAsUpdated)
    expect(a).toStrictEqual({
        1: {
            i: 5,
            j: 0,
            childs: {
                5: { i: 1, j: 1, childs: {} },
                2: { i: 3, j: 0, childs: { 3: { i: 2, j: 2, childs: {} } } }
            }
        }
    })
})
