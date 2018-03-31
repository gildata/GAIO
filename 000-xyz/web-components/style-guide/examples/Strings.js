/* 

https://eslint.org/docs/rules/quotes.html

https://eslint.org/docs/rules/prefer-template.html

https://eslint.org/docs/rules/template-curly-spacing

https://eslint.org/docs/rules/no-eval

https://eslint.org/docs/rules/no-useless-escape


*/

/*eslint-env es6*/

let double = "double";
let single = 'single';
let backtick = `backtick`;    // ES6 only


// bad
const name = 'Capt. Janeway';

// good
const name = "Capt. Janeway";

// perfect - template literals can contain interpolation or newlines
const name = `Capt. Janeway`;




// bad
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';

// bad
const errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';

// not good
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

// good
const errorMessage = "This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.";

// not too good
const errorMessage = `
    This is a super long error that was thrown because of Batman. 
    When you stop to think about how Batman had anything to do with this, 
    you would get nowhere fast.
`;

// perfect
let em1 = `This is a super long error that was thrown because of Batman.`,
    em2 = `When you stop to think about how Batman had anything to do with this, you would get nowhere fast.`,

const errorMessage = `${em1} ${em2}`;


