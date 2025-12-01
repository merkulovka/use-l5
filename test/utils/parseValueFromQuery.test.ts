import { describe, expect, it } from 'vitest'
import { parseValueFromQuery } from '../../src/runtime/utils/parseValueFromQuery'

describe('parseValueFromQuery', () => {
    it('String', () => {
        expect(parseValueFromQuery('', String)).toBe(null)
        expect(parseValueFromQuery('1', String)).toBe('1')
        expect(parseValueFromQuery('null', String)).toBe('null')
        expect(parseValueFromQuery('test', String)).toBe('test')
    })

    it('Number', () => {
        expect(parseValueFromQuery('', Number)).toBe(null)
        expect(parseValueFromQuery('1', Number)).toBe(1)
        expect(parseValueFromQuery('0', Number)).toBe(0)
        expect(parseValueFromQuery('010', Number)).toBe(10)
        expect(parseValueFromQuery('kirill', Number)).toBe(null)
    })
    it('boolean', () => {
        expect(parseValueFromQuery('1', Boolean)).toBe(true)
        expect(parseValueFromQuery('true', Boolean)).toBe(true)
        expect(parseValueFromQuery('0', Boolean)).toBe(false)
        expect(parseValueFromQuery('false', Boolean)).toBe(false)
        expect(parseValueFromQuery('', Boolean)).toBe(false)
    })

    it('[String]', () => {
        expect(parseValueFromQuery('nuxt', [String])).toEqual(['nuxt'])
        expect(parseValueFromQuery(['nuxt', 'vue'], [String])).toEqual(['nuxt', 'vue'])
        expect(parseValueFromQuery('', [String])).toEqual([])
    })

    it('[Number]', () => {
        expect(parseValueFromQuery('1', [Number])).toEqual([1])
        expect(parseValueFromQuery('kirill', [Number])).toEqual([])
        expect(parseValueFromQuery(['10', '101'], [Number])).toEqual([10, 101])
        expect(parseValueFromQuery(['10', 'bags', '101'], [Number])).toEqual([10, 101])
        expect(parseValueFromQuery('', [Number])).toEqual([])
    })
})
