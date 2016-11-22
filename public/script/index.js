'use strict';
/* global $ */

//const express = require("express");
//const app = express();
//const Libraries = require('../models/library');

function library_dropdown() {
            let example = {
            method: 'method string'
        }
    $('#library_drop').change((event) => {
        $('#hidden').show();
        let selectedOption = $('#library_drop option:selected');
        
        // need access of object
        // append drop down for methods of that library on select
        $('#method_select').append('<option>' + example.method + '</option>')
    })
}

// method drop down
//$('#output').append('<p>Method selected:</p> \n' /**/)

function getLibrary(requestedLibrary) {

    let request = {
        library_name: requestedLibrary //.val
    }

    $.ajax({
            url: "https://node-study-zoverlvx.c9users.io/libraries", // 
            // data: request,
            dataType: "json", // jsonp is only used if you're using someone else's API and you want to avoid cross over issues
            type: "GET",
        })
        .done((result) => {
            console.log(result); //needs to put onto the DOM
        });

}

function addLibrary(library_name) {
    let library_post = {
        'library_name': library_name
    };
    let ajax = $.ajax('/libraries', {
        type: 'POST',
        data: JSON.stringify(library_post),
        dataType: 'json',
        contentType: 'application/json'
    });
    //
};

function addMethod(method_name, des) {
    let method_post = {
        entries: [{
            method: method_name,
            description: des
        }]
    };
    let ajax = $.ajax('/libraries', {
        type: 'POST',
        data: JSON.stringify(method_post),
        dataType: 'json',
        contentType: 'application/json'
    });

};

function updateLibrary(library_name) {
    let library_put = {
        'library_name': library_name._id
    };
    let ajax = $.ajax(`/libraries/${library_name}`, {
        type: 'PUT',
        data: JSON.stringify(library_name),
        dataType: 'json',
        contentType: 'application/json'
    });
    //
}

function deleteLibrary(library_name) {
    let ajax = $.ajax(`/libraries/${library_name}`, {
        type: 'DELETE',
        dataType: 'json'
    });
    //
}





// add field of library name to database
// on selected library from dropdown, create method name and description values and fields on submit 
// dropdown enters object of library

//POST must be used on the submit of the library name
function enterLibName() {

    $('#lib_submit').submit((event) => {
        let i = 1;
        let libval = $('#lib_name').val().trim();
        event.preventDefault();
        console.log(libval);

        if (!$.trim(libval) /* || libval already exists */ ) {
            alert('Please enter the name of the library');
        }
        else {
            addLibrary(libval); // trying to get the ajax to work with the submit
            $('#lib_select').append($('<option>', {
                value: i,
                text: libval
            }));
        }

        libval = $('#lib_name').val('');
        i++;

    });

}

// enter method and description on submit dependent on library

$(document).ready(() => {
    $('#hidden').hide();
    getLibrary();
    addLibrary();
    enterLibName();
    library_dropdown();
});


//append it all to page
