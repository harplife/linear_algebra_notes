// http://docs.mathjax.org/en/latest/input/tex/extensions.html
window.MathJax = {
  // ams and mathtools allow for aligning matrices
  loader: {load: [
    '[tex]/ams', '[tex]/mathtools'
  ]},
  tex: {packages: {'[+]': ['ams', 'mathtools']}}
};

// https://codingreflections.com/hide-header-on-scroll-down/
(function(){

var doc = document.documentElement;
var w = window;

var prevScroll = w.scrollY || doc.scrollTop;
var curScroll;
var direction = 0;
var prevDirection = 0;

var header = document.getElementById('site-header');

var checkScroll = function() {

  /*
  ** Find the direction of scroll
  ** 0 - initial, 1 - up, 2 - down
  */

  curScroll = w.scrollY || doc.scrollTop;
  if (curScroll > prevScroll) { 
    //scrolled up
    direction = 2;
  }
  else if (curScroll < prevScroll) { 
    //scrolled down
    direction = 1;
  }

  if (direction !== prevDirection) {
    toggleHeader(direction, curScroll);
  }

  prevScroll = curScroll;
};

var toggleHeader = function(direction, curScroll) {
  // dunno why, but header needed to be called again
  var header = document.getElementById('site-header');

  //replace 52 with the height of your header in px
  if (direction === 2 && curScroll > 52) { 
    header.classList.add('hide');
    prevDirection = direction;
  }
  else if (direction === 1) {
    header.classList.remove('hide');
    prevDirection = direction;
  }
};

window.addEventListener('scroll', checkScroll);

})();

function changeFontSize(target) {
  // changes font size depending on the id calling
  var content = document.getElementById("main-content");
  var computedStyle = window.getComputedStyle
        ? getComputedStyle(content) // Standards
        : content.currentStyle;     // Old IE
  var fontSize;

  if (computedStyle) { // This will be true on nearly all browsers
      fontSize = parseFloat(computedStyle && computedStyle.fontSize);

      if (target == document.getElementById("incFontSizeButton")) {
        fontSize += 5;
      } else if (target == document.getElementById("decFontSizeButton")) {
        fontSize -= 5;
      }
      content.style.fontSize = fontSize + "px";
  }
}

function changeMargin(target) {
  // changes margin size depending on the id calling
  var content = document.getElementById("main-content");
  var computedStyle = window.getComputedStyle
        ? getComputedStyle(content) // Standards
        : content.currentStyle;     // Old IE
  var marginLeft;
  var marginRight;
  var interval = 15;

  if (computedStyle) { // This will be true on nearly all browsers
      marginLeft = parseFloat(computedStyle && computedStyle.marginLeft);
      marginRight = parseFloat(computedStyle && computedStyle.marginRight);

      if (target == document.getElementById("incMarginButton")) {
        marginLeft += interval;
        marginRight += interval;
      } else if (target == document.getElementById("decMarginButton")) {
        marginLeft -= interval;
        marginRight -= interval;
      }
      content.style.marginLeft = marginLeft + "px";
      content.style.marginRight = marginRight + "px";
  }
}

function changeBGColor() {
  var selected = document.getElementById("bg-color").value;
  document.body.style.backgroundColor = selected;
}

function gotoTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function gotoBottom(){
  // FIXME: it doesn't go to the bottom all the way!!
  // NOTE: increasing font size increases body height
  var body = document.body,
    html = document.documentElement;

  var height = Math.max( body.scrollHeight, body.offsetHeight, 
                      html.clientHeight, html.scrollHeight, html.offsetHeight );
  document.body.scrollTop = height;
  document.documentElement.scrollTop = height;
}