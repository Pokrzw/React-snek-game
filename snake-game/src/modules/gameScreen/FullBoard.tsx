import '../../stylesheets/gameStyles.scss'
import { useEffect, useState } from 'react'
import { gameState, generateRandomCords, move, changeDirection, CheckForApple, expandSnake } from './gameloop'
import BoardCell from './BoardCell'
const FullBoard = () => {


    interface coordinates {
        x: number,
        y: number
    }

    interface block {  
        id: string,
        coordinates: coordinates,
        category: string
    }


    const createBoard = (applecords:coordinates, snakeCoords:coordinates[]): block[] => {
        let board: block[] = []
        for(let i=0;i<20;i++){
            for(let j=0;j<20;j++){
                let curBlock: block = { id: `${j}.${i}` ,coordinates: { x: j, y: i }, category: 'floorTile' }
                if(i===applecords.x && j===applecords.y){
                    curBlock.category = 'apple'
                }
                snakeCoords.map((cordSet:coordinates) => {
                    if(i===cordSet.x && j===cordSet.y){
                        curBlock.category = 'snake'
                    }
                })
                board.push(curBlock)
            }   
        }
        return board
    }
    

    
    const [board, setBoard] = useState<block[]>([]);
    const [gameNotOver, setGameNotOver] = useState<boolean>(true);
    const [curDir, setCurDir] = useState<string>('RIGHT');



    useEffect(() => {

        const initialAppleCords = generateRandomCords()
        gameState.appleCoordinates = initialAppleCords
        setBoard(createBoard(gameState.appleCoordinates, gameState.snakeCoordinates))

        window.addEventListener('keydown', (e) => {
            gameState.curDir = changeDirection(e)
        });  

        setInterval(() => {

                const snakeMove = move(gameState.curDir, gameState.snakeCoordinates)
                if (snakeMove.length === 1) {setGameNotOver(false)}

                else{
                    gameState.snakeCoordinates = move(gameState.curDir, gameState.snakeCoordinates)
                    setBoard(createBoard(gameState.appleCoordinates, gameState.snakeCoordinates))
                    
                    const snakeHead:coordinates[] = [...gameState.snakeCoordinates]
                    const snakeHeadCords:coordinates = gameState.snakeCoordinates[gameState.snakeCoordinates.length-1]
                    if(CheckForApple( snakeHeadCords, gameState.appleCoordinates)){
                        gameState.points ++;
                        
                        gameState.snakeCoordinates.unshift(expandSnake(gameState.snakeCoordinates))
                        gameState.appleCoordinates = generateRandomCords()
                    }

                }
                   
          }, 500);
        
    }, []);

    return (
        <div className="FullBoard">
            {
                gameNotOver?
                board.map((block) => {
                    return (
                        <BoardCell key={`${block.coordinates.x}.${block.coordinates.y}`} id={`${block.coordinates.x}.${block.coordinates.y}`} coordinates={block.coordinates} category={block.category} />
                        
                    )
                }) :
                <>GAME OVER</>
            }
        </div>
    );
}

export default FullBoard;