'use strict';
/* global $ */

// on submit of library, library is added to library dropdown and store in db
// enter method name in input && enter description for method
// on submit for method name and description store info in two separate props under the library selected in the dropdown
// on library select, show method dropdown
// on method dropdown select, append method and description

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
};

function submitLibrary() {

    $('#lib_submit').submit((event) => {
        let i = 1;
        let libval = $('#lib_name').val().trim();
        event.preventDefault();
        console.log(libval);

        if (!$.trim(libval) /* || libval already exists */ ) {
            alert('Please enter the name of the library');
        }
        else {
            addLibrary(libval);
            $('#lib_select').append($('<option>', {
                value: i,
                text: libval
            }));
        }

        libval = $('#lib_name').val('');
        i++;

    });

};

function getLibrary(cbFn) {
    console.log(cbFn);
    $.ajax({
            url: 'https://node-study-zoverlvx.c9users.io/libraries', // libraries/ + actual name of library?
            dataType: 'json', // jsonp is only used if you're using someone else's API and you want to avoid cross over issues
            type: 'GET',
        })
        .done((result) => {
            cbFn(result);

        });
}

function initializeLibraryDropdown() {
    getLibrary((result) => {
        console.log(result);
        result.forEach((libraryObj) => {
            $('#lib_select').append('<option>' + libraryObj.library_name + '</option>')
        })
    });
}

//on selected library, must append the method dropdown
function libraryDropdown(selected_library) {
    $('#library_drop').change((event) => {
        selected_library = $('#library_drop option:selected');
        getLibrary(selected_library);
        // route is library/library_name
        // need access of object
        // append drop down for methods of that library on select
        getMethod(selected_library);
        $('#method_select').append('<option>' + selected_library.method + '</option>')
    })
}

////// Testing Method format

function addMethodAndDescription(library_name, method_name, description) {
    let method_post = {
        entries: [{
            'method': method_name,
            'description': description
        }]
    };
    let ajax = $.ajax('/libraries/' + library_name, {
        type: 'PUT', //should this be POST or PUT?
        data: JSON.stringify(method_post),
        dataType: 'json',
        contentType: 'application/json'
    });

};

function registerMethodAndDescriptionSubmit() {
    $('#method_submit').submit((event) => {
        let i = 1;
        let libraryval = $('#lib_select').val();
        console.log(libraryval);
        let methodval = $('#method_name').val().trim();
        console.log(methodval);
        let descriptionval = $('textarea[name="description"]').val().trim();
        console.log(descriptionval);
        event.preventDefault();


        if (!$.trim(methodval) && !$.trim(descriptionval)) {
            alert('Please enter a method name with a description');
        }
        else {
            //addMethodAndDescription(libraryval, methodval, descriptionval);
            updateLibrary(libraryval, methodval, descriptionval);
        }

        i++;
        $('#method_select').append($('<option>', {
            value: i,
            text: methodval //associates to all the libraries
        }));

        methodval = $('#method_name').val('');
        descriptionval = $('textarea[name="description"]').val('');

    });

};

function getMethod(cbFn, selected_library) {
    console.log(cbFn);
    $.ajax({
            url: 'https://node-study-zoverlvx.c9users.io/libraries/' + selected_library,
            dataType: 'json',
            type: 'GET'
        })
        .done((result) => { // might need two different GET method arguments
            cbFn(result);
        });
}

function initializeMethodDropdown() {
    getMethod((result) => {
        result.forEach((methodObj) => {
            $('#method_select').append('<option>' + methodObj.entries[0].method + '</option>')
        });
    });
}

////// Testing Method format end


function updateLibrary(library_name, method_update, description_update) {
    let library_put = {
        'library_name': library_name,
        'method': method_update,
        'description': description_update
    };
    addMethodAndDescription(library_name, method_update, description_update);
    let ajax = $.ajax('/libraries/' + library_name, {
        type: 'PUT',
        data: JSON.stringify(library_name),
        dataType: 'json',
        contentType: 'application/json'
    });
}



// Not sure // See pseudo code below this
// function updateLibraryOnSubmit(selected_library) {  
//     $('#lib_submit').submit((event) => {
//             selected_library = $('#library_drop option:selected').val();
// // I'm missing something in order to replace one with the other
//     let libval = $('#lib_name').val().trim();
//     event.preventDefault();

//         if (!$.trim(libval) /* || libval already exists */ ) {
//         alert('Please enter the name of the library');
//     }
//     else {
//         updateLibrary(libval);
//         $('#lib_select').append($('<option>', {
//             text: libval
//         }));
//     }

//     libval = $('#lib_name').val('');

//     }

// PSEUDO Code

// on submit #lib_submit 
// check #library_drop option:selected
// take the value of #lib_name 
// replace the value of #library_drop with the value of #lib_name // library_name = $('#lib_name').val()...?
// if !$.trim(#lib_name) then alert "Please, enter the name of the library"
// if the value of #library_drop already equals #lib_name then alert "This library already exists"
// on submit #method_submit 
// check #method_select option: selected
// take the value of #method_name
// replace the value of #method_select with the value of #method_select
// if !$.trim(#method_name) && !$.trim('textarea[name="description"]') then alert "Please enter a method name with a description"
// if the value of #method_select already equals #method_name then already "This method already exists"
// on submit #method_submit
// check #method_select option: selected
// take the value name of 'textarea[name="description"]'
// replace library_name.entries[0].description with the new value...?

// req.body and req.params
// how to replace the value within an object with a new value
// 












function updateMethodAndDescriptionOnSubmit() {}


//could probably be added to library dropdown
//on selected library, on selected method ???


function deleteLibrary(library_name) {
    let ajax = $.ajax(`/libraries/${library_name}`, {
        type: 'DELETE',
        dataType: 'json'
    });
}




$(document).ready(() => {
    initializeLibraryDropdown();
    initializeMethodDropdown();
    submitLibrary();
    registerMethodAndDescriptionSubmit(); // other functions 
    updateLibrary();
    deleteLibrary();
    getLibrary((result) => {
        console.log(result);
    });
    addLibrary();
    libraryDropdown();
});
