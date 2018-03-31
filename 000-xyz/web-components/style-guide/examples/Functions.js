/* 

https://eslint.org/docs/rules/func-style

https://eslint.org/docs/rules/wrap-iife.html

https://eslint.org/docs/rules/no-loop-func.html

https://eslint.org/docs/rules/prefer-rest-params

https://eslint.org/docs/rules/no-new-func

https://eslint.org/docs/rules/space-before-function-paren
https://eslint.org/docs/rules/space-before-blocks

https://eslint.org/docs/rules/no-param-reassign.html

https://eslint.org/docs/rules/prefer-spread

https://eslint.org/docs/rules/function-paren-newline




https://eslint.org/docs/rules/arrow-spacing.html

https://eslint.org/docs/rules/prefer-arrow-callback.html

https://eslint.org/docs/rules/no-confusing-arrow

https://eslint.org/docs/rules/arrow-parens.html

https://eslint.org/docs/rules/arrow-body-style.html

*/


/*eslint func-style: ["error", "expression", { "allowArrowFunctions": true }]*/
/*eslint func-style: ["error", "declaration", { "allowArrowFunctions": true }]*/


// bad
console.log(`foo =`, foo);

var foo = function () {
    // ...
};

console.log(`foo =`, foo);

function foo() {
    // ...
};


// not too good
console.log(`foo =`, foo);

let foo = function () {
    // ...
};

// good
console.log(`foo =`, foo);

let foo = () => {
    // ...
};


// perfect
console.log(`foo =`, foo);

const foo = () => {
    // ...
};


