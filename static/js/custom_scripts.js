

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
  var increment = 5;

  if (computedStyle) { // This will be true on nearly all browsers
      fontSize = parseFloat(computedStyle && computedStyle.fontSize);

      if (target == document.getElementById("incFontSizeButton")) {
        fontSize += increment;
      } else if (target == document.getElementById("decFontSizeButton")) {
        fontSize -= increment;
      }
      content.style.fontSize = fontSize + 'px';
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

function scrollDown() {
  var content = document.getElementById("main-content");
  var computedStyle = window.getComputedStyle
        ? getComputedStyle(content) // Standards
        : content.currentStyle;     // Old IE
  var fontSize = parseFloat(computedStyle && computedStyle.fontSize);

  document.body.scrollTop = document.body.scrollTop + fontSize;
  document.documentElement.scrollTop = document.documentElement.scrollTop + fontSize;
}

function scrollUp() {
  var content = document.getElementById("main-content");
  var computedStyle = window.getComputedStyle
        ? getComputedStyle(content) // Standards
        : content.currentStyle;     // Old IE
  var fontSize = parseFloat(computedStyle && computedStyle.fontSize);

  document.body.scrollTop = document.body.scrollTop - fontSize;
  document.documentElement.scrollTop = document.documentElement.scrollTop - fontSize;
}

function jumpNext() {
  // jump to next element?
  var content = document.getElementById("main-content");
  var sections = content.children;
  const random = Math.floor(Math.random() * sections.length);
  var top = sections[random].getBoundingClientRect();
  window.scroll(top['x'], top['y'])
}

function jumpUp() {
  var jumpValue = window.innerHeight; // user setting to adjust this
  var content = document.getElementById("main-content");
  var computedStyle = window.getComputedStyle
        ? getComputedStyle(content) // Standards
        : content.currentStyle;     // Old IE
  var fontSize = parseFloat(computedStyle && computedStyle.fontSize);

  document.body.scrollTop = document.body.scrollTop - jumpValue + fontSize*2;
  document.documentElement.scrollTop = document.documentElement.scrollTop - jumpValue + fontSize*2;
}

function jumpDown() {
  var jumpValue = window.innerHeight; // user setting to adjust this
  var content = document.getElementById("main-content");
  var computedStyle = window.getComputedStyle
        ? getComputedStyle(content) // Standards
        : content.currentStyle;     // Old IE
  var fontSize = parseFloat(computedStyle && computedStyle.fontSize);

  document.body.scrollTop = document.body.scrollTop + jumpValue - fontSize*2;
  document.documentElement.scrollTop = document.documentElement.scrollTop + jumpValue - fontSize*2;
}

function rgba(r,g,b,a) {
  return 'rgba(' + [(r||0),(g||0),(b||0),(a||0)].join(',') + ')';
}

var highlightToggle = false;

function keywordHighlight() {
  highlightToggle = !highlightToggle;
  var keywords = document.getElementsByClassName('keyword');
  if (highlightToggle) {
    for (var i=0;i<keywords.length;i++) {
      keywords[i].style.backgroundColor=rgba(255,255,0,0.75);
    }
  } else {
    for (var i=0;i<keywords.length;i++) {
      keywords[i].style.backgroundColor='';
    }
  }
}

function navigation(evt){
  key = evt.keyCode;
  console.log(key);
  // console.log(String.fromCharCode(evt.keyCode));
  if (key==84){
    gotoTop();
  } else if (key==66) {
    gotoBottom();
  } else if (key==87) {
    scrollUp();
  } else if (key==83) {
    scrollDown();
  } else if (key==65) {
    jumpUp();
  } else if (key==68) {
    jumpDown();
  } else if (key==72) {
    keywordHighlight();
  }
}

document.onkeydown = navigation;