
// #classic.js
jQuery.prototype['classic'] = 
(function (jQuery, doc, RegExp, pA, pF, pO) {
  
  
  // saves filesize when minified
  var CLASSLIST = 'classList';
  var CLASSNAME = 'className';
  var STYLE     = 'style';
  
  
  var forEach = pF.call.bind(pA.forEach);
  
  var jquerytrim = jQuery.trim;
  
  // detect whitespace globaly
  // copy-pasted from: [es5-shim](https://github.com/es-shims/es5-shim.git)
  var re_blanks = /[\x09-\x0D\x20\xA0\u1680\u180E\u2000-\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/g;
  
  // split a string on '+|-' and 'rest...' parts
  var re_mpval = /^([+\-]?)([\s\S]*)$/;
  
  // detect special regexp characters in a string, 
  // copy-pasted from: [Lodash](http://lodash.com/)
  var re_reserved = /[.*+?^${}()|[\]\/\\]/g;


  // use .classList{} if available, 
  // manipulate classes manualy otherwise.
  // http://caniuse.com/#search=classList
  
  // DOMTokenList{}
  //   .length
  //   add contains item remove toggle
  
  var classic_action = 
    
    // implements .classList?
    ((/DOMTokenList/i).test(pO.toString.call(doc.documentElement[CLASSLIST]))) ? 
    
    // use .classList API
    ({
      '!': function (node, cclass) {
        node[CLASSLIST].toggle(cclass);
      },
      '+': function (node, cclass) {
        node[CLASSLIST].add(cclass);
      },
      '-': function (node, cclass) {
        node[CLASSLIST].remove(cclass);
      }
    }):
    
    // use custom API
    ({
      '!': classic_toggle_class,
      '+': classic_add_class,
      '-': classic_remove_class
    });
  
  
  // #main
  // @param String input, 'flagged' whitespace-separated string of classes to modify,
  //   example: '+class2add -class2rm class2toggle -a +b etc'
  // @returns jQuery object
  return function (input) {
    return (0 < this.length) && 
      (input = classic_parsews(input)).length && 
      this.each(classic_looper, input), this;
  };
  
  
  // #helpers
  
  function classic_add_class (node, c) {
    classic_hasclass(node, c) ||
      (node[STYLE][CLASSNAME] += (" " + c));
  }

  function classic_adjuster (mcls) {
    (mcls = mcls.match(re_mpval))[2] && 
      classic_action[(mcls[1] || "!")](this, mcls[2]);
  }

  function classic_escapeRegExp (s) {
    return s && (re_reserved.lastIndex = 0, re_reserved.test(s)) ? 
      s.replace(re_reserved, "\\$&") : s;
  };

  function classic_hasclass (node, c) {
    return ~node[STYLE][CLASSNAME].split(re_blanks).indexOf(c);
  }

  function classic_looper () {
    return forEach(arguments, classic_adjuster, this), 1;
  }

  function classic_parsews (s) {
    return s && (s = jquerytrim("" + s)) && s.split(re_blanks) || [];
  }

  function classic_remove_class (node, c) {
    classic_hasclass(node, c) && (
      node[STYLE][CLASSNAME] = 
        jquerytrim(
          node[STYLE][CLASSNAME].
          relpace(new RegExp("\\b" + classic_escapeRegExp(c) + "\\b", "g"), "")
        )
    );
  }

  function classic_toggle_class (node, c) {
    classic_hasclass(node, c)       ? 
      classic_remove_class(node, c) : 
      classic_add_class(node, c);
  }
})(jQuery, window.document, RegExp, Array.prototype, Function.prototype, Object.prototype);

// eof
