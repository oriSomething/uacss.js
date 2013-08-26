//
// main.js
// @oriSomething
//
// demo of uacss.js
//
//


( function( window, document, navigator, undefined) {

    var
        userAgentInfo = window.userAgentInfo,

        wrapper = document.getElementById('wrapper');


    function addHr() {
        wrapper.innerHTML += '<hr>';
    }

    function addDataList( dt, dd ) {

        wrapper.innerHTML +=
            '<dl>' +
                '<dt>' +
                    dt +
                '</dt>' +
                '<dd>' +
                    dd +
                '</dd>' +
            '</dl>';
    }



    function main() {

        addHr();


        addDataList(
            'User agent',
            navigator.userAgent );


        addHr();


        addDataList(
            'userAgentInfo.os',
            userAgentInfo.os );

        addDataList(
            'userAgentInfo.browser',
            userAgentInfo.browser );


        addHr();


        addDataList(
            'userAgentInfo.mobile',
            userAgentInfo.mobile );


        addHr();



        if ( 'language' in userAgentInfo ) {
            addDataList(
                'userAgentInfo.language',
                userAgentInfo.language );

            if ( 'region' in userAgentInfo ) {
                addDataList(
                    'userAgentInfo.region',
                    userAgentInfo.region );
            }


            addHr();
        }

    }


    main();
        // document.write('<p>' + userAgentInfo.os + '<\/p>');
        // document.write('<p>' + userAgentInfo.browser + '<\/p>');

        // if (userAgentInfo.mobile) {
        //     document.write('<p>Mobile<\/p>');
        // } else {
        //     document.write('<p>Desktop<\/p>');
        // }

} ( window, document, navigator ));