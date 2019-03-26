/**
 * simple-image-slider\examples\src\app.js
 * @author <ericwaidesign@gmail.com>
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import SimpleImageSlider from "../../src";

class App extends Component {
    render() {
        const highResImages = [require('./assets/images/goldfish.jpg')];
        const lowResImages = [require('./assets/images/lowRes_goldfish.jpg')];

        return (
            <SimpleImageSlider highResImages={highResImages} lowResImages={lowResImages} />
        );
    }
}

ReactDOM.render(<App />, document.getElementById('AppRoot'));
