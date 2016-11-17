'use strict';
/* global $ */

//POST must be used on the submit of the library name
function enterLibName() {

    $('#lib_submit').submit((event) => {
        let libval = $('#lib_name').val();
        event.preventDefault();
        console.log(libval);

        if (!$.trim(libval) /* || libval already exists */ ) {
            alert('Please enter the name of the library');
        }
        else {
            $('#lib_select').append($('<option>', {
                value: 1,
                text: libval
            }));
        }

        libval = $('#lib_name').val("");

    });

}

function getLibrary() {

    let request = {
        //entries: for_entries
    }

    $.ajax({
            url: "https://node-study-zoverlvx.c9users.io/libraries",
            data: request,
            //dataType: "jsonp", //use jsonp to avoid cross origin issues
            type: "GET",
        })
        .done((result) => {

        });

}

// add field of library name to database
// on selected library from dropdown, create method name and description values and fields on submit 
// dropdown enters object of library

let enterMethodName = (event) => {
    let methodtextbox = $('#method_drop');
    methodtextbox.val();
    event.preventDefault();

    // if () {} // From the looks of it, it seems like a library is always going to be chosen. So, if that library is chosen then the method name is stored under that library name 
};

let enterDescription = (event) => {
    let descrtextbox = $('#text_id');
    descrtextbox.val();
    event.preventDefault();

    // Must correspond with a method name and be submitted therewith
};

$(document).ready(() => {
    getLibrary();
    enterLibName();
});
