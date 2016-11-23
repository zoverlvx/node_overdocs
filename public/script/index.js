'use strict';
/* global $ */

// on submit of library, library is added to library dropdown and store in db
// enter method name in input && enter description for method
// on submit for method name and description store info in two separate props under the library selected in the dropdown
// on library select, show method dropdown
// on method dropdown select, append method and description

function library_dropdown(selected_library) {
    $('#library_drop').change((event) => {
        $('#hidden').show();
        let selectedOption = $('#library_drop option:selected');
        getLibrary(selected_library)
        // need access of object
        // append drop down for methods of that library on select
        $('#method_select').append('<option>' + /**/ + '</option>')
    })
}

// method drop down
//$('#output').append('<p>Method selected:</p> \n')

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
};

function submitMethod(method_name, des) {
    $('#method_submit').submit((event) =>
    {
        let i = 1;
        let methodval = $('#method_name').val().trim();
        let descriptionval = $('#description').val().trim();
        event.preventDefault();
        
        if (!$.trim(methodval) && !$.trim(descriptionval)) {
            alert('Please enter a method name with a description');
        }
        else {
            addMethod(methodval, descriptionval)
        }
        
        
    });
    
}

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
}

function deleteLibrary(library_name) {
    let ajax = $.ajax(`/libraries/${library_name}`, {
        type: 'DELETE',
        dataType: 'json'
    });
}

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

}

$(document).ready(() => {
    $('#hidden').hide();
    submitLibrary();
    getLibrary();
    addLibrary();
    library_dropdown();
});



