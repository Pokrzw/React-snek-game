import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import '../../stylesheets/nameInput.scss'
import { useDispatch } from "react-redux";
import { useState } from "react";
import {scoreState } from "../../redux/scoreReducer";



interface Nick {
    nick: string
}

const NameInput = () => {

    const [isNickEmpty, setIsNickEmpty] = useState<boolean>(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allNicks = useSelector<scoreState,scoreState['scoreboard']>(state => state.scoreboard)
    const initialValues: Nick = { nick: '' }
    return (
        <div className="NameInput">
            <h2>INSERT YOUR NAME</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={(values: Nick) => {
                    if(values.nick===''){
                        setIsNickEmpty(true)
                    } else {
                        setIsNickEmpty(false)
                        navigate('/game')
                        dispatch({type:"ADD_SCORE", payload:values.nick})
                    }
                    
                    
                }}
            >
                <Form>
                    <div className="form">
                        <Field id='nick' placeholder='' name='nick'></Field>
                    </div>

                    {isNickEmpty? <>nick can't be empty</> : <></>}  


                    <div className="buttons">
                        <button className='button' onClick={() => { navigate('/') }}>BACK</button>
                        <button className='button' type="submit">PLAY</button>
                    </div>
                </Form>

            </Formik>

            
        </div>
    );
}

export default NameInput;