import '../../stylesheets/gameStyles.scss'
import { useEffect, useState } from 'react'
import '../../stylesheets/globalstyles.scss'
import { gameState, generateRandomCords, move, changeDirection, checkCollision, CheckForApple, expandSnake } from './gameloop'
import BoardCell from './BoardCell'
import { useDispatch, useSelector } from 'react-redux'
import { Navigator, useNavigate } from 'react-router-dom'
import { Score, scoreState } from '../../redux/scoreReducer'

const FullBoard = () => {

    const scores = useSelector<scoreState, scoreState['scoreboard']>((state) => state.scoreboard)
    const navigate = useNavigate();
    const curPlayerid = scores[scores.length-1].id

    interface coordinates {
        x: number,
        y: number
    }

    interface block {
        id: string,
        coordinates: coordinates,
        category: string
    }

    
    const resetGame = () => {
        gameState.snakeCoordinates = [{ y: 0, x: 0 }]
        gameState.appleCoordinates = {
            x: Math.floor(Math.random() * (20 - 2) + 1),
            y: Math.floor(Math.random() * (20 - 2) + 1)
        }

        gameState.speed = 0
        gameState.points = 0
        gameState.curDir = 'RIGHT'
        setGameNotOver(true)

    }
    const createBoard = (applecords: coordinates, snakeCoords: coordinates[]): block[] => {
        let board: block[] = []
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                let curBlock: block = { id: `${j}.${i}`, coordinates: { x: j, y: i }, category: 'floorTile' }
                if (i === applecords.x && j === applecords.y) {
                    curBlock.category = 'apple'
                }
                snakeCoords.map((cordSet: coordinates) => {
                    if (i === cordSet.x && j === cordSet.y) {
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
    const dispatch = useDispatch()
    const moveSpeed = 1500*(0.8**(gameState.speed))

    useEffect(() => {
        const initialAppleCords = generateRandomCords()
        gameState.appleCoordinates = initialAppleCords
        setBoard(createBoard(gameState.appleCoordinates, gameState.snakeCoordinates))

    }, [gameNotOver]);

    useEffect(() => {

        window.addEventListener('keydown', (e) => {
            gameState.curDir = changeDirection(e)
        });


        setInterval(
            () => {
                const snakeMove = move(gameState.curDir, gameState.snakeCoordinates)
                if (snakeMove[0].x < 0 || checkCollision(gameState.snakeCoordinates)) { setGameNotOver(false) } 
                else {

                    gameState.snakeCoordinates = move(gameState.curDir, gameState.snakeCoordinates)
                    setBoard(createBoard(gameState.appleCoordinates, gameState.snakeCoordinates))
//KTORAS FUNKCJA Z JAKIEGOS POWODU WYWOLUJE SIE DWA RAZY - NAPRAWIC TO PRZESTANIE KLATKOWAC!!
                    const snakeHeadCords: coordinates = gameState.snakeCoordinates[gameState.snakeCoordinates.length - 1]
                    if (CheckForApple(snakeHeadCords, gameState.appleCoordinates)) {
                        gameState.points++;
                        gameState.snakeCoordinates.unshift(expandSnake(gameState.snakeCoordinates))
                        gameState.appleCoordinates = generateRandomCords()
                        gameState.speed = Math.floor(gameState.points/5)
                    }

                }
            }
            , 2000)
    }, []);

    return (
        <div className='arcade'>
            <p>SCORE: {gameState.points}</p>
            {gameNotOver ?
                <div className="FullBoard">
                    {board.map((block) => {
                        return (
                            <BoardCell key={`${block.coordinates.x}.${block.coordinates.y}`} id={`${block.coordinates.x}.${block.coordinates.y}`} coordinates={block.coordinates} category={block.category} />

                        )
                    })}
                </div>

                :
                <div className="gameOverScreen">
                    <h1>GAME OVER</h1>
                    <button className='button' onClick={() => { 
                        dispatch({type:"EDIT_SCORE", payload:{id:curPlayerid,score:gameState.points }})
                        resetGame()
                        navigate('/') 
                        }}>MAIN MENU</button>
                    
                        
                </div>

            }
        </div>
    );
}

export default FullBoard;