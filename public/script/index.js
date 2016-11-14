'use strict';
/* global $ */

//const for_entries = require('../src/router');

function getLibrary() {

let request = {
    //entries: for_entries
}

    $.ajax({
        url: "https://node-study-zoverlvx.c9users.io/entries",
        data: request,
        //dataType: "jsonp", //use jsonp to avoid cross origin issues
        type: "GET",
    })
    .done((result) => {
        $('option').on('click', () => {
            
        });
        
        $().html()
        
    })
    
}

$(document).ready(() => {
    getLibrary();
});