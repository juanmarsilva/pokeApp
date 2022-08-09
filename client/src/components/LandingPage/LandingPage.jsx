import React from "react";
import { Link } from 'react-router-dom';
import s from './LandingPage.module.css';


class LandingPage extends React.Component {
    render() {
        return (
            <div className={s.container} >
                <Link to='/home'>
                    <div className={s.pokeball}>
                        <div className={s.pokeball__button}></div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default LandingPage;


