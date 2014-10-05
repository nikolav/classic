[classic.js](https://github.com/nikolav/classic "classic.js")
=============================================================

[jQuery](http://jquery.com/ "jquery.js") plugin to batch-manipulate elements' class set in one go

example usage
-------------


    // require jQuery and classic.js

    // select all <button>s,
    // add 'btn' class, 
    // remove 'active' class, 
    // toggle 'alert' class

    $('button').classic('+btn -active alert');

    // that's it
