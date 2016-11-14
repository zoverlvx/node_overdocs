'use strict';
/* global $ */

let enterLibName = (event) => {
    let libtextbox = $('#lib_id');
    libtextbox.val();
    event.preventDefault();

    if (!$.trim(libtextbox.val())) {
        alert('Please enter the name of the library');

    }
    else {
        // store libtextbox.val(); in MongoDB
        // append libtextbox.val(); as <option> on #library_drop
    }
};

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
            // $('option').on('click', () => {

            // });

            // $().html()

        })

}

$(document).ready(() => {
    getLibrary();
    getNameOfLib();
});
