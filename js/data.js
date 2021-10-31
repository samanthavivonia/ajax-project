/* exported data */

/* eslint-disable */

var data = {
  dataItems: {
    items: [],
    editing: null,
    nextItemId: 1
  },
  dataOutfits: {
    outfits: [],
    editing: null,
    nextOutfitId: 1
  }
}

var itemsJSON = localStorage.getItem('wardrobe-planner-data-local-storage');

if (itemsJSON !== null) {
  data = JSON.parse(itemsJSON);
}

window.addEventListener('beforeunload', function () {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('wardrobe-planner-data-local-storage', dataJSON);
});
