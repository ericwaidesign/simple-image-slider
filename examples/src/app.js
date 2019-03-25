/**
 * ericwaidesigncore\client\src\components\ImageLoader\ImageLoaderApp.js
 * @author <ericwaidesign@gmail.com>
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import ImageLoader from "../../src/index";

/**
 * @description This class retrieves a list of images to be 
 * output from the ImageLoader class.
 * @author <ericwaidesign@gmail.com>
 */
class App extends Component {

    /**
     * @description Construct the paths to the low resolution 
     * images and to the high resolution images. Call the 
     * ImageLoader component with the given paths.
     */
    render() {
        console.log('-- ImageLoaderApp.render() --');

        let highResImages = [];
        let lowResImages = [];

        this.state.images.map(image => {
            var highRes = require('./assets/images/goldfish.jpg');
            var lowRes = require('./assets/images/lowRes_goldfish.jpg');

            highResImages.push(highRes);
            lowResImages.push(lowRes);
        });

        return (
            /* Output ImageLoader component */
            <ImageLoader highResImages={highResImages} lowResImages={lowResImages} />
        );
    }
}

/* Render ImageLoader component into DOM */
ReactDOM.render(<App />, document.getElementById('AppRoot'));
