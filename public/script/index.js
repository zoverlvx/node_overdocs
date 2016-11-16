'use strict';
/* global $ */

// $('#mySelect').append($('<option>', {
//     value: 1,
//     text: 'My option'
// }));

function enterLibName() {

    $('#lib_id').submit((event) => {
        let libval = $('#lib_id').val();
        event.preventDefault();
        
        $('#lib_select').append($('<option>', {
            value: 1,
            text: libval
        }));

    // if (!$.trim(libval)) {
    //     alert('Please enter the name of the library');
    // }
    // else {
    //     $('#lib_select').append(<option> + libval + </option>);
    //     // store libtextbox.val(); in MongoDB
    //     // append libtextbox.val(); as <option> on #library_drop
    // }
    
    console.log(libval); 
    
    });



}

// submit value
// check value to make sure it's a string
// append value to dropdown
// add value to MongoDB






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

        });

}

$(document).ready(() => {
    getLibrary();
    //enterLibName();
});
