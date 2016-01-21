
/* Creating a table
 *
 * This script shall create a table from a tab-separated value text document.
 */

/* Store the data in an array. Starts off empty.
 * This is usually NOT global, but making global here for demonstration purposes.
 */
var data = [];

var posMap = { 'M':'Midfielder', 'G':'Goalkeeper', 'D':'Defender', 'F':'Forward'};

/* Select the DIV in the document with the ID of "roster".
 * Append a <table class="table"></table> to the selected DIV.
 * The "table" class is a beautification measure via Bootstrap's CSS.
 * The resulting table element is stored in the variable "table."
 */
var table = d3.select('#roster')
  .append('table')
  .classed('table',true);

/* Append <thead><tr></tr></thead> to the above table.
 * The inner tr element is stored in the "thead" variable.
 */
var thead = table.append('thead').append('tr');

/* Append <tbody></tbody> to the table and store it in the "tbody" variable. */
var tbody = table.append('tbody');

/* Function to reload the data from the data file.
 * Call the redraw() function after the data is loaded to drive the drawing of the data.
 * We'll be filling this in during the lesson.
 */
var reload = function() {
  d3.tsv( './afcw-roster.tsv', function(d){ data = d;  redraw(); } );

};

/* Function to redraw the table.
 * It's good practice to keep the data input and drawing funcitons separate.
 * We'll be filling this in during the lesson.
 */
var redraw = function() {

  data.forEach( function(el){ el.Pos = posMap[ el.Pos ]; } );

  /*First populate the table head with keys from the data object class */
  thead.selectAll('td')
       .data( d3.map( data[0] ).keys().slice(2) )
       .enter()
       .append('td')
       .text( function(d){ return d; } );

  /*Now add a row to the table body for each element in data */
  tbody.selectAll( 'tr' )
       .data( data )
       .enter()
       .append( 'tr' )

       /*We can now populate each row with the data values that have been bound to it*/
       .selectAll( 'td' )
       .data( function(boundVal) { return d3.map( boundVal ).values().slice(2); } )
       .enter()
       .append( 'td' )
       .text( function(t) { return t; } );

};

/* Call reload() once the page and script have loaded to get the controller script started. */
reload();

