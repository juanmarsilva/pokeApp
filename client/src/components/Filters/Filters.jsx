import React from "react";
import s from './Filters.module.css';

class Filters extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={s.container}>
                <label className={s.label1}>FILTER BY ORIGIN:</label>
                <select className={s.select1} onChange={(e) => this.props.handleFilterCreated(e)}>
                    <option value='All'>All</option>
                    <option value='created'>Created</option>
                    <option value='api'>Api</option>
                </select>
                <label className={s.label2}>FILTER BY TYPE:</label>
                <select className={s.select2} onChange={(e) => this.props.handleFilterByTypes(e)}>
                        <option value='All'>All</option>
                        {
                            this.props.allTypes?.map(type => {
                                return (
                                    <option value={type}> {type[0].toUpperCase() + type.slice(1)} </option>
                                )
                            })
                        }
                    </select>
            </div>
        )
    }
}

export default Filters;