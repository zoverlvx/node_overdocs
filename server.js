console.log("Starting program.");

//Nodepedia TM

const storage = require("node-persist");
storage.initSync();

const argv = require('yargs')
.command('create', 'Creates a new word for the dictionary.', (yargs) => {
    yargs.options({
        word_name: {
            demand: true,
            alias: 'word',
            type: 'string',
            description: 'This is a word in the dictionary.'
        },
        definition: {
            demand: true,
            alias: 'define',
            type: 'string',
            description: 'This is the definition of the word.'
        },
        example: {
            demand: true,
            alias: 'eg',
            type: 'string',
            description: 'This is an example of the word in use.'
        }
    }).help('help');
})
.command('find', 'Finds word by name.', (yargs) => {
    yargs.options({
         word_name: {
            demand: true,
            alias: 'word',
            type: 'string',
            description: 'This is a word in the dictionary.'
        },
        definition: {
            demand: true,
            alias: 'define',
            type: 'string',
            description: 'This is the definition of the word.'
        },
        example: {
            demand: true,
            alias: 'eg',
            type: 'string',
            description: 'This is an example of the word in use.'
        }
    }).help('help');
})
.help('help')
.argv; // No idea what .argv is doing
let command = argv._[0]; // Can't remember what this does

//console.log(argv);

if (argv._[0] === 'hello'){ // trying to think of a way to make this into
// a 'terminal search input' so that the user can put in a function/word and the 
//program will retrieve it and print it to console
	console.log("Hello World!")
}
//is it a crazy idea to perhaps make a dictionary that is available from
//the backend (with node) as well as the front end (with the use of react.js)?