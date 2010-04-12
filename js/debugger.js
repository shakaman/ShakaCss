/*
javascript:void(function(){var%20s=document.createElement('script');s.src='http://github.com/shakaman/ShakaCss/raw/master/js/debugger.js';document.getElementsByTagName('head')[0].appendChild(s);}());

<div id="debugger">
  <h1>ShakaCSS</h1>
  <form name="debugger_form" id="spinner_form">
    <fieldset>
      <legend>Rule</legend>
      <ul>
        <li><label>Width :</label><input type="text" id="rule_width" name="rule_width" class="spinner" /></li>
        <li><label>Height :</label><input type="text" id="rule_height" name="rule_height" class="spinner" /></li>
        <li><label>Top :</label><input type="text" id="rule_top" name="rule_top" class="spinner" /></li>
        <li><label>Left :</label><input type="text" id="rule_left" name="rule_left" class="spinner" /></li>
      </ul>
    </fieldset>
  
    <fieldset>
      <legend>Gridder</legend>
      <ul>
        <li><label>Top :</label><input type="text" id="gridderX_top" name="gridderX_top" class="spinner" /></li>
        <li><label>Left :</label><input type="text" id="gridderY_left" name="gridderY_left" class="spinner" /></li>
      </ul>
    </fieldset>
    
    <fieldset>
      <legend>Others tools</legend>
      <ul>
        <li rel="noalt">alt</li>
        <li rel="href">href</li>
      </ul>
    </fieldset>
  </form>
</div>

<div id="rule" class="draggable resizable"></div>
<div id="gridderX"></div>
<div id="gridderY"></div>

*/

/* 
 ToDoList :
  - add position fixe button
  - list buttons
  
*/

// Load JS
load = function() 
{
  urlBase = "http://github.com/shakaman/ShakaCss/raw/master"; 
  
  load.getScript(urlBase +"/js/jquery-1.4.2.min.js");
  load.getScript(urlBase +"/js/jquery-ui-1.8.custom.min.js");
  load.getScript(urlBase +"/js/ui.core.js");
  load.getScript(urlBase +"/js/ui.spinner.js");
  load.getScript(urlBase +"/js/jquery.cookie.js");
  load.getScript(urlBase +"/js/grid.js");
  load.tryReady(200); // We will write this function later. It's responsible for waiting until jQuery loads before using it.
}

// dynamically load any javascript file.
load.getScript = function(filename) 
{
  var script = document.createElement('script')
  script.setAttribute("type","text/javascript")
  script.setAttribute("src", filename)
  if (typeof script!="undefined")
  document.getElementsByTagName("head")[0].appendChild(script)
}

load.tryReady = function(time_elapsed) 
{
  // Continually polls to see if jQuery is loaded.
  if (typeof $ == "undefined") 
  { // if jQuery isn't loaded yet...
    //if (time_elapsed <= 5000) 
    //{ // and we havn't given up trying...
      setTimeout("load.tryReady(" + (time_elapsed + 200) + ")", 200); // set a timer to check again in 200 ms.
    //} 
    //else 
      //alert("Timed out while loading jQuery.");
  } 
  else 
  {
    if (jQuery().spinner && jQuery().draggable && jQuery().resizable) // check if plugins are ready
    {
      $jShaka = jQuery.noConflict(true);
      initializeDebugger();
    }
    else 
      setTimeout("load.tryReady(" + (time_elapsed + 200) + ")", 200); // set a timer to check again in 200 ms.
  }
}

load();

function initializeDebugger() 
{
  COOKIE_NAME = 'ShakaCss_cookie';
  COOKIE_OPTIONS = { path: '/', expires: 10 };

  var spinner = '<fieldset><legend>Rule</legend><ul><li><label>Width :</label><input type="text" id="rule_width" name="rule_width" class="spinner" /></li><li><label>Height :</label><input type="text" id="rule_height" name="rule_height" class="spinner" /></li><li><label>Top :</label><input type="text" id="rule_top" name="rule_top" class="spinner" /></li><li><label>Left :</label><input type="text" id="rule_left" name="rule_left" class="spinner" /></li></ul></fieldset>';

  var gridder = '<fieldset><legend>Gridder</legend><ul><li><label>Top :</label><input type="text" id="gridderX_top" name="gridderX_top" class="spinner" /></li><li><label>Left :</label><input type="text" id="gridderY_left" name="gridderY_left" class="spinner" /></li></ul></fieldset>';
  
  var others = '<fieldset><legend>Others tools</legend><ul><li rel="noalt">alt</li><li rel="href">href</li></ul></fieldset>';
  
  var debuggerCss = '<div id="debugger"><h1>ShakaCSS</h1><form name="debugger_form" id="debugger_form">'+ spinner + gridder + others +'</form></div><div id="rule" class="resizable draggable"></div><div id="gridderX"></div><div id="gridderY"></div>';
  
  $jShaka('<link rel="stylesheet" href="'+ urlBase +'/css/debugger.css" type="text/css" media="screen" title="no title" charset="utf-8" />').appendTo('head');
  $jShaka('<link rel="stylesheet" href="'+ urlBase +'/css/smoothness/jquery-ui-1.8.custom.css" type="text/css" media="screen" title="no title" charset="utf-8" />').appendTo('head');
  $jShaka(debuggerCss).appendTo('body');

  // spinner
  $jShaka('.spinner').spinner();
  $jShaka('.spinner').bind('spin change', function(event, ui) {
    var s = $jShaka(this).attr('name').split('_');
    var tool = s[0];
    var css = s[1];
    var options = {};
    options[css] = $jShaka(this).val()+'px';
    $jShaka('#' + tool).css(options);

    setCookieValues();
  });
  
  // draggable
  $jShaka('.draggable').draggable();
  $jShaka('.draggable').bind("dragstop", function(event, ui) {
    var tool = $jShaka(this).attr('id');
    var position = $jShaka(this).offset();
    $jShaka('#'+ tool +'_top').val(position.top);
    $jShaka('#'+ tool +'_left').val(position.left);
    
    setCookieValues();
  });
  
  // resizable
  $jShaka('.resizable').resizable();
  $jShaka('.resizable').bind("resize", function(event, ui) {
    var tool = $jShaka(this).attr('id');
    $jShaka('#'+ tool +'_width').val($jShaka(this).width());
    $jShaka('#'+ tool +'_height').val($jShaka(this).height());
    
    setCookieValues();
  });
  
  getCookieValue();
  initPosition();
  designerGrid();
}

function setCookieValues() 
{
  var debuggerValues = $jShaka('#debugger form').serialize();
  $jShaka.cookie(COOKIE_NAME, debuggerValues, { expires: 10 });
}

function getCookieValue() 
{
  var debuggerValues = $jShaka.cookie(COOKIE_NAME);
  debuggerValues = debuggerValues.split('&');
  $jShaka.each(debuggerValues, function(key, value) { 
    var toolValue = value.split('=');
    $jShaka('#'+ toolValue[0]).val(toolValue[1]);
  });
}

function initPosition() 
{
  // GridderX
  $jShaka('#gridderX').css({
    'top': $jShaka('#gridderX_top').val() +'px'
  });
  
  // GridderY
  $jShaka('#gridderY').css({
    'left': $jShaka('#gridderY_left').val() +'px'
  });
  
  // Rule
  $jShaka('#rule').css({
    'width': $jShaka('#rule_width').val() +'px',
    'height': $jShaka('#rule_height').val() +'px',
    'top': $jShaka('#rule_top').val() +'px',
    'left': $jShaka('#rule_left').val() +'px'
  });
}