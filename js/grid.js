function designerGrid() {
  $jShaka('body').append('<canvas id="designer_grid" width= ' + $jShaka(document).width() + ' height= ' + $jShaka(document).height() + '></canvas>');
  $jShaka('#designer_grid').css({
    'left': '0px', 
    'top': '0px', 
    'position': 'absolute', 
    'overflow': 'hidden', 
    'z-index': '-9999', 
    'filter': 'alpha(opacity(=75)', 
    '-moz-opacity': '0.75', 
    '-webkit-opacity': '0.75', 
    'opacity': '0.75'
  });
  
  var canvas = document.getElementById('designer_grid');
  var context = canvas.getContext('2d');
  
  context.beginPath();  
  context.strokeStyle = "#eee";
  // draw the vertical grid lines
  for (var x = 0.5; x < $jShaka(document).width(); x += 20)
  {
    context.moveTo(x - 0.5, 0);
    context.lineTo(x - 0.5, $jShaka(document).width());
  }
  // draw the horizontal grid lines
  for (var y = 0.5; y < $jShaka(document).height(); y += 20)
  {
    context.moveTo(0, y - 0.5);
    context.lineTo($jShaka(document).width(), y - 0.5);
  }
  context.stroke();
  
  // 
  var output;
  //  DRAW INCREMENTAL MARKERS ALONG TOP OF DOCUMENT
  context.strokeStyle = "#000";
  // set the pen fill color and font
  context.fillStyle = "#000";
  context.font = "10px Hevetica";
  for (var x = 0.5; x < $jShaka(document).width(); x += 10)
  {
    context.beginPath();
    context.moveTo(x - 0.5, 0);
    if((x -0.5) % 100 == 0)
    {
      context.lineTo(x - 0.5, 10);
      context.stroke();
      output = ''+Math.floor(x)+'';
      //  ****** IE does not provide native fillText() support,
      //  future use consider: http://code.google.com/p/canvas-text/ for alternative
      context.fillText(output, x -10, 17.5);
    }
    // normal incremental marker
    else
    {
      context.lineTo(x - 0.5, 5);
      context.stroke();
    }
  }
  //  DRAW INCREMENTAL MARKERS ALONG LEFT SIDE OF DOCUMENT
  context.strokeStyle = "#000";
  context.fillStyle = "#000";
  context.font = "10px arial";
  for (var y = 0.5; y < $jShaka(document).height(); y += 10)
  {
    context.beginPath();
    context.moveTo(0, y - 0.5);
    if((y -0.5) % 100 == 0)
    {
      context.lineTo(10, y - 0.5)
      context.stroke();
      if(y > 100)
      {
        output = ''+Math.floor(y)+'';
        context.fillText(output, 12, y+3.5);
      }
    }
    else
    {
      context.lineTo(5, y - 0.5);
      context.stroke();
    }
  }
}