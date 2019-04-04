/**
 * simple-image-slider
 * @author <ericwaidesign@gmail.com>
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Constants from './assets/constants';
import ImgCreator from 'simple-img-creator';
import './assets/css/styles.css';

/**
 * @description This class loads the given images and apply 
 * cross fade transition effect between photos.
 */
class SimpleImageSlider extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uniqueImgNames: [],
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
      this.props.params.timeoutDuration
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

    const uniqueImgNames = this.state.uniqueImgNames;
    const highResImages = this.state.highResImages;
    const lowResImages = this.state.lowResImages;
    const numOfImages = highResImages.length;

    // Retrieve the last set of images 
    const imageContainerElement = document.getElementById(Constants.IMAGE_LOADER_CONTAINER);
    const lastImageContainer = imageContainerElement.children[numOfImages - Constants.ONE];

    // Move the 1st item in the array to the last place.
    uniqueImgNames.push(uniqueImgNames.shift());
    const newUniqueImgNames = uniqueImgNames.slice();
    highResImages.push(highResImages.shift());
    const newHighResImages = highResImages.slice();
    lowResImages.push(lowResImages.shift());
    const newLowResImages = lowResImages.slice();

    this.setTransitionStyles(lastImageContainer, Constants.STRING_ZERO);

    setTimeout(() => {
      this.setTransitionStyles(lastImageContainer, Constants.STRING_ONE);

      this.timeout = setTimeout(
        () => this.initialTransition(),
        this.props.params.timeoutDuration
      );

      this.setState({
        uniqueImgNames: newUniqueImgNames,
        highResImages: newHighResImages,
        lowResImages: newLowResImages
      });
    }, this.props.params.timeoutDuration);
  }

  /**
   * @description Set the styles for the given DOM element 
   * (lastImageContainer).
   * @param {HTMLElement} lastImageContainer the DOM element that 
   * contains the last set of images in the container.
   * @param {string} opacity the opacity value to be set.
   */
  setTransitionStyles(lastImageContainer, opacity) {
    lastImageContainer.style.transition = `all ${this.props.params.transitionDuration / Constants.THOUSAND_MILLISECS}s`;
    lastImageContainer.style.opacity = opacity;
  }

  /**
   * @description Update state with the data from parameters 
   * (props) passed during instantiation.
   */
  setState() {
    if (this.state.highResImages.length === 0) {
      this.state.uniqueImgNames = this.props.params.uniqueImgNames;
      this.state.highResImages = this.props.params.highResImages;
      this.state.lowResImages = this.props.params.lowResImages;
    }
  }

  /**
   * @description Output each set of low res image and high res image
   * with the use of Simple-Img-Creator component. When the high res 
   * image on loaded, the opacity of the low res image change from 1 
   * to 0.
   */
  render() {
    this.setState();

    const uniqueImgNames = this.state.uniqueImgNames;
    const highResImages = this.state.highResImages;
    const lowResImages = this.state.lowResImages;

    /* Output each set of images */
    var imageArray = highResImages.map((highResImage, index) => {
      const params = {
        // name of the img
        uniqueImgName: uniqueImgNames[index],
        // path to the low resolution image
        lowResImgUrl: lowResImages[index],
        // path to the high resolution image
        highResImgUrl: highResImage
      }

      return (
        <ImgCreator params={params} />
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
SimpleImageSlider.defaultProps = {
  params: PropTypes.shape({
    timeoutDuration: Constants.FIVE_THOUSANDS_MILLISECS,
    transitionDuration: Constants.THOUSAND_MILLISECS
  })
};

SimpleImageSlider.propTypes = {
  params: PropTypes.shape({
    highResImages: PropTypes.array.isRequired,
    lowResImages: PropTypes.array.isRequired,
    timeoutDuration: PropTypes.number,
    transitionDuration: PropTypes.number
  })
};

export default SimpleImageSlider;