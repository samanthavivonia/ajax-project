// NAVIGATION =================================================================

var $sectionItemIndex = document.querySelector('section.item-index');
var $sectionItemCreate = document.querySelector('section.item-create');
var $sectionItemDetail = document.querySelector('section.item-detail');
var $sectionOutfitIndex = document.querySelector('section.outfit-index');
var $sectionOutfitDetail = document.querySelector('section.outfit-detail');
var $sectionHistory = document.querySelector('section.history');
var $sectionAnalytics = document.querySelector('section.analytics');

function navTo(page) {
  $sectionItemIndex.classList.add('hidden');
  $sectionItemCreate.classList.add('hidden');
  $sectionItemDetail.classList.add('hidden');
  $sectionOutfitIndex.classList.add('hidden');
  $sectionOutfitDetail.classList.add('hidden');
  $sectionHistory.classList.add('hidden');
  $sectionAnalytics.classList.add('hidden');

  if (page === 'itemIndex') {
    $sectionItemIndex.classList.remove('hidden');
  } else if (page === 'itemCreate') {
    $sectionItemCreate.classList.remove('hidden');
  } else if (page === 'itemDetail') {
    $sectionItemDetail.classList.remove('hidden');
  } else if (page === 'outfitIndex') {
    $sectionOutfitIndex.classList.remove('hidden');
  } else if (page === 'outfitDetail') {
    $sectionOutfitDetail.classList.remove('hidden');
  } else if (page === 'history') {
    $sectionHistory.classList.remove('hidden');
  } else if (page === 'analytics') {
    $sectionAnalytics.classList.remove('hidden');
  }
}

var $newItemButton = document.querySelector('#new-item');
$newItemButton.addEventListener('click', function () {
  // console.log('navTo: itemCreate');
  navTo('itemCreate');
});

var $itemCreateCancelButton = document.querySelector('#item-create-cancel');
$itemCreateCancelButton.addEventListener('click', function () {
  // console.log('navTo: itemIndex');
  navTo('itemIndex');
});

// CREATE / UPDATE ITEM ================================================================

var $inputCreateItemName = document.querySelector('#create-item-name');
var $inputCreateItemType = document.querySelector('#create-item-type');
var $inputCreateItemWeather = document.querySelector('#create-item-weather-slider');
var $inputCreateItemFormality = document.querySelector('#create-item-formality-slider');
var $inputCreateItemComfort = document.querySelector('#create-item-comfort-slider');
var $inputCreateItemTonesWarm = document.querySelector('#create-item-tones-warm');
var $inputCreateItemTonesCool = document.querySelector('#create-item-tones-cool');
var $inputCreateItemTonesMuted = document.querySelector('#create-item-tones-muted');
var $inputCreateItemTonesBright = document.querySelector('#create-item-tones-bright');
var $inputCreateItemTonesGrayscale = document.querySelector('#create-item-tones-grayscale');
var $inputCreateItemPockets = document.querySelector('#create-item-haspockets-yes');

// var $submitButton = document.querySelector('#submit-button');

var newItem;

var $formCreateItem = document.querySelector('#form-create-item');
$formCreateItem.addEventListener('submit', function () {

  // console.log('Form submit function called!');

  event.preventDefault();

  // Create new item in data

  newItem = {
    name: $inputCreateItemName.value,
    type: $inputCreateItemType.value,
    weather: $inputCreateItemWeather.value,
    formality: $inputCreateItemFormality.value,
    comfort: $inputCreateItemComfort.value,
    tones: [],
    pockets: $inputCreateItemPockets.value,
    itemId: data.dataItems.nextItemId
  };

  if ($inputCreateItemTonesWarm.value === true) {
    newItem.tones.push('warm');
  }
  if ($inputCreateItemTonesCool.value === true) {
    newItem.tones.push('cool');
  }
  if ($inputCreateItemTonesMuted.value === true) {
    newItem.tones.push('muted');
  }
  if ($inputCreateItemTonesBright.value === true) {
    newItem.tones.push('bright');
  }
  if ($inputCreateItemTonesGrayscale.value === true) {
    newItem.tones.push('grayscale');
  }

  data.dataItems.items.unshift(newItem);
  data.dataItems.nextItemId++;

  // Create new dom-tree card

  var $itemCardDeck = document.querySelector('section.item-index .card-deck');

  var $itemCard = document.createElement('div');
  $itemCard.setAttribute('class', 'item-card');
  $itemCardDeck.appendChild($itemCard);

  var $itemCardCoverImg = document.createElement('div');
  $itemCardCoverImg.setAttribute('class', 'cover-img');
  $itemCard.appendChild($itemCardCoverImg);

  var $itemCardHoverButton = document.createElement('button');
  $itemCardHoverButton.setAttribute('type', 'button');
  $itemCardHoverButton.setAttribute('class', 'outline cover-img-hover');
  $itemCardCoverImg.appendChild($itemCardHoverButton);

  var $itemCardHoverButtonIcon = document.createElement('i');
  $itemCardHoverButtonIcon.setAttribute('class', 'fas fa-plus');
  $itemCardHoverButton.appendChild($itemCardHoverButtonIcon);

  var $itemCardCoverImgImg = document.createElement('img');
  $itemCardCoverImgImg.setAttribute('class', 'cover-img');
  $itemCardCoverImgImg.setAttribute('src', ('https://picsum.photos/150/150?random=' + newItem.itemId));
  $itemCardCoverImg.appendChild($itemCardCoverImgImg);

  var $itemCardTitle = document.createElement('h5');
  $itemCardTitle.textContent = newItem.name;
  $itemCard.appendChild($itemCardTitle);

  var $itemCardMetadata = document.createElement('div');
  $itemCardMetadata.setAttribute('class', 'card-metadata');
  $itemCard.appendChild($itemCardMetadata);

  var $itemCardMetadataType = document.createElement('p');
  $itemCardMetadataType.textContent = newItem.type;
  $itemCardMetadata.appendChild($itemCardMetadataType);

  // Hide Empty State

  var $itemIndexEmptyState = document.querySelector('section.item-index empty-state');
  $itemIndexEmptyState.classList.add('hidden');

  navTo('itemIndex');
});
