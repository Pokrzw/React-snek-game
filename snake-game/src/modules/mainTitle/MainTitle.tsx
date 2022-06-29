import '../../stylesheets/mainTitle.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { store } from "../../redux/store";
import { scoreState } from "../../redux/scoreReducer";
import { useEffect } from 'react';
const MainTitle = () => {
    const navigate = useNavigate()
    const scores = useSelector<scoreState, scoreState['scoreboard']>((state) => state.scoreboard)
    useEffect(() => {
        
        setHiscore(scores.sort((a, b) => b.score - a.score)[0].score)
    }, []);


    const [hiscore, setHiscore] = useState<number>(0);
    return (
        <div className="MainTitle">
            <h1>SNAKE</h1>
            <h3>HIGH SCORE: {hiscore}</h3>
            <div className="buttons">
                <button className='button' onClick={()=>{navigate('/start_game')}}>PLAY</button>
                <button className='button'onClick={()=>{navigate('/scores')}}>SCORES</button>
            </div>
        </div>
    );
}

export default MainTitle;