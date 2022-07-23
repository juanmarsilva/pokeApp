import React from "react";
import { Link } from 'react-router-dom';

export default function LandingFunction() {
    return (
        <div>
            <h1>Welcome!</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}