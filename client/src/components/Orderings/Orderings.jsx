import React from "react";
import s from './Orderings.module.css';


class Orderings extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={s.container}>
                <label className={s.label1}>ORDER BY NAME:</label>
                <select onChange={(e) => this.props.handleOrderByName(e)} className={s.select1}>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
                <label className={s.label2}>ORDER BY ATTACK:</label>
                <select onChange={(e) => this.props.handleOrderByAttack(e)} className={s.select2}>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
            </div>
        )
    }
}

export default Orderings;