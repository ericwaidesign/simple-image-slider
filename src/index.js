/**
 * simple-image-slider\src\index.js
 * @author <ericwaidesign@gmail.com>
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Constants from './assets/constants';
import './assets/css/styles.css';

/**
 * @description This class loads the given images and apply 
 * cross fade transition effect between photos.
 */
class ImageSlider extends Component {

  constructor(props) {
    super(props);

    this.state = {
      highResImages: [],
      lowResImages: [],
      lowResCssClass: Constants.OPACITY_ONE
    };
  }

  /**
   * @description Set the timeout with the given interval of 
   * time (timeoutDuration) after the component is mounted 
   * (inserted into the tree). Initialize the transition after 
   * the given interval of time.
   */
  componentDidMount() {
    this.timeout = setTimeout(
      () => this.initialTransition(),
      this.props.timeoutDuration
    );
  }

  /**
   * @description instance property that sets the CSS class name 
   * in state to trigger a re-render to update a DOM element's 
   * opacity setting to 0.
   */
  setLowResImgOpacityTo0 = () => {
    // Set class name to change the DOM element opacity to 0.
    this.setState({ lowResCssClass: Constants.OPACITY_ZERO });
  }

  /**
   * @description Initialize the cross fade transition.
   */
  initialTransition() {
    // clear the timeout set previously
    clearTimeout(this.timeout);

    const highResImages = this.state.highResImages;
    const lowResImages = this.state.lowResImages;
    const numOfImages = highResImages.length;

    // Retrieve the last set of images 
    const imageContainerElement = document.getElementById(Constants.IMAGE_LOADER_CONTAINER);
    const lastImageContainer = imageContainerElement.children[numOfImages - Constants.ONE];

    // Move the 1st item in the array to the last place.
    highResImages.push(highResImages.shift());
    const newHighResImages = highResImages.slice();
    lowResImages.push(lowResImages.shift());
    const newLowResImages = lowResImages.slice();

    this.setTransitionStyles(lastImageContainer, Constants.STRING_ZERO);

    setTimeout(() => {
      this.setTransitionStyles(lastImageContainer, Constants.STRING_ONE);

      this.timeout = setTimeout(
        () => this.initialTransition(),
        this.props.timeoutDuration
      );

      this.setState({
        highResImages: newHighResImages,
        lowResImages: newLowResImages
      });
    }, this.props.timeoutDuration);
  }

  /**
   * @description Set the styles for the given DOM element 
   * (lastImageContainer).
   * @param {*} lastImageContainer the DOM element that 
   * contains the last set of images in the container.
   * @param {*} opacity the opacity value to be set.
   */
  setTransitionStyles(lastImageContainer, opacity) {
    lastImageContainer.style.transition = `all ${this.props.transitionDuration / Constants.THOUSAND_MILLISECS}s`;
    lastImageContainer.style.opacity = opacity;
  }

  /**
   * @description Update state with the data from the creation 
   * parameters (props) passed during instantiation.
   */
  setState() {
    if (this.state.highResImages.length === 0) {
      this.state.highResImages = this.props.highResImages;
      console.log(this.state.highResImages);
    }
    if (this.state.lowResImages.length === 0) {
      this.state.lowResImages = this.props.lowResImages;
      console.log(this.state.lowResImages);
    }
  }

  /**
   * @description Output each set of images. Each set include a 
   * low resolution image for used as placeholder and a high 
   * resolution image. The opacity of the low resolution image 
   * will be set to 0 upon onLoad of the high resolution image. 
   */
  render() {
    this.setState();

    const highResImages = this.state.highResImages;
    const lowResImages = this.state.lowResImages;

    /* Output each set of images */
    var imageArray = highResImages.map((highResImage, index) => {
      return (
        <div 
          id={`${Constants.IMAGE_CONTAINER}${index}`}
          key={`${Constants.IMAGE_CONTAINER}${index}`}>
          {/* Low res placeholder image */}
          <img
            id={`${Constants.LOW_RES}${index}`}
            className={`${Constants.IMAGE} ${this.state.lowResCssClass}`}
            src={lowResImages[index]}
          />
          {/* High res image */}
          <img
            id={`${Constants.HIGH_RES}${index}`}
            className={Constants.IMAGE}
            src={highResImage}
            onLoad={this.setLowResImgOpacityTo0}
          />
        </div>
      )
    });

    return (
      <div id={Constants.IMAGE_LOADER_CONTAINER}>
        {imageArray}
      </div>
    );
  }
}

/**
 * @description Default static properties (props) values.
 */
ImageSlider.defaultProps = {
  timeoutDuration: Constants.FIVE_THOUSANDS_MILLISECS,
  transitionDuration: Constants.THOUSAND_MILLISECS
};

/**
 * @description Type checks to validate the static properties 
 * (props) which will be used by utility functions. These 
 * static properties can be accessed without instantiate the 
 * class.
 */
ImageSlider.propTypes = {
  highResImages: PropTypes.array.isRequired,
  lowResImages: PropTypes.array.isRequired,
  timeoutDuration: PropTypes.number,
  transitionDuration: PropTypes.number
};

export default ImageSlider;