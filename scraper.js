var cheerio = require('cheerio');
var _ = require('lodash');
var fs = require('fs');
var request = require('request');

const URL = 'https://octodex.github.com/';

var parseImage = function (image) {
    console.log(`${image.attribs.alt}: ${image.attribs['data-src']}`);

    return {
        name: image.attribs.alt,
        url: `https://octodex.github.com/${image.attribs['data-src']}`
    };
};

request(URL, function (error, response, body) {
    var $ = cheerio.load(body);
    var images = $('a.preview-image img');

    var octocats = _.map(images, parseImage);
    fs.writeFile('./api/octodex.json', JSON.stringify(octocats));
});