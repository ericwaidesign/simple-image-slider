/**
 * simple-image-slider
 * @author <ericwaidesign@gmail.com>
 */

'use strict'

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './assets/css/styles.css';
import Image from '../../src/Image';
import SimpleImageSlider from "../../src";

class App extends Component {
    render() {
        const newImages = [
            new Image(
                // The file name of the high res image without extension.
                'goldfish',
                // The file path of the high res image.
                './examples/src/assets/images/goldfish.jpg',
                // The file name of the low res image without extension.
                'lowRes_goldfish',
                // The file path of the low res image.
                './examples/src/assets/images/lowRes_goldfish.jpg'
            ),
            new Image(
                'goldfishB',
                './examples/src/assets/images/goldfishB.jpg',
                'lowRes_goldfishB',
                './examples/src/assets/images/goldfishB.jpg'
            )
        ];

        const params = {
            // array of Images
            images: newImages,
            // The duration before a transition ocurred,
            //  optional, 5000ms is default
            timeoutDuration: 5000,
            // The duration of the transition
            //  optional, 1000ms is default
            transitionDuration: 1000
        };

        return (
            <SimpleImageSlider params={params} />
        );
    }
}

ReactDOM.render(<App />, document.getElementById('AppRoot'));
