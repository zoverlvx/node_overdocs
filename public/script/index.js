'use strict';
/* global $ */

// edit the schema to make sure it can only take a string
// make sure that the method associated to the correct library only shows in the drop down correctly on the DOM
// make sure deleting the method works - almost there
// make sure that the description shows up in output on method select

// need to go function by function
// what will automatically select the value of the first library 
// in the dropdown 
// so that the methods can be appended to the DOM?

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

//Double-check
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

function submitLibrary() {
    $('#library_submit').submit((event) => {
        event.preventDefault();
        // let i = 1;
        let existing_library = $('#library_drop option').val();
        let libval = $('#library_name').val().trim();

        if (!$.trim(libval) || libval === existing_library) {
            alert('Please enter the name of the library. If an additional library name is needed, please, include the version.');
        }
        else {
            addLibrary(libval);
            $('#library_select').append($('<option>', {
                // value: i,
                text: libval
            }));
        }

        libval = $('#library_name').val('');
       // i++;

    });

};

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

function initializeLibraryDropdown() {
    getLibrary((result) => {
        result.forEach((libraryObj) => {
            $('#library_select').append('<option value="' + libraryObj.library_name + '">' + libraryObj.library_name + '</option>');
        });
    });
}

function initializeMethodDropdown(selected_library) {
    selected_library = $('#library_select option:selected'); //option this.value
    console.log(selected_library.val(), 'Here is the selected library');
    getMethod(selected_library, (result) => { 
        result.forEach((methodObj) => {
            $('#method_select').append('<option value="' + methodObj.entries[0].method + '">' + methodObj.entries[0].method + '</option>')
        });
    });
}


//on selected library, must append the method dropdown
function libraryDropdown(selected_library) {
  $('#library_select').change((event) => {
    let selected_library = $(this.value);
    selected_library.each(initializeMethodDropdown(selected_library));
  });
}

// function libraryDropdown(selected_library) {
//     $('#library_drop').change((event) => {
//         selected_library = $('#library_drop option:selected');
//         getMethod(selected_library);
//         $('#method_select').append('<option>' + selected_library.entries[0].method + '</option>')
//     })
// }

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

function getMethod(selected_library, cbFn) {
    // console.log(cbFn);
    $.ajax({
            url: 'https://node-study-zoverlvx.c9users.io/libraries/' + 'node.js',
            dataType: 'json',
            type: 'GET'
        })
        .done((result) => {
            console.log('Here is the result', result);
            // 
            // might need two different GET method arguments
            cbFn(result);
        })
        .fail((err) => {
            console.log(err);
        });
}


function methodDropdown(selected_method) {
    $('#method_drop').change((event) => {
        selected_method = $('#method_drop option:selected');
        getMethod(selected_method);
        console.log(selected_method);
        //I don't really believe this code. How can one access description through the selected method as an argument? 
        //This doesn't match the Schema itself
        $('#output').append('<p>' + selected_method.entries[0].description + '</p>');
    });
}

function deleteLibrary(library_name) {
    console.log('Here is library_name', library_name);
    $.ajax('/libraries/' + library_name, {
        type: 'DELETE',
        // dataType: 'json'
    }).done(function() {
        console.log('Hello', library_name);
        $('#library_drop option:selected').remove();
    });
}

function onDeleteLibrary() {
    $('#library_delete').click((event) => {
        event.preventDefault();
        let selected_library = $('#library_drop option:selected').val();
        console.log("Here is selected_library", selected_library);
        deleteLibrary(selected_library);
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
