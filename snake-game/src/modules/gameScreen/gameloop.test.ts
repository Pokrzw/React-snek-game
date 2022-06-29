import { move, changeDirection, CheckForApple } from "./gameloop";



// describe('test move function', () => {
//     describe('move right', () => {
//         test('move right with no collision', () => {
//             const mockSnake = [{ y: 0, x: 0 }, { y: 1, x: 0 }, { y: 2, x: 0 }, { y: 2, x: 1 }, { y: 2, x: 2 }, { y: 3, x: 2 }]
//             expect(move('RIGHT', mockSnake)).toStrictEqual([{ "x": 0, "y": 1 }, { "x": 0, "y": 2 }, { "x": 1, "y": 2 }, { "x": 2, "y": 2 }, { "x": 2, "y": 3 }, { "x": 2, "y": 4 }])

//         })

//         test('move right with collision', () => {
//             const mockSnake = [{ y: 18, x: 0 }, { y: 19, x: 0 }, { y: 20, x: 0 }]
//             expect(move('RIGHT', mockSnake)).toBeFalsy()

//         })
//     })
//     describe('move left', () => {
//         test('move left with no collision', () => {
//             const mockSnake = [{ y: 10, x: 1 }, { y: 10, x: 2 }, { y: 10, x: 3 }]
//             expect(move('LEFT', mockSnake)).toStrictEqual([{ y: 10, x: 2 }, { y: 10, x: 3 }, { y: 9, x: 3 }])

//         })

//         test('move left with collision', () => {
//             const mockSnake = [{ y: 2, x: 0 }, { y: 1, x: 0 }, { y:0, x: 0 }]
//             expect(move('LEFT', mockSnake)).toBeFalsy()

//         })
//     })
//     describe('move up', () => {
//         test('move up with no collision', () => {
//             const mockSnake = [{ y: 0, x: 0 }, { y: 1, x: 0 }, { y: 2, x: 0 }]
//             expect(move('UP', mockSnake)).toStrictEqual([{ "x": 0, "y": 1 }, { "x": 0, "y": 2 }, { "x": 1, "y": 2 }, { "x": 2, "y": 2 }, { "x": 2, "y": 3 }, { "x": 2, "y": 4 }])

//         })

//         test('move up with collision', () => {
//             const mockSnake = [{ y: 18, x: 0 }, { y: 19, x: 0 }, { y: 20, x: 0 }]
//             expect(move('UP', mockSnake)).toBeFalsy()

//         })
//     })
    // describe('move down', () => {
    //     test('move down with no collision', () => {
    //         const mockSnake = [{ y: 0, x: 0 }, { y: 1, x: 0 }, { y: 2, x: 0 }, { y: 2, x: 1 }, { y: 2, x: 2 }, { y: 3, x: 2 }]
    //         expect(move('DOWN', mockSnake)).toStrictEqual([{ "x": 0, "y": 1 }, { "x": 0, "y": 2 }, { "x": 1, "y": 2 }, { "x": 2, "y": 2 }, { "x": 2, "y": 3 }, { "x": 2, "y": 4 }])

    //     })

    //     test('move down with collision', () => {
    //         const mockSnake = [{ y: 18, x: 18 }, { y: 18, x: 19 }, { y: 18, x: 20 }]
    //         expect(move('DOWN', mockSnake)).toBeFalsy()

    //     })
    // })
// })

describe('test changeDirecion function', () => {

    test('change direction arrow case', () => {
        const eventObject = { key: 'ArrowUp' }
        expect(changeDirection(eventObject)).toBe('UP')
    })

    test('change direction default case', () => {
        const eventObject = { key: 'mock' }
        expect(changeDirection(eventObject)).toBe('RIGHT')
    })
})


describe('test check for apple', () => {
    const appleCords = { x: 10, y: 12 }

    test('snake and apple coordinates align', () => {
        const headCords = { x: 10, y: 12 }
        expect(CheckForApple(headCords, appleCords)).toBe(true)
    })

    test('snake and apple coordinates do not align', () => {
        const headCords = { x: 10, y: 10 }
        expect(CheckForApple(headCords, appleCords)).toBe(false)
    })
})