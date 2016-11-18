'use strict';
/* global $ */

let libraryPro = () => {

    this.form = $('#lib_submit');
    this.form.submit(this.onAddItemSubmit.bind(this));
}

function onAddItemSubmit(event) {
    event.preventDefault();
    let value = this.input.val().trim();
    if (value != '') {
        addLibrary();
    }
    value.val('');
}

function getLibrary() {

    let request = {
        //library_name: library_name
    }

    $.ajax({
            url: "https://node-study-zoverlvx.c9users.io/libraries", // 
            data: request,
            dataType: "json", // jsonp is only used if you're using someone else's API and you want to avoid cross over issues
            type: "GET",
        })
        .done((result) => {
            console.log(result);
        });

}

function addLibrary(library_name) {
    let library_post = {
        'library_name': library_name
    };
    let ajax = $.ajax('/libraries', {
        type: 'POST',
        data: JSON.stringify(library_name),
        dataType: 'json',
        contentType: 'application/json'
    });
    //
}

function updateLibrary(library_name) {
    let library_put = {
        'library_name': library_name._id
    };
    let ajax = $.ajax(`/libraries/${library_name}` , {
                    type: 'PUT',
            data: JSON.stringify(library_name),
            dataType: 'json',
            contentType: 'application/json'
    });
//
}

function deleteLibrary (library_name) {
    let ajax = $.ajax(`/libraries/${library_name}` , {
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
        //getLibrary();
        enterLibName();
    });
