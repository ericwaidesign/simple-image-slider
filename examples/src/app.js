/**
 * simple-image-slider
 * @author <ericwaidesign@gmail.com>
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import SimpleImageSlider from "../../src";

class App extends Component {
    render() {
        const params = {
            // array of high resolution images
            highResImages: [
                require('./assets/images/highRes/goldfish.jpg'), 
                require('./assets/images/highRes/goldfishB.jpg')
            ],
            // array of low resolution images
            lowResImages: [
                require('./assets/images/lowRes/lowRes_goldfish.jpg'),
                require('./assets/images/lowRes/lowRes_goldfishB.jpg')
            ], 
            // 5000ms is default
            timeoutDuration: 5000, 
            // 1000ms is default
            transitionDuration: 1000 
        };

        return (
            <SimpleImageSlider params={params} />
        );
    }
}

ReactDOM.render(<App />, document.getElementById('AppRoot'));
