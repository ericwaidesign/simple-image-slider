/**
 * simple-image-slider
 * @author <ericwaidesign@gmail.com>
 */

'use strict'

/**
 * @description Create an Image.
 * @param {string} highRestFileName - The file name of the high res image without extension.
 * @param {string} highResPath - The file path of the high res image.
 * @param {string} lowResFileName - The file name of the low res image without extension.
 * @param {string} lowResPath - The file path of the low res image.
 */
function Image(highResFileName, highResPath, lowResFileName, lowResPath) {
    this.highResFileName = highResFileName;
    this.highResPath = highResPath;
    this.lowResFileName = lowResFileName;
    this.lowResPath = lowResPath;
}

module.exports = Image;