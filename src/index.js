/**
 * simple-image-slider
 * @author <ericwaidesign@gmail.com>
 */

'use strict'

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Constants from './assets/constants';
import ImgCreator from 'simple-img-creator';
import Image from './assets/Image';
import './assets/css/styles.css';

/**
 * @description This class loads the given images and apply
 * cross fade transition effect between photos.
 */
class SimpleImageSlider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            images: []
        };
    }

    /**
     * @description Set the timeout with the given interval of
     * time (timeoutDuration) after the component is mounted
     * (inserted into the tree). Initialize the transition after
     * the given interval of time.
     */
    componentDidMount() {
        this.setInitialOpacity();
        this.timeout = setTimeout(
            () => this.initialTransition(),
            this.props.params.timeoutDuration
        );
    }

    /**
     * @description Set the opacity all the sets of images except
     * for the first set to 0 opacity.
     */
    setInitialOpacity = () => {
        const nodes = this.getImageSetNodes();
        for (var i = 1; i < nodes.length; i++) {
            this.setOpacity(nodes[i], Constants.STRING_ZERO);
        }
    }

    /**
     * @description Initialize the cross fade transition.
     */
    initialTransition = () => {
        // clear the timeout set previously
        clearTimeout(this.timeout);

        const images = this.state.images;
        const numOfImages = images.length;

        // Retrieve the last set of images
        const imageSetNodes = this.getImageSetNodes();
        const lastImageContainer = imageSetNodes[numOfImages - Constants.ONE];

        // Move the 1st item in the array to the last place.
        images.push(images.shift());
        const reorderedImages = images.slice();

        this.setTransition(lastImageContainer);
        this.setOpacity(lastImageContainer, Constants.STRING_ZERO);

        setTimeout(() => {
            this.setTransition(lastImageContainer);
            this.setOpacity(lastImageContainer, Constants.STRING_ONE);

            this.timeout = setTimeout(
                () => this.initialTransition(),
                this.props.params.timeoutDuration
            );

            this.setState({
                images: reorderedImages,
            });
        }, this.props.params.timeoutDuration);
    }

    /**
     * @description Set the transition for the given node.
     * @param {HTMLElement} node the DOM element that
     * contains the set of images in the container.
     */
    setTransition = node => {
        node.style.transition = `all ${this.props.params.transitionDuration / Constants.THOUSAND_MILLISECS}s`;
    }

    /**
     * @description Set the opacity of the given node to 0.
     * @param {HTMLElement} node the DOM element that
     * contains the set of images in the container.
     * @param {string} opacity the opacity value to be set.
     */
    setOpacity = (node, opacity) => {
        node.style.opacity = opacity;
    }

    /**
     * @description Update state with the data from parameters
     * (props) passed during instantiation.
     */
    setState = () => {
        if (this.state.images.length === 0) {
            this.state.images = this.props.params.images;
        }
    }

    /**
     * @description return a HTMLCollection of nodes from the div
     * with the id "SimpleImageSlider".
     * @returns {HTMLCollection}
     */
    getImageSetNodes = () => {
        const imageContainerElement = document.getElementById(Constants.SIMPLE_IMAGE_SLIDER);
        return imageContainerElement.children;
    }

    /**
     * @description Output each set of low res image and high res image
     * with the use of Simple-Img-Creator component. When the high res
     * image on loaded, the opacity of the low res image change from 1
     * to 0.
     */
    render() {
        this.setState();

        const images = this.state.images;

        /* Output each set of images */
        const imageArray = images.map((image, index) => {
            return (
                <div key={index}>
                    <ImgCreator image={image} />
                </div>
            )
        });

        return (
            <div id={Constants.SIMPLE_IMAGE_SLIDER}>
                {imageArray}
            </div>
        );
    }
}

/**
 * @description Default static properties (props) values.
 */
SimpleImageSlider.defaultProps = {
    params: PropTypes.shape({
        timeoutDuration: Constants.FIVE_THOUSANDS_MILLISECS,
        transitionDuration: Constants.THOUSAND_MILLISECS
    })
};

SimpleImageSlider.propTypes = {
    params: PropTypes.shape({
        images: PropTypes.arrayOf(
            PropTypes.shape({
                // The file name of the high res image without extension.
                highResFileName: PropTypes.string.isRequired,
                // The file path of the high res image.
                highResPath: PropTypes.string.isRequired,
                // The file name of the low res image without extension.
                lowResFileName: PropTypes.string.isRequired,
                // The file path of the low res image.
                lowResPath: PropTypes.string.isRequired
            })
        ).isRequired,
        // The duration before a transition ocurred,
        //  optional, 5000ms is default
        timeoutDuration: PropTypes.number,
        // The duration of the transition
        //  optional, 1000ms is default
        transitionDuration: PropTypes.number
    })
};

export default SimpleImageSlider;