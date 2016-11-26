'use strict';
/* global $ */

// on submit of library, library is added to library dropdown and store in db
// enter method name in input && enter description for method
// on submit for method name and description store info in two separate props under the library selected in the dropdown
// on library select, show method dropdown
// on method dropdown select, append method and description

// added to library submit
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

function addMethod(method_name, des) {
    let method_post = {
        entries: [{
            'method': method_name,
            'description': des
        }]
    };
    let ajax = $.ajax('/libraries/library_name', {
        type: 'POST', //should this be POST or PUT?
        data: JSON.stringify(method_post),
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
            addLibrary(libval); // trying to get the ajax to work with the submit
            $('#lib_select').append($('<option>', {
                value: i,
                text: libval
            }));
        }

        libval = $('#lib_name').val('');
        i++;

    });

};


//addMethod should be added to this
function submitMethod(method_name, des) {
    $('#method_submit').submit((event) => {
        event.preventDefault();
        let i = 1;
        let methodval = $('#method_name').val().trim();
        let descriptionval = $('#description').val()//.trim();
        

        if (!$.trim(methodval) && !$.trim(descriptionval)) {
            alert('Please enter a method name with a description');
        }
        else {
            addMethod(methodval, descriptionval)
        }

        i++;
    });

};


function getLibrary(cbFn) {
    console.log(cbFn);
    $.ajax({
            url: 'https://node-study-zoverlvx.c9users.io/libraries', // 
            // data: request,
            dataType: 'json', // jsonp is only used if you're using someone else's API and you want to avoid cross over issues
            type: 'GET',
        })
        .done((result) => {
            cbFn(result); 
        });
}

function getMethod(cbFn) {
    console.log(cbFn);
    $.ajax({
        url: 'https://node-study-zoverlvx.c9users.io/libraries/library_name',
        dataType: 'json',
        type: 'GET'
    })
    .done((result) => {
        cbFn(result);
    });
}

function initializeLibraryDropdown() {
    getLibrary((result) => {
        result.forEach((libraryObj) => {
            $('#lib_select').append('<option>' + libraryObj.library_name + '</option>')
        })
    });
}

// method drop down
//$('#output').append('<p>Method selected:</p> \n')

function initializeMethodDropdown() {
    getMethod((result) => {
        result.forEach((methodObj) => {
            $('#method_select').append('<option>' + methodObj.method + '</option>')
        });
    });
}

//on selected library, must append the method dropdown
function libraryDropdown(selected_library) {
    $('#library_drop').change((event) => {
        $('#hidden').show();
        selected_library = $('#library_drop option:selected');
        // GET
        // route is library/library_name
        // need access of object
        // append drop down for methods of that library on select
        getMethod(selected_library);
        $('#method_select').append('<option>' + selected_library.method +'</option>')
    })
}

//could probably be added to library dropdown
//on selected library, on selected method ???
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
}

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
    submitMethod();
    updateLibrary();
    deleteLibrary();
    getLibrary((result) => {
        console.log(result);
    });
    addLibrary();
    libraryDropdown();
});
