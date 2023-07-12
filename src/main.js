"use strict";
exports.__esModule = true;
var fs = require("fs");
fs.readFileSync('src/data.json', 'utf8');
var url = 'https://steamcommunity.com/market/search/render/?search_descriptions=0&sort_column=default&sort_dir=desc&appid=730&category_730_ItemSet%5B%5D=tag_set_nuke_2&norender=1&count=500';
fetch(url)
    .then(function (response) { return response.json(); })
    .then(function (jsonData) { return console.log(jsonData); });
//https://steamcommunity.com/market/search/render/?search_descriptions=0&sort_column=default&sort_dir=desc&appid=730&category_730_ItemSet%5B%5D=tag_set_nuke_2&norender=1&count=500
