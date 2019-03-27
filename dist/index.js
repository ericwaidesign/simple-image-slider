'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('./assets/constants');

var _constants2 = _interopRequireDefault(_constants);

require('./assets/css/styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * simple-image-slider\src\index.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author <ericwaidesign@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * @description This class loads the given images and apply 
 * cross fade transition effect between photos.
 */
var ImageSlider = function (_Component) {
  _inherits(ImageSlider, _Component);

  function ImageSlider(props) {
    _classCallCheck(this, ImageSlider);

    var _this = _possibleConstructorReturn(this, (ImageSlider.__proto__ || Object.getPrototypeOf(ImageSlider)).call(this, props));

    _this.setLowResImgOpacityTo0 = function () {
      // Set class name to change the DOM element opacity to 0.
      _this.setState({ lowResCssClass: _constants2.default.OPACITY_ZERO });
    };

    _this.state = {
      highResImages: [],
      lowResImages: [],
      lowResCssClass: _constants2.default.OPACITY_ONE
    };
    return _this;
  }

  /**
   * @description Set the timeout with the given interval of 
   * time (timeoutDuration) after the component is mounted 
   * (inserted into the tree). Initialize the transition after 
   * the given interval of time.
   */


  _createClass(ImageSlider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.timeout = setTimeout(function () {
        return _this2.initialTransition();
      }, this.props.timeoutDuration);
    }

    /**
     * @description instance property that sets the CSS class name 
     * in state to trigger a re-render to update a DOM element's 
     * opacity setting to 0.
     */

  }, {
    key: 'initialTransition',


    /**
     * @description Initialize the cross fade transition.
     */
    value: function initialTransition() {
      var _this3 = this;

      // clear the timeout set previously
      clearTimeout(this.timeout);

      var highResImages = this.state.highResImages;
      var lowResImages = this.state.lowResImages;
      var numOfImages = highResImages.length;

      // Retrieve the last set of images 
      var imageContainerElement = document.getElementById(_constants2.default.IMAGE_LOADER_CONTAINER);
      var lastImageContainer = imageContainerElement.children[numOfImages - _constants2.default.ONE];

      // Move the 1st item in the array to the last place.
      highResImages.push(highResImages.shift());
      var newHighResImages = highResImages.slice();
      lowResImages.push(lowResImages.shift());
      var newLowResImages = lowResImages.slice();

      this.setTransitionStyles(lastImageContainer, _constants2.default.STRING_ZERO);

      setTimeout(function () {
        _this3.setTransitionStyles(lastImageContainer, _constants2.default.STRING_ONE);

        _this3.timeout = setTimeout(function () {
          return _this3.initialTransition();
        }, _this3.props.timeoutDuration);

        _this3.setState({
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

  }, {
    key: 'setTransitionStyles',
    value: function setTransitionStyles(lastImageContainer, opacity) {
      lastImageContainer.style.transition = 'all ' + this.props.transitionDuration / _constants2.default.THOUSAND_MILLISECS + 's';
      lastImageContainer.style.opacity = opacity;
    }

    /**
     * @description Update state with the data from the creation 
     * parameters (props) passed during instantiation.
     */

  }, {
    key: 'setState',
    value: function setState() {
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

  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      this.setState();

      var highResImages = this.state.highResImages;
      var lowResImages = this.state.lowResImages;

      /* Output each set of images */
      var imageArray = highResImages.map(function (highResImage, index) {
        return _react2.default.createElement(
          'div',
          {
            id: '' + _constants2.default.IMAGE_CONTAINER + index,
            key: '' + _constants2.default.IMAGE_CONTAINER + index },
          _react2.default.createElement('img', {
            id: '' + _constants2.default.LOW_RES + index,
            className: _constants2.default.IMAGE + ' ' + _this4.state.lowResCssClass,
            src: lowResImages[index]
          }),
          _react2.default.createElement('img', {
            id: '' + _constants2.default.HIGH_RES + index,
            className: _constants2.default.IMAGE,
            src: highResImage,
            onLoad: _this4.setLowResImgOpacityTo0
          })
        );
      });

      return _react2.default.createElement(
        'div',
        { id: _constants2.default.IMAGE_LOADER_CONTAINER },
        imageArray
      );
    }
  }]);

  return ImageSlider;
}(_react.Component);

/**
 * @description Default static properties (props) values.
 */


ImageSlider.defaultProps = {
  timeoutDuration: _constants2.default.FIVE_THOUSANDS_MILLISECS,
  transitionDuration: _constants2.default.THOUSAND_MILLISECS
};

/**
 * @description Type checks to validate the static properties 
 * (props) which will be used by utility functions. These 
 * static properties can be accessed without instantiate the 
 * class.
 */
ImageSlider.propTypes = {
  highResImages: _propTypes2.default.array.isRequired,
  lowResImages: _propTypes2.default.array.isRequired,
  timeoutDuration: _propTypes2.default.number,
  transitionDuration: _propTypes2.default.number
};

exports.default = ImageSlider;