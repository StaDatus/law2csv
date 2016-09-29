var fs = require('fs');
var cheerio = require('cheerio');
var json2csv = require('json2csv');
var requestp = require('request-promise');
var sanitize = require("sanitize-filename");
var mkdirp = require("mkdirp");

var filename = '';

function main() {
  mkdirp('output');
  var url = process.argv[2];
  fecth(url).then(function(data) {
    parse(data, url);
  });
}

function fecth(url) {
  var filename = sanitize(url);
  var promise = requestp(url);

  promise.then(function (data) {
    fs.writeFileSync('output/' + filename + '.raw', data, 'utf8');
  });

  return promise;
}

function _debugSelection(selection) {
  selection.each(function () {
     console.log($(this).html());
  });
}

function parse(data, url) {
  var filenameUrl = sanitize(url);
  //var law_xml = fs.readFileSync(law_xml_path, 'utf8');
  $ = cheerio.load(data);

  filenameAppend = $('identificador').text() + ' - ' + $('titulo').text();
  var completeName = sanitize(filenameUrl + '-' + filenameAppend);

  var paragraphs = $('texto p');
  var paragraphsArr = paragraphs.toArray();

  var items = [];
  var articuloActual = '';
  for(var i = 0; i < paragraphsArr.length; i++) {
      var type = $(paragraphsArr[i]).attr('class');
      var content = $(paragraphsArr[i]).text();

      if(type == 'articulo') {
        articuloActual = content;
      }
      if(type.match(/parrafo*/)) {
        if(articuloActual != '') {
          items.push({
            articulo: articuloActual,
            item: content
          });
        }
      }
  }
  fs.writeFileSync('output/' + completeName + '.json', JSON.stringify(items, null, 2), 'utf8');

  var fields = ['articulo', 'item'];
  var csv = json2csv({ data: items, fields: fields });
  fs.writeFileSync('output/' + completeName + '.csv', csv, 'utf8');
}

main();
