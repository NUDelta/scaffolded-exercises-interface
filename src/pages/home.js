import React from 'react';
import './../App.css';

export default class Home extends React.Component {
    state = {
    }
    render() {
        return (
            <div id='homepage-container'>
                <h1>Scaffolded Exercises</h1>
                <ul style={{textAlign: 'left'}}>
                <li><a href="exercise-auto1">Exercise auto1</a></li>
                    <li><a href="exercise-general">Exercise general</a></li>
                    <li><a href="exercise-one">Exercise one</a></li>
                    <li><a href="exercise-two">Exercise two</a></li>
                    <li><a href="exercise-three">Exercise three</a></li>
                    <li><a href="exercise-three-five">Exercise three.five</a></li>
                    <li><a href="exercise-three-five-six">Exercise three.five.six</a></li>
                    <li><a href="exercise-three">Exercise four</a></li >
                </ul>
            </div>
        )
    }
}