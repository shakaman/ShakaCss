// Load JS
load = function() 
{
  // urlBase = "http://debuggercss.local"; 
  urlBase = "http://shakacss.af83.com"; 

  /*
  load.getScript(urlBase +"/js/jquery-1.4.2.min.js");
  load.getScript(urlBase +"/js/jquery-ui-1.8.custom.min.js");
  load.getScript(urlBase +"/js/ui.core.js");
  load.getScript(urlBase +"/js/ui.spinner.js");
  load.getScript(urlBase +"/js/jquery.cookie.js");
  load.getScript(urlBase +"/js/grid.js");
  */
  
  load.getScript(urlBase +"/tools/minify_lib.js");
  
  load.tryReady(1000); // We will write this function later. It's responsible for waiting until jQuery loads before using it.
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

  var guides = '<fieldset><legend>Guides</legend><ul><li><label>Top :</label><input type="text" id="guideX_top" name="guideX_top" class="spinner" /></li><li><label>Left :</label><input type="text" id="guideY_left" name="guideY_left" class="spinner" /></li></ul></fieldset>';
  
  var others = '<fieldset><legend>Others tools</legend><ul class="others"><li rel="grid" class="on">grid</li></ul></fieldset>';
  
  var debuggerCss = '<div id="debugger"><div id="polux"></div><h1>ShakaCSS</h1><form name="debugger_form" id="debugger_form">'+ spinner + guides + others +'</form></div><div id="rule" class="resizable draggable"></div><div id="guideX"></div><div id="guideY"></div>';
  
  $jShaka("<style>#debugger *{margin:0;padding:0;border:0;font:normal 12px Arial} #debugger{position:fixed;z-index:2000;top:150px;left:-180px;width:150px;min-height:300px;border:1px solid #FFF;border-left:none;font:normal 12px Arial;color:#FFF;text-align:left;background:#E2007A;box-shadow:3px 3px 4px #888;-moz-box-shadow:3px 3px 4px #888;-webkit-box-shadow:3px 3px 4px #888} #debugger #polux{position:absolute;z-index:9999;top:110px;right:-110px;width:80px;height:89px;background:url('http://shakacss.af83.com/images/polux.png')no-repeat;cursor:pointer} #debugger h1{position:absolute;top:135px;right:-76px;height:30px;width:120px;border:1px solid #FFF;border-bottom:none;font:bold 12px/25px Helvetica;color:#FFF;text-align:center;background:#E2007A;cursor:pointer;transform:rotate(90deg);-webkit-transform:rotate(90deg);-moz-transform:rotate(90deg)} #debugger ul{margin:10px 0;padding:0} #debugger ul li{display:inline;padding:0;list-style-type:none;cursor:pointer} #debugger ul.others li{display:inline;width:auto;padding:1px 3px;margin:0 10px 0 0;border:1px solid #FFF;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px} #debugger ul.others li.on{background:#FFF;color:#E2007A;} #debugger fieldset{margin:10px 0 0 0;border:none} #debugger fieldset legend{margin:0;padding:0;font:bold 13px Helvetica} #debugger fieldset ul{margin:0 10px} #debugger fieldset ul li{float:left;width:50%} #debugger fieldset ul li label{font:normal 11px Helvetica;color:#FFF} #debugger .ui-spinner{display:block;position:relative;overflow:hidden;width:50px;padding:0 5px 0 0;border:1px solid #999;background:#FEFEFE} #debugger .ui-spinner-disabled{background:#F4F4F4;color:#CCC} #debugger .ui-spinner-box{width:90%;height:100%;margin:0;padding:0;font-size:120%;border:none;background:none} #debugger .ui-spinner-up, #debugger .ui-spinner-down{width:30%;height:50%;font-size:0.5em;padding:0;margin:0;z-index:100;text-align:center;vertical-align:middle;position:absolute;right:0;cursor:default;border:1px solid #999;border-right:none;border-top:none;background:#FFF;color:#333} #debugger .ui-spinner-down{bottom:0;border-bottom:0} #debugger .ui-spinner-pressed{background:#FEFEFE} #debugger .ui-spinner-list, #debugger .ui-spinner-listitem{margin:0;padding:0} #debugger .ui-spinner input{width:35px;margin:0;border:none;text-align:right;color:#333} #guideY{position:fixed;z-index:1999;top:0;left:-1px;width:10px;height:100%;border-left:1px solid #9CFFFF;}#guideY:hover{background:rgba(0, 0, 0, 0.2);} #guideX{position:fixed;z-index:1999;top:-1px;left:0;width:100%;height:10px;border-top:1px solid #9CFFFF}#guideX:hover{background:rgba(0, 0, 0, 0.2);} #rule{position:absolute!important;z-index:1999;width:50px;height:50px;background:rgba(0,0,0,0.5)} .ui-draggable{cursor:move;} .ui-resizable{position:relative;} .ui-resizable-handle{position:absolute;font-size:0.1px;z-index:99999;display:block;} .ui-resizable-disabled .ui-resizable-handle, .ui-resizable-autohide .ui-resizable-handle{display:none;} .ui-resizable-n{cursor:n-resize;height:7px;width:100%;top:-5px;left:0;} .ui-resizable-s{cursor:s-resize;height:7px;width:100%;bottom:-5px;left:0;} .ui-resizable-e{cursor:e-resize;width:7px;right:-5px;top:0;height:100%;} .ui-resizable-w{cursor:w-resize;width:7px;left:-5px;top:0;height:100%;} .ui-resizable-se{cursor:se-resize;width:12px;height:12px;right:1px;bottom:1px;} .ui-resizable-sw{cursor:sw-resize;width:9px;height:9px;left:-5px;bottom:-5px;} .ui-resizable-nw{cursor:nw-resize;width:9px;height:9px;left:-5px;top:-5px;} .ui-resizable-ne{cursor:ne-resize;width:9px;height:9px;right:-5px;top:-5px;} .ui-dialog .ui-resizable-se{width:14px;height:14px;right:3px;bottom:3px;}</style>").appendTo('head');
  
  // $jShaka('<link rel="stylesheet" href="'+ urlBase +'/css/debugger.css" type="text/css" media="screen" title="no title" charset="utf-8" />').appendTo('head');
  // $jShaka('<link rel="stylesheet" href="'+ urlBase +'/css/smoothness/jquery-ui-1.8.custom.css" type="text/css" media="screen" title="no title" charset="utf-8" />').appendTo('head');
  $jShaka(debuggerCss).appendTo('body');
  
  $jShaka('#polux').click(function() {
    $jShaka('#debugger:not(#debugger.on)').animate({
      left: '0',
    }, 250);
    $jShaka('#debugger.on').animate({
      left: '-180px',
    }, 250);
    $jShaka('#debugger').toggleClass("on");
  });
  
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
  $jShaka("#guideX").draggable({ axis: 'y' });
  $jShaka("#guideY").draggable({ axis: 'x' });
  $jShaka('.draggable, #guideX, #guideY').bind("dragstop", function(event, ui) {
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
  if (debuggerValues == null)
    debuggerValues = "rule_width=100&rule_height=50&rule_top=0&rule_left=0&guideX_top=0&guideY_left=0";
    
  debuggerValues = debuggerValues.split('&');
  $jShaka.each(debuggerValues, function(key, value) { 
    var toolValue = value.split('=');
    $jShaka('#'+ toolValue[0]).val(toolValue[1]);
  });
}

function initPosition() 
{
  // GridderX
  $jShaka('#guideX').css({
    'top': $jShaka('#guideX_top').val() +'px'
  });
  
  // GridderY
  $jShaka('#guideY').css({
    'left': $jShaka('#guideY_left').val() +'px'
  });
  
  // Rule
  $jShaka('#rule').css({
    'width': $jShaka('#rule_width').val() +'px',
    'height': $jShaka('#rule_height').val() +'px',
    'top': $jShaka('#rule_top').val() +'px',
    'left': $jShaka('#rule_left').val() +'px'
  });
}