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
        if (scores.length !== 0) {
            scores.sort((a, b) => b.score - a.score)
        }
    }, []);

    return (
        <div className="scoreBoard">
            <h1>SCORES</h1>
            <div className="labels">
                <p>NICK</p>
                <p>SCORE</p>
            </div>
            <ul>
                {scores.map((score) => {
                    return (

                        <div key={score.id}>
                            <li>
                                <div>{score.nick}</div>
                                <div className="dottedLine"></div>
                                <div>{score.score}</div>
                            </li>
                        </div>

                    )
                })}
            </ul>

            <button className="button smolButton" onClick={() => { navigate('/') }}>BACK TO MAIN PAGE</button>
        </div>
    );
}

export default ScoreBoard;