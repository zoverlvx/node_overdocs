'use strict';
/* global $ */

function getLibrary(cbFn) {
    $.ajax({
            url: 'https://node-study-zoverlvx.c9users.io/libraries',
            dataType: 'json',
            type: 'GET',
        })
        .done((result) => {
            cbFn(result);

        });
}

function addLibrary(library_name) {
    let library_post = {
        'library_name': library_name
    };
    $.ajax('/libraries', {
        type: 'POST',
        data: JSON.stringify(library_post),
        dataType: 'json',
        contentType: 'application/json'
    });
};

function updateLibrary(library_name, method_update, description_update) {
    let library_put = {
        'method': method_update,
        'description': description_update
    };
    $.ajax('/libraries/' + library_name, {
        type: 'PUT',
        data: JSON.stringify(library_put),
        dataType: 'json',
        contentType: 'application/json'
    });

}

function deleteLibrary(library_name) {
    console.log('Here is library_name', library_name);
    $.ajax('/libraries/' + library_name, {
        type: 'DELETE'
    }).done(function() {
        $('#library_drop option:selected').remove();
    });
}

function submitLibrary() {
    $('#library_submit').submit((event) => {
        event.preventDefault();
        let existing_library = $('#library_drop option').val();
        let libval = $('#library_name').val().trim();

        if (!$.trim(libval) || libval === existing_library) {
            alert('Please enter the name of the library. If an additional library name is needed, please, include the version.');
        }
        else {
            addLibrary(libval);
            $('#library_select').append($('<option>', {
                text: libval
            }));
        }

        libval = $('#library_name').val('');
    });

};

function initializeLibraryDropdown() {
    getLibrary((result) => {
        result.forEach((libraryObj) => {
            $('#library_select').append('<option value="' + libraryObj.library_name + '">' + libraryObj.library_name + '</option>');
        });
    });
}


function libraryDropdown() {
    $('#library_select').change((event) => { // change works on select, input, or textarea
        $('#method_select').empty();
        console.log('This is the event: ', event.target.value);
        initializeMethodDropdown(event.target.value); // important function
    });
}

function onDeleteLibrary() {
    $('#library_delete').click((event) => {
        event.preventDefault();
        let selected_library = $('#library_drop option:selected').val();
        deleteLibrary(selected_library);
    });
}

function getMethod(selected_library, cbFn) {

    $.ajax({
            url: 'https://node-study-zoverlvx.c9users.io/libraries/' + selected_library,
            dataType: 'json',
            type: 'GET'
        })
        .done((result) => {
            cbFn(result);
        })
        .fail((err) => {
            console.log(err);
        });
}

function deleteMethodAndDescription(selected_library) {
    $.ajax('/libraries/' + selected_library, {
        type: 'DELETE',
        // dataType: 'json',
    }).done(() => {
        $('#method_drop option:selected').remove();
    })
}

//Method doesn't associate to the library on the DOM
function addMethodAndDescription(library_name, method_name, description) {
    let method_put = {
        'method': method_name,
        'description': description
    };
    $.ajax('/libraries/' + library_name, {
        type: 'PUT',
        data: JSON.stringify(method_put),
        dataType: 'json',
        contentType: 'application/json'
    });

};

function registerMethodAndDescriptionSubmit() {
    $('#method_submit').submit((event) => {
        let i = 1;
        let libraryval = $('#library_select').val();
        let methodval = $('#method_name').val().trim();
        let descriptionval = $('textarea[name="description"]').val().trim();
        event.preventDefault();

        if (!$.trim(methodval) && !$.trim(descriptionval)) {
            alert('Please enter a method name with a description');
        }
        else {
            addMethodAndDescription(libraryval, methodval, descriptionval);
            //updateLibrary(libraryval, methodval, descriptionval);
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

//needs fixed
function initializeMethodDropdown(selected_library) {
    getMethod(selected_library, (result) => {
        result.entries.forEach((methodObj) => {
            $('#method_select').append('<option value="' + methodObj.method + '">' + methodObj.method + '</option>')
        });
    });
}

function methodDropdown(selected_method){ //doesn't look right
    getMethod(selected_method, (event) => {
       $('#output').empty();
       $('#output').append('<p>' + selected_method.event.description + '</p>')
    });
}
    
// function libraryDropdown() {
//     $('#library_select').change((event) => { // change works on select, input, or textarea
//         $('#method_select').empty();
//         console.log('This is the event: ', event.target.value);
//         initializeMethodDropdown(event.target.value); // important function
//     });
// }


function onDeleteMethod(selected_method) {
    $('method_delete').click((event) => {
        event.preventDefault();
        selected_method = $('method_drop option:selected').val();
        deleteMethodAndDescription();
    });
}



// PSEUDO Code

// on submit #library_submit 
// check #library_drop option:selected
// take the value of #library_name 
// replace the value of #library_drop with the value of #library_name // library_name = $('#library_name').val()...?
// if !$.trim(#library_name) then alert "Please, enter the name of the library"
// if the value of #library_drop already equals #library_name then alert "This library already exists"
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


function initializeDropdowns() {
    initializeLibraryDropdown();
    initializeMethodDropdown();
}


$(document).ready(() => {
    onDeleteLibrary();
    initializeDropdowns();
    submitLibrary();
    registerMethodAndDescriptionSubmit(); // other functions 
    //updateLibrary();
    getLibrary((result) => {
        console.log(result);
    });
    addLibrary();
    libraryDropdown();
    addMethodAndDescription(); //('ggg', 'new method', 'new description'); //play around with this line
    // can the UI/an event call addMethodAndDescription
});
