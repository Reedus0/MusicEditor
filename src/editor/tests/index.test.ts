import { arraySort } from "../utils"

describe('Utils tests', () => {

    it('Merge sort test1', () => {
        expect(arraySort([3, 7, 1, 2, 12, 87])).toEqual([1, 2, 3, 7, 12, 87])
    })
})