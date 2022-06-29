import '../../stylesheets/mainTitle.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const MainTitle = () => {
    const navigate = useNavigate()
    const [hiscore, setHiscore] = useState<number>(0);
    return (
        <div className="MainTitle">
            <h1>SNAKE</h1>
            <h3>High Score: {hiscore}</h3>
            <div className="buttons">
                <button className='button' onClick={()=>{navigate('/start_game')}}>PLAY</button>
                <button className='button'>SCORES</button>
            </div>
        </div>
    );
}

export default MainTitle;