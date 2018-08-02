const utils = ( function() {

    /**
    * Test if a given object (usually a variable) is a NodeList
    *
    * @param {any} obj The item to test if it's a NodeList
    *
    * @returns {boolean} Whether or not the value passed in is a NodeList
    */
    var isNodeList = function( obj ) {
        return '[object NodeList]' === Object.prototype.toString.call( obj );
    };

    /**
    * Test if a given object (usually a variable) is a HTMLElement object
    *
    * @param {any} obj The item to test if it's a HTMLElement object
    *
    * @returns {boolean} Whether or not the value passed in is a HTMLElement
    */
    var isHTMLElement = function( obj ) {
        var parent = Object.getPrototypeOf( obj );
        return '[object HTMLElement]' === Object.getPrototypeOf( parent ).toString();
    };


    /**
     * A replacement for jQuery .parent. Searches up the DOM from an element and
     * returns the first matching element
     *
     * @param {string|object} el The element to start the search from. Takes a DOMString
     * @param {string} className - The class that is being searched for
     *
     * @returns
     */
    var getParent = function( el, className ) {
        if ( ! isHTMLElement( el ) || 'string' !== typeof el ) {
            throw new Error( 'Element passed to getParent is not an element or a string' );
        }

        if ( el.classList.contains( className ) ) {
            return el;
        }

        return getParent( el.parentNode, className );
    };


    return {
        isNodeList,
        isHTMLElement,
        getParent,
    };

} )();

export default utils;
