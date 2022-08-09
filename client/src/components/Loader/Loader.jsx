import React from "react";
import s from './Loader.module.css'


class Loader extends React.Component {
    render(){
        return (
            <div className={s.container} >
                <div className={s.pokeball}>
                    <div className={s.pokeball__button}></div>
                </div>
            </div>
        )
    
    }
}

export default Loader;