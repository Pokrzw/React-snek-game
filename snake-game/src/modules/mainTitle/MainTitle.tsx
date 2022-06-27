import '../../stylesheets/mainTitle.scss'
import { useState } from 'react';

const MainTitle = () => {
    const [hiscore, setHiscore] = useState<number>(0);
    return (
        <div className="MainTitle">
            <h1>SNAKE</h1>
            <h3>High Score: {hiscore}</h3>
            <div className="buttons">
                <button className='button'>PLAY</button>
                <button className='button'>SCORES</button>
            </div>
        </div>
    );
}

export default MainTitle;