import '../../stylesheets/gameStyles.scss'
import { useEffect, useRef, useState } from 'react'
import '../../stylesheets/globalstyles.scss'
import { generateRandomCords, move, changeDirection, checkCollision, CheckForApple, expandSnake, gameState } from './gameloop'
import BoardCell from './BoardCell'
import { useDispatch, useSelector } from 'react-redux'
import { Navigator, useNavigate } from 'react-router-dom'
import { Score, scoreState } from '../../redux/scoreReducer'

const FullBoard = () => {

    const scores = useSelector<scoreState, scoreState['scoreboard']>((state) => state.scoreboard)
    const navigate = useNavigate();
    const [points, setPoints] = useState<number>(0);
    const curPlayerid = scores[scores.length - 1].id

    interface coordinates {
        x: number,
        y: number
    }

    interface gameState { snakeCoordinates: { y: number; x: number; }[]; appleCoordinates: { y: number; x: number; }; speed: number; points: number; curDir: string; }
    interface block {
        id: string,
        coordinates: coordinates,
        category: string
    }


    const createBoard = (bombcords: coordinates, applecords: coordinates, snakeCoords: coordinates[]): block[] => {
        let board: block[] = []
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                let curBlock: block = { id: `${j}.${i}`, coordinates: { y: j, x: i }, category: 'floorTile' }
                if (i === applecords.x && j === applecords.y) {
                    curBlock.category = 'apple'
                }
                if (i === bombcords.x && j === bombcords.y) {
                    curBlock.category = 'bomb'
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
    const [causeOfDeath, setCauseOfDeath] = useState<string>('');

    const requestRef: any = useRef()
    let newGameState = gameState
    let moveSpeed = 500 * (0.8 ** (newGameState.speed))
    const reset = () => {
        newGameState = { ...gameState }
        setGameNotOver(true)
    }
    const gameloop = (time: any) => {
        setTimeout(() => {
            
                const snakeMove = move(newGameState.curDir, newGameState.snakeCoordinates)
                const snakeHeadCords: coordinates = newGameState.snakeCoordinates[newGameState.snakeCoordinates.length - 1]
                if (snakeMove[0].x < 0 && gameNotOver) {
                    setCauseOfDeath('Your snake crashed into the wall...')
                    setGameNotOver(false)
                }
                else if (checkCollision(newGameState.snakeCoordinates) && gameNotOver) {
                    console.log(new Set(newGameState.snakeCoordinates.map((x:any) => `${x.y}.${x.x}`)));
                    console.log(newGameState.snakeCoordinates.map((x:any) => `${x.y}.${x.x}`));
                    
                    setCauseOfDeath('Your snake ate itself...')
                    setGameNotOver(false)
                }
                else if (CheckForApple(snakeHeadCords, newGameState.mineCoordinates) && gameNotOver) {
                    setCauseOfDeath('Your snake exploded...')
                    setGameNotOver(false)
                }
                else {
                    newGameState.snakeCoordinates = move(newGameState.curDir, newGameState.snakeCoordinates)
                    if (CheckForApple(snakeHeadCords, newGameState.appleCoordinates)) {
    
                        newGameState.points++;
                        setPoints(newGameState.points)
                        newGameState.snakeCoordinates.unshift(expandSnake(newGameState.snakeCoordinates, newGameState.curDir))
                        newGameState.appleCoordinates = generateRandomCords()
                        newGameState.speed = Math.floor(newGameState.points / 5)
                         moveSpeed = 500 * (0.8 ** (newGameState.speed))
                    }
                   
                }

                setBoard(createBoard(newGameState.mineCoordinates, newGameState.appleCoordinates, newGameState.snakeCoordinates))
                requestRef.current = requestAnimationFrame(gameloop)
            

        }, moveSpeed)

    }

    useEffect(() => {
        reset()

        window.addEventListener('keydown', (e) => {
            newGameState.curDir = changeDirection(e)
        });
        setInterval(() => {
            const newAppleCords = generateRandomCords()
            const newMineCords = generateRandomCords()
            newGameState.mineCoordinates = newMineCords
            newGameState.appleCoordinates = newAppleCords

        }, 10000)
        requestRef.current = requestAnimationFrame(gameloop);
        return () => cancelAnimationFrame(requestRef.current)

    }, []);


    return (
        <div className="container">
            {board.length !== 0 ?
                <div className='arcade'>
                    <p>SCORE: {points}</p>
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
                            <div className="gameOver">
                            <h1>GAME</h1>
                            <h1>OVER</h1>
                            </div>
                            <p>{causeOfDeath}</p>
                            <button className='button' onClick={() => {
                                dispatch({ type: "EDIT_SCORE", payload: { id: curPlayerid, score: points } })
                                navigate('/')
                            }}>MAIN MENU</button>


                        </div>

                    }
                </div>
                :

                <div className="arcade">LOADING...</div>
            }
        </div>
    );
}



export default FullBoard;