/**
 * simple-image-slider
 * @author <ericwaidesign@gmail.com>
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './assets/css/styles.css';
import SimpleImageSlider from "../../src";

class App extends Component {
    render() {
        const params = {
            uniqueImgNames: [
                'goldfish',
                'goldfishB'
            ],
            // array of high resolution images
            highResImages: [
                './examples/src/assets/images/goldfish.jpg',
                './examples/src/assets/images/goldfishB.jpg'
            ],
            // array of low resolution images
            lowResImages: [
                './examples/src/assets/images/lowRes_goldfish.jpg',
                './examples/src/assets/images/lowRes_goldfishB.jpg'
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
