/*
 * jqBookmark - a jquery Bookmark script
 *
 * LICENSE
 *
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file license.txt.
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to calisza@gmail.com so we can send you a copy immediately.
 *
 */
$(document).ready(function(){
  // add a "rel" attrib if Opera 7+
  if(window.opera) {
    if ($("a.jqbookmark").attr("rel") != ""){
      $("a.jqbookmark").attr("rel","sidebar");
    } 
  }

  $("a.jqbookmark").click(function(event){
    event.preventDefault();
    var url = this.href;
    var title = this.title;

    if (window.sidebar) { // Mozilla Firefox Bookmark
      window.sidebar.addPanel(title, url,"");
    } else if( window.external ) { // IE Favorite
      window.external.AddFavorite( url, title);
    } else if(window.opera) { // Opera 7+
      return false; // do nothing
    } else { 
      alert('Unfortunately, this browser does not support the requested action,'
        + ' please bookmark this page manually.');
    }
  });
});