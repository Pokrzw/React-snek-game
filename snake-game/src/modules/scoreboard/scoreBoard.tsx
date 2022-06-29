import { useSelector } from "react-redux";
import '../../stylesheets/globalstyles.scss'
import { scoreState } from "../../redux/scoreReducer";
import { useEffect } from "react";
import '../../stylesheets/scoreboard.scss'
import { useNavigate } from "react-router-dom";

const ScoreBoard = () => {
    
    const navigate = useNavigate()
    const scores = useSelector<scoreState, scoreState['scoreboard']>((state) => state.scoreboard)
    useEffect(() => {
        scores.sort((a, b) => b.score - a.score)
    }, []);

    return ( 
        <div className="scoreBoard">
            <h1>SCORES</h1>
            <p>
                <p>NICK</p>
                <p>SCORE</p>
            </p>
            <ul>
            {scores.map((score) => {
                return(
                    <li>
                        <div>{score.nick}</div>
                        <div className="dottedLine"></div>
                        <div>{score.score}</div>
                    </li>
                )
            })}
         </ul>

         <button className="button smolButton" onClick={()=>{navigate('/')}}>BACK TO MAIN PAGE</button>
        </div>
     );
}
 
export default ScoreBoard;