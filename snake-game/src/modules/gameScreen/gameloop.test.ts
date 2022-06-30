import { move, changeDirection, CheckForApple, checkCollision } from "./gameloop";


describe('test collision', () => {
    test('no collision', () => {
        const testCords = [
            {
                "x": 9,
                "y": 6
            },
            {
                "x": 6,
                "y": 10
            },
            {
                "x": 6,
                "y": 9
            }
        ]

        expect(checkCollision(testCords)).toBe(false)
    })

    test('collision', () => {
        const testCords = [
            {
                "x": 9,
                "y": 6
            },
            {
                "x": 6,
                "y": 10
            },
            {
                "x": 9,
                "y": 6
            }
        ]
        expect(checkCollision(testCords)).toBe(true)
    })
})

describe('test move', () => {
    describe('move with one element', () => {
        describe('no collision', () => {
            const headCords = [{ y: 10, x: 10 }]
            test('move right no collision', () => {
                expect(move('RIGHT', headCords)).toStrictEqual([{ y: 11, x: 10 }])
            })
            test('move left no collision', () => {
                expect(move('LEFT', headCords)).toStrictEqual([{ y: 9, x: 10 }])
            })
            test('move up no collision', () => {
                expect(move('UP', headCords)).toStrictEqual([{ y: 10, x: 9 }])
            })
            test('move down no collision', () => {
                expect(move('DOWN', headCords)).toStrictEqual([{ y: 10, x: 11 }])
            })
        })

        describe('collision', () => {

            test('move right collision', () => {
                const headCords = [{ y: 20, x: 0 }]
                expect(move('RIGHT', headCords)).toStrictEqual([{ y: -1, x: -1 }])
            })
            test('move left collision', () => {
                const headCords = [{ y: 0, x: 0 }]
                expect(move('LEFT', headCords)).toStrictEqual([{ y: -1, x: -1 }])
            })
            test('move up collision', () => {
                const headCords = [{ y: 0, x: 0 }]
                expect(move('UP', headCords)).toStrictEqual([{ y: -1, x: -1 }])
            })
            test('move down collision', () => {
                const headCords = [{ y: 0, x: 20 }]
                expect(move('DOWN', headCords)).toStrictEqual([{ y: -1, x: -1 }])
            })
        })
    })

    describe('move with more than one element', () => {

        describe('no collision', () => {
            const snakeWith2ElementsHorizontal = [{ y: 10, x: 10 }, { y: 11, x: 10 }]
            const snakeWith2ElementsVertical = [{ y: 10, x: 10 }, { y: 10, x: 11 }]
            const snakeWIth5Elements = [{ y: 2, x: 2 }, { y: 2, x: 3 }, { y: 3, x: 3 }, { y: 4, x: 3 }, { y: 4, x: 4 }]
            const snakeWIth5ElementsGoingUp = [{ y: 2, x: 2 }, { y: 2, x: 3 }, { y: 3, x: 3 }, { y: 4, x: 3 }, { y: 4, x: 2 }]

            describe('horizontal 2 piece', () => {
                test('move right no collision', () => {
                    expect(move('RIGHT', snakeWith2ElementsHorizontal)).toStrictEqual([{ y: 11, x: 10 }, { y: 12, x: 10 }])
                })
                test('move left no collision', () => {
                    expect(move('LEFT', snakeWith2ElementsHorizontal)).toStrictEqual([{ y: 11, x: 10 }, { y: 10, x: 10 }])
                })
                test('move up no collision', () => {
                    expect(move('UP', snakeWith2ElementsHorizontal)).toStrictEqual([{ y: 11, x: 10 }, { y: 11, x: 9 }])
                })
                test('move down no collision', () => {
                    expect(move('DOWN', snakeWith2ElementsHorizontal)).toStrictEqual([{ y: 11, x: 10 }, { y: 11, x: 11 }])
                })
            })
            describe('vertical 2 piece', () => {
                test('move right no collision', () => {
                    expect(move('RIGHT', snakeWith2ElementsVertical)).toStrictEqual([{ y: 10, x: 11 }, { y: 11, x: 11 }])
                })
                test('move left no collision', () => {
                    expect(move('LEFT', snakeWith2ElementsVertical)).toStrictEqual([{ y: 10, x: 11 }, { y: 9, x: 11 }])
                })
                test('move up no collision', () => {
                    expect(move('UP', snakeWith2ElementsVertical)).toStrictEqual([{ y: 10, x: 11 }, { y: 10, x: 10 }])
                })
                test('move down no collision', () => {
                    expect(move('DOWN', snakeWith2ElementsVertical)).toStrictEqual([{ y: 10, x: 11 }, { y: 10, x: 12 }])
                })

            })
            describe('5 piece', () => {
                test('move right no collision', () => {
                    expect(move('RIGHT', snakeWIth5Elements)).toStrictEqual([{ y: 2, x: 3 }, { y: 3, x: 3 }, { y: 4, x: 3 }, { y: 4, x: 4 }, { y: 5, x: 4 }])
                })
                test('move left no collision', () => {
                    expect(move('LEFT', snakeWIth5Elements)).toStrictEqual([{ y: 2, x: 3 }, { y: 3, x: 3 }, { y: 4, x: 3 }, { y: 4, x: 4 }, { y: 3, x: 4 }])
                })
                test('move up no collision', () => {
                    expect(move('UP', snakeWIth5ElementsGoingUp)).toStrictEqual([{ y: 2, x: 3 }, { y: 3, x: 3 }, { y: 4, x: 3 }, { y: 4, x: 2 }, { y: 4, x: 1 }])
                })
                test('move down no collision', () => {
                    expect(move('DOWN', snakeWIth5Elements)).toStrictEqual([{ y: 2, x: 3 }, { y: 3, x: 3 }, { y: 4, x: 3 }, { y: 4, x: 4 }, { y: 4, x: 5 }])
                })

            })
        })

        describe('collision', () => {
            const snakeW2SegmentsStart = [{y:1,x:0},{y:0,x:0}]
            const snakeW2SegmentsEnd = [{y:20,x:19},{y:20,x:20}]
            test('move right with collision', ()=>{
                expect(move('RIGHT',snakeW2SegmentsEnd)).toStrictEqual([{ y: -1, x: -1 }])
            })
            test('move left with collision', ()=>{
                expect(move('LEFT',snakeW2SegmentsStart)).toStrictEqual([{ y: -1, x: -1 }])
            })
            test('move up with collision', ()=>{
                expect(move('UP',snakeW2SegmentsStart)).toStrictEqual([{ y: -1, x: -1 }])
            })
            test('move down with collision', ()=>{
                expect(move('DOWN',snakeW2SegmentsEnd)).toStrictEqual([{ y: -1, x: -1 }])
            })
        })
    })
})

