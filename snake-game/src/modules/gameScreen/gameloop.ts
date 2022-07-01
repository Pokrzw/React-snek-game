interface coordinates {
    x: number,
    y: number
}

interface block {
    id: string,
    coordinates: coordinates,
    category: string
}
export const generateRandomCords = (): coordinates => {
    return {
        y: Math.floor(Math.random() * (20 - 2) + 1),
        x: Math.floor(Math.random() * (20 - 2) + 1)
    }
}

export const gameState = {
    snakeCoordinates: [{ y: 0, x: 0 }],
    appleCoordinates: generateRandomCords(),
    mineCoordinates: {
        y: 18,
        x: 18,
    },
    speed: 0,
    points: 0,
    curDir: 'RIGHT'
}


export const expandSnake = (snakeCords: coordinates[], curentDir: string): coordinates => {
    const tail = snakeCords[0]
    let newTail: coordinates = { x: 0, y: 0 };
    switch (curentDir) {

        case 'RIGHT':
            if (tail.y > 0) {
                newTail = { y: tail.y - 1, x: tail.x }
            } else {
                if (tail.x < 20) {
                    newTail = { y: tail.y, x: tail.x + 1 }
                } else {
                    newTail = { y: tail.y, x: tail.x - 1 }
                }
            }
            break;
        case 'LEFT':
            if (snakeCords[0].y < 20) {
                newTail = { y: tail.y + 1, x: tail.x }
            } else {
                if (snakeCords[0].x < 20) {
                    newTail = { y: tail.y, x: tail.x + 1 }
                } else {
                    newTail = { y: tail.y, x: tail.x - 1 }
                }
            }
            break;
        case 'UP':
            if (snakeCords[0].x > 0) {
                newTail = { y: tail.y, x: tail.x + 1 }
            } else {
                if (snakeCords[0].y < 20) {
                    newTail = { y: tail.y + 1, x: tail.x }
                } else {
                    newTail = { y: tail.y - 1, x: tail.x }
                }
            }
            break;
        case 'DOWN':
            if (snakeCords[0].x < 20) {
                newTail = { y: tail.y, x: tail.x - 1 }
            } else {
                if (snakeCords[0].y < 20) {
                    newTail = { y: tail.y + 1, x: tail.x + 1 }
                } else {
                    newTail = { y: tail.y - 1, x: tail.x - 1 }
                }
            }
            break;

    }

    return newTail;
}

export const move = (direction: string, snakeCords: coordinates[]): coordinates[] => {
    let newSnakePositions: coordinates[] = [];
    if (snakeCords.length === 1) {
        switch (direction) {
            case 'RIGHT':
                if (snakeCords[0].y < 20) {
                    newSnakePositions.unshift({ ...snakeCords[0], y: snakeCords[0].y + 1 })
                }
                else { return [{ y: -1, x: -1 }] }

                break;
            case 'LEFT':
                if (snakeCords[0].y > 0) { newSnakePositions.unshift({ ...snakeCords[0], y: snakeCords[0].y - 1 }) }
                else { return [{ y: -1, x: -1 }] }
                break;
            case 'UP':
                if (snakeCords[0].x > 0) { newSnakePositions.unshift({ ...snakeCords[0], x: snakeCords[0].x - 1 }) }
                else { return [{ y: -1, x: -1 }] }
                break;
            case 'DOWN':
                if (snakeCords[0].x < 20) { newSnakePositions.unshift({ ...snakeCords[0], x: snakeCords[0].x + 1 }) }
                else { return [{ y: -1, x: -1 }] }
                break;
        }
        return newSnakePositions
    }
    else {
        const head = snakeCords.length - 1
        for (let i = snakeCords.length - 1; i > 0; i--) {
            if (i === head) {
                switch (direction) {
                    case 'RIGHT':
                        if (snakeCords[head].y < 20) { newSnakePositions.unshift({ ...snakeCords[head], y: snakeCords[head].y + 1 }) }
                        else { return [{ x: -1, y: -1 }] }
                        break;
                    case 'LEFT':
                        if (snakeCords[head].y > 0) { newSnakePositions.unshift({ ...snakeCords[head], y: snakeCords[head].y - 1 }) }
                        else { return [{ x: -1, y: -1 }] }
                        break;
                    case 'UP':
                        if (snakeCords[head].x > 0) { newSnakePositions.unshift({ ...snakeCords[head], x: snakeCords[head].x - 1 }) }
                        else { return [{ x: -1, y: -1 }] }
                        break;
                    case 'DOWN':
                        if (snakeCords[head].x < 20) { newSnakePositions.unshift({ ...snakeCords[head], x: snakeCords[head].x + 1 }) }
                        else { return [{ x: -1, y: -1 }] }
                        break;
                    default:
                        return snakeCords

                }
                newSnakePositions.unshift(snakeCords[i])
            } else {
                newSnakePositions.unshift(snakeCords[i])
            }

        }
        return newSnakePositions
    }
}

export const changeDirection = (e: any): string => {
    switch (e.key) {
        case 'ArrowRight': return 'RIGHT'
        case 'ArrowLeft': return 'LEFT'
        case 'ArrowUp': return 'UP'
        case 'ArrowDown': return 'DOWN'
        default: return gameState.curDir
    }
}

export const checkCollision = (snakeCords: coordinates[]): boolean => {
    const head = snakeCords[snakeCords.length - 1]
    let answer = false;
    const tail = [...snakeCords]
    tail.pop()
    if(tail){
        tail.map((item:coordinates)=>{
            if(item.x === head.x && item.y === head.y){
                answer = true
            }
        })
    }
    return answer
}



export const CheckForApple = (snakeHead: coordinates, apple: coordinates): boolean => {
    return (snakeHead.x === apple.x) && (snakeHead.y === apple.y)
}


