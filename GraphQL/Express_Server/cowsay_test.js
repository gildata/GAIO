var cowsay = require("cowsay");

console.log(cowsay.say({
	text : "I'm a moooodule",
	e : "00 00",
	T : "666 666"
	// e : "oO",
	// T : "U "
}));

// or cowsay.think()

console.log(cowsay.say({
	text : `Node.js version: ${process.version}`,
}));

console.log(cowsay.say({
	text : `OS: ${process.env.OS}`,
}));


/*

// SyntaxError: Unexpected token import

import { say } from 'cowsay';

console.log(say({ text: 'grazing in the browser' }));

*/


/*

// SyntaxError: Unexpected token import

import { think, SQUIRREL } from 'cowsay';

console.log(think({
    text: 'grazing in the browser',
    cow: SQUIRREL,
    eyes: 'pp',
    tongue: ';;',
}));


say({
    text: 'hello',
    cow: '', // Template for a cow, get inspiration from `./cows`
    eyes: 'oo', // Select the appearance of the cow's eyes, equivalent to cowsay -e
    tongue: 'L|', // The tongue is configurable similarly to the eyes through -T and tongue_string, equivalent to cowsay -T
    wrap: false, // If it is specified, the given message will not be word-wrapped. equivalent to cowsay -n
    wrapLength: 40, // Specifies roughly where the message should be wrapped. equivalent to cowsay -W
    mode: 'b', // One of 	"b", "d", "g", "p", "s", "t", "w", "y"
});

*/
