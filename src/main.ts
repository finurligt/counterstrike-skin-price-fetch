import * as fs from 'fs';
fs.readFileSync('src/data.json','utf8');







//const collections = ["&category_730_ItemSet%5B%5D=tag_set_lake"]
//const collections = ["&category_730_ItemSet%5B%5D=tag_set_bank"]
const collections = ["&category_730_ItemSet%5B%5D=tag_set_nuke_2"]
//const collections = ["&category_730_ItemSet%5B%5D=tag_set_safehouse"]
let numbersLeft = true;
let startNr=0
let s : String = "";
collections.forEach(async coll => {
  while (numbersLeft) {
    const url = 'https://steamcommunity.com/market/search/render/?search_descriptions=0&sort_column=default&sort_dir=desc&appid=730' + coll + '&norender=1&count=500&start=' + startNr;
    
    const resp = await fetch(url)
    const jsonData = await resp.json()
    //console.log(jsonData)
    console.log(jsonData.results.length)
    jsonData.results.forEach(element => {
      //filter
      if (!element.name.includes("Souvenir")) {
        let type : String = "";
        if (element.asset_description.type.includes("Industrial")) {
          type = "Industrial"
        } else if (element.asset_description.type.includes("Mil-Spec")) {
          type = "Mil-Spec"
        } else if (element.asset_description.type.includes("Classified")) {
          type = "Classified"
        } else if (element.asset_description.type.includes("Restricted")) {
          type = "Restricted"
        } else if (element.asset_description.type.includes("Consumer")) {
          type = "Consumer"
        }
        let qual : String = "";
        if (element.name.includes("Factory New")) {
          qual = "Factory New"
        } else if (element.name.includes("Minimal Wear")) {
          qual = "Minimal Wear"
        } else if (element.name.includes("Field-Tested")) {
          qual = "Field-Tested"
        } else if (element.name.includes("Well-Worn")) {
          qual = "Well-Worn"
        } else if (element.name.includes("Battle-Scarred")) {
          qual = "Battle-Scarred"
        }

          s = s + element.name + ',' + qual + ',' + type + ',' + element.sell_price_text + "\n"
        }
      });
      
      startNr+=100;
      if (startNr>jsonData.searchdata.total_count) {
        numbersLeft = false;
      }
  }
  console.log(s)
});



//https://steamcommunity.com/market/search/render/?search_descriptions=0&sort_column=default&sort_dir=desc&appid=730&category_730_ItemSet%5B%5D=tag_set_nuke_2&norender=1&count=500