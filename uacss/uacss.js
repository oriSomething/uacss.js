/**
 *  User Agent to CSS
 *  -----------------
 *
 *  author: Ori Livni aka @oriSomething
 *
 */



(function( window, document, navigator, undefined ) {
    'use strict';

    /**
     *
     *  Consts of operation systems and browsers to sniff
     *
     *  {
     *      [the name of the] :
     *          [array or single regex to compare user agent with]
     *  }
     *
     *  Order matters!
     *
     */
    var
        // Operation systems
        OSES = {
            android      : /\bAndroid\b/,
            ios          : [
                /\biPhone\b/,
                /\biPad\b/,
                /\bMobile\b.+\bSafari\b/ // just in case of new iOS device
            ],
            windows      : /\bWindows\b/,
            osx          : /\bMac OS X\b/,
            chromeos     : /\bCrOS\b/,
            linux        : [
                /\bUbuntu\b/,
                /\bFreeBSD\b/,
                /\bLinux\b/
            ],
            blackberryos : /\bBlackBerry\b/,
            firefoxos    : /\bMobile\b.+\bFirefox\b/
        },

        // Browsers
        BROWSERS = {
            opera      : [
                /\bOpera\b/,              // Opera Presto
                /\bOPR\b/,                // Opera Blink
            ],
            chrome     : [
                /\bChrome\b/,             // Blink / Chrome / Chromium
                /\bCriOS\b/               // iOS Chrome (Webkit - Safari web view)
            ],
            firefox    : /\bFirefox\b/,
            android    : /\bAndroid\b/,
            blackberry : /\bBlackBerry\b/,
            nokia      : /\bNokiaBrowser\b/,
            safari     : /\bSafari\b/,
            ie         : [
                /\bMSIE\b/,
                /\bTrident\b/,
                /\bIE\b/,
                /\bIEMobile\b/
            ]
        },

        // TODO:
        // Add DEVICE object

        // mobile test
        MOBILE = [
            /Mobile\b/i,            // NOTE: no \b in the beginning
            // Microsoft has to be special
            /\bWindows Phone\b/,    // windows 7.5
            /\bIEMobile\b/,         // IE Mobile -- no record on MSDN for that
            /\bWindows\b.+\bARM\b/  // windows RT
        ],

        // prefixes
        PREFIX_UA        = 'ua-',    // css
        PREFIX_MOBILE    = 'mobile', // css / js
        PREFIX_NOT       = 'not_',   // js
        // if not found match
        UNDEFINED_ITEM   = 'undefined',

        // what prefix should any object be
        PREFIXES = {
            os      : OSES,
            browser : BROWSERS
        },

        // if userAgentInfo object exits so use this for backup
        oldUserAgentInfo;



    /**
     * A function that get an Object of regex and String of the user agent and
     * return the most fit option.
     *
     * @param  {Object} checklist [Object of regex to compare againts user agent]
     * @param  {String} uaString  [user agent String]
     * @return {String}           [the first match to the user agent]
     */
    function testUserAgentAgaintsChecklist( checklist, uaString ) {
        var i, iLen,
            k, // checklist item name
            v; // checklist item regex

        for ( k in checklist ) {
            // get value of the checklist. check if the checklist is Array of
            // regex or single regex. if single regex convert to array
            v    = ( ('length' in checklist[k] ) ? checklist[k] : [ checklist[k] ] );

            // check the legnth of the array
            iLen = v.length;

            // check the properties
            for (i=0; i < iLen; i++) {
                if ( v[i].test(uaString) ) {
                    return k;
                }
            }
        }

        // no match was found in checklist
        return UNDEFINED_ITEM;
    }


    /**
     * Return an array exclude the chosen item
     *
     * @param  {[Object]} checklist     [Object of regex to compare againts user agent]
     * @param  {[String]} selectedItem  [item to filter out of the list]
     * @return {[Array]}                [list after filtering]
     */
    function filterChecklist( checklist, selectedItem ) {
        var
            // checklist item name
            k,
            // the return value, list of items that haven't past the test
            notArray = [];

        for ( k in checklist ) {
            if ( k === selectedItem ) continue;

            // add item to the not list array
            notArray.push( k );
        }

        return notArray;
    }

    /**
     * Check if the user agent indicates that is a mobile device
     *
     * @param  {[Array]}   checklist [Object of regex to compare againts user agent]
     * @param  {[String]}  uaString  [user agent String]
     * @return {[Boolean]}           [if mobile]
     */
    function testUserAgentIfMobile( checklist, uaString ) {
        var
            i,
            iLen = checklist.length;

        for (i=0; i < iLen; i++) {
            if ( checklist[i].test(uaString) ) {
                return true;
            }
        }

        return false;
    }


    /**
     * Add [language] and [region] properties to the userAgentInfo
     * object.
     *
     * @param {Object} uaInfo [local userAgentInfo Object]
     */
    function addLanguageToUserAgent( uaInfo ) {
        if ( ! ('language' in navigator) ) return undefined;

        var
            a,
            navigatorLanguage = navigator.language;

        navigatorLanguage = navigatorLanguage.toLocaleLowerCase();

        a = navigatorLanguage.split( '-' );

        // add language if any
        if ( a.length > 0 ) {
            uaInfo.language = a[0];
        }

        // add region if any
        if ( a.length > 1 ) {
            uaInfo.region = a[1];
        }
    }


    /**
     * Add css classes to given element
     *
     * @param {DOM element}  el      [the DOM elemnt for adding the classes]
     * @param {Object}       uaInfo  [user agent object]
     */
    function addCSSClassesToElement( el, uaInfo ) {
        var
            k, i, iLen, item, str,
            // classes to add to {el}
            classes = [],
            // css to be added to the global object
            classesString = '';

        // makes string with prefixed classes
        for ( k in uaInfo ) {
            item = uaInfo[k];

            if ( item !== null ) {

                if ( typeof item === 'string' ) {
                    // normal values
                    classes.push( PREFIX_UA + k + '-' + item );

                } else if ( k === PREFIX_MOBILE ) {
                    // if mobile
                    if ( item ) classes.push( PREFIX_UA + PREFIX_MOBILE );

                } else if ( 'length' in item ) {
                    // not lists
                    iLen = item.length;

                    for (i=0; i < iLen; i++) {
                        // change key name from js convention to css one
                        str = k.replace('_', '-');
                        classes.push( PREFIX_UA + str + '-' + item[i] );
                    }
                }
            }
        }

        // add to el classes
        classesString = classes.join(' ');
        el.className += ( ( el.className.length > 0 ) ? (' ' + classesString) : classesString );
    }


    /**
     * The last funtion to run. Call every thing
     */
    function main() {
        // Variables
        var
            // the user agent object before adding
            uaInfo = {},

            // cashing the navigator.userArgent String
            uaString = navigator.userAgent;


        for ( var k in PREFIXES ) {
            // add to userAgentInfo the positive resulte item
            uaInfo[k] = testUserAgentAgaintsChecklist( PREFIXES[k], uaString );

            // add to userAgentInfo an array of negative resault
            uaInfo[ PREFIX_NOT + k ] = filterChecklist( PREFIXES[k], uaInfo[k] );
        }

        // check for mobile
        uaInfo[ PREFIX_MOBILE ] = testUserAgentIfMobile( MOBILE, uaString );

        // adding to the root element classes of useragent result
        addCSSClassesToElement( document.documentElement, uaInfo );

        // add languages
        // the languages is done after the css is being added
        // so won't be language classes
        addLanguageToUserAgent( uaInfo );

        // check & backup if there is object in the globalscope and add to the global scope
        if ( 'userAgentInfo' in window ) oldUserAgentInfo = window.userAgentInfo;

        // add the userAgentInfo to the global scope
        window.userAgentInfo = uaInfo;
    }



    // and the fun begins...
    main();


} ( window, window.document, window.navigator /*, undefined */ ) );