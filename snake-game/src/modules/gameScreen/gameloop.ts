interface coordinates {
    x: number,
    y: number
}

interface block {  
    id: string,
    coordinates: coordinates,
    category: string
}

export const gameState = {
    snakeLenght: 3,
    snakeCoordinates: [{ y: 0, x: 0 },{ y: 1, x: 0 },{ y: 2, x: 0 }],
    appleCoordinates: {
        x: Math.floor(Math.random() * (20 - 2) + 1), 
        y: Math.floor(Math.random() * (20 - 2) + 1)
    },
    speed: 0,
    points: 0,
    curDir: 'RIGHT'
}

export const expandSnake = (snakeCords: coordinates[]): coordinates => {
    const tail = snakeCords[0]
    const newTail:coordinates = {x:tail.x-1, y:tail.y}
    return newTail
}
export const move = (direction: string, snakeCords: coordinates[]): coordinates[] => {
    let newSnakePositions: coordinates[] = [];
    const head = snakeCords.length-1
    for(let i=snakeCords.length-1 ;i>0 ;i--){
           if(i===head){
            switch(direction){
                case 'RIGHT':
                    if(snakeCords[head].y<20){newSnakePositions.unshift({...snakeCords[head], y:snakeCords[head].y + 1})}
                    else{return [{x: -1, y:-1}]}
                break;
                case 'LEFT':
                    if(snakeCords[head].y>0){ newSnakePositions.unshift({...snakeCords[head], y:snakeCords[head].y - 1})}
                    else{return [{x: -1, y:-1}]}
                break;
                case 'UP':
                    if(snakeCords[head].x>0){ newSnakePositions.unshift({...snakeCords[head], x:snakeCords[head].x - 1})}
                    else{return [{x: -1, y:-1}]}
                break;
                case 'DOWN':
                    if(snakeCords[head].x<20){ newSnakePositions.unshift({...snakeCords[head], x:snakeCords[head].x + 1}) }
                    else{return [{x: -1, y:-1}]}
                break;
                default:
                    return snakeCords

            }
            newSnakePositions.unshift(snakeCords[i])
           } else{
            newSnakePositions.unshift(snakeCords[i])
           }

    }
    return newSnakePositions
}

export const changeDirection = (e: any):string => {
    switch (e.key) {
        case 'ArrowRight': return 'RIGHT'
        case 'ArrowLeft': return 'LEFT'
        case 'ArrowUp': return 'UP'
        case 'ArrowDown': return 'DOWN'
        default: return gameState.curDir
    }
}

// export const checkCollision = (snakeCords:coordinates[]):boolean => {
//     return new Set(snakeCords.map(x => `${x.x}.${x.y}`)).size !== snakeCords.map(x => `${x.x}.${x.y}`).length
// }

export const CheckForApple = (snakeHead:coordinates, apple: coordinates):boolean => {
    return (snakeHead.x===apple.x)  && (snakeHead.y===apple.y) 
}

export const generateRandomCords = ():coordinates => {
    return {
        x: Math.floor(Math.random() * (20 - 2) + 1), 
        y: Math.floor(Math.random() * (20 - 2) + 1)
    }
}



    // switch (direction) {
    //     case 'RIGHT':
    //         return snakeCords.map((coordinates:coordinates):coordinates => {
    //             if(coordinates.y<20){
    //                 return {...coordinates, y: coordinates.y + 1}
    //             } else {
    //                 return coordinates
    //             }
    //         })
    //     case 'LEFT':
    //         return snakeCords.map((coordinates:coordinates):coordinates => {
    //             if(coordinates.y>0){
    //                 return {...coordinates, y: coordinates.y - 1}
    //             } else {
    //                 return coordinates
    //             }
    //         })
    //     case 'UP':
    //         return snakeCords.map((coordinates:coordinates):coordinates => {
    //             if(coordinates.x>0){
    //                 return {...coordinates, x: coordinates.x - 1}
    //             } else {
    //                 return coordinates
    //             }
    //         })
    //     case 'DOWN':
    //         return snakeCords.map((coordinates:coordinates):coordinates => {
    //             if(coordinates.x<20){
    //                 return {...coordinates, x: coordinates.x + 1}
    //             } else {
    //                 return coordinates
    //             }
    //         });
    //     default:
    //         return snakeCords;
    // }