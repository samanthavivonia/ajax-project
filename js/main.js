var i;

// NAVIGATION =================================================================

var $sectionItemIndex = document.querySelector('section.item-index');
var $sectionItemCreate = document.querySelector('section.item-create');
var $sectionItemDetail = document.querySelector('section.item-detail');
var $sectionOutfitIndex = document.querySelector('section.outfit-index');
var $sectionOutfitDetail = document.querySelector('section.outfit-detail');
var $sectionHistory = document.querySelector('section.history');
var $sectionAnalytics = document.querySelector('section.analytics');

var $itemCardDeck = document.querySelector('section.item-index .card-deck');

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
  $formCreateItem.reset();
  navTo('itemIndex');
});

// CREATE / UPDATE ITEM ================================================================

var $inputCreateItemName = document.querySelector('#create-item-name');
var $inputCreateItemImgURL = document.querySelector('#create-item-img-url');
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

var $itemCreatePreviewImg = document.querySelector('section.item-create img');
$inputCreateItemImgURL.addEventListener('input', function () {
  $itemCreatePreviewImg.setAttribute('src', $inputCreateItemImgURL.value);
});

var newItem;

var $formCreateItem = document.querySelector('#form-create-item');
$formCreateItem.addEventListener('submit', function () {

  // console.log('Form submit function called!');

  event.preventDefault();

  // Create new item in data

  newItem = {
    name: $inputCreateItemName.value,
    imgURL: $inputCreateItemImgURL.value,
    type: $inputCreateItemType.value,
    weather: $inputCreateItemWeather.value,
    formality: $inputCreateItemFormality.value,
    comfort: $inputCreateItemComfort.value,
    tones: [],
    pockets: 'no',
    itemId: data.dataItems.nextItemId
  };

  if ($inputCreateItemWeather.hasAttribute('disabled')) {
    newItem.weather = null;
  }

  if ($inputCreateItemFormality.hasAttribute('disabled')) {
    newItem.weather = null;
  }

  if ($inputCreateItemComfort.hasAttribute('disabled')) {
    newItem.comfort = null;
  }

  if ($inputCreateItemTonesWarm.checked === true) {
    newItem.tones.push('warm');
  }
  if ($inputCreateItemTonesCool.checked === true) {
    newItem.tones.push('cool');
  }
  if ($inputCreateItemTonesMuted.checked === true) {
    newItem.tones.push('muted');
  }
  if ($inputCreateItemTonesBright.checked === true) {
    newItem.tones.push('bright');
  }
  if ($inputCreateItemTonesGrayscale.checked === true) {
    newItem.tones.push('grayscale');
  }

  if ($inputCreateItemPockets.checked === true) {
    newItem.pockets = 'yes';
  } else {
    newItem.pockets = 'no';
  }

  data.dataItems.items.unshift(newItem);
  data.dataItems.nextItemId++;

  $itemCardDeck.innerHTML = '';
  for (i = 0; i < data.dataItems.items.length; i++) {
    $itemCardDeck.appendChild(renderNewItem(data.dataItems.items[i]));
  }
  $formCreateItem.reset();
  navTo('itemIndex');
});

function renderNewItem(item) {
  var $itemCard = document.createElement('div');
  $itemCard.setAttribute('class', 'item-card');

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

  var $itemCardCoverImgContainer = document.createElement('div');
  $itemCardCoverImgContainer.setAttribute('class', 'cover-img-container');
  $itemCardCoverImg.appendChild($itemCardCoverImgContainer);

  var $itemCardCoverImgImg = document.createElement('img');
  $itemCardCoverImgImg.setAttribute('class', 'cover-img');
  $itemCardCoverImgImg.setAttribute('src', item.imgURL);
  $itemCardCoverImgContainer.appendChild($itemCardCoverImgImg);

  var $itemCardTitle = document.createElement('h5');
  $itemCardTitle.textContent = item.name;
  $itemCard.appendChild($itemCardTitle);

  var $itemCardMetadata = document.createElement('div');
  $itemCardMetadata.setAttribute('class', 'card-metadata');
  $itemCard.appendChild($itemCardMetadata);

  var $itemCardMetadataType = document.createElement('p');
  $itemCardMetadataType.textContent = _.capitalize(item.type);
  $itemCardMetadata.appendChild($itemCardMetadataType);

  if (item.tones.includes('warm')) {
    var $itemCardMetadataTonesWarm = document.createElement('p');
    $itemCardMetadataTonesWarm.textContent = 'Warm';
    $itemCardMetadata.appendChild($itemCardMetadataTonesWarm);
  }

  if (item.tones.includes('cool')) {
    var $itemCardMetadataTonesCool = document.createElement('p');
    $itemCardMetadataTonesCool.textContent = 'Cool';
    $itemCardMetadata.appendChild($itemCardMetadataTonesCool);
  }

  if (item.tones.includes('muted')) {
    var $itemCardMetadataTonesMuted = document.createElement('p');
    $itemCardMetadataTonesMuted.textContent = 'Muted';
    $itemCardMetadata.appendChild($itemCardMetadataTonesMuted);
  }

  if (item.tones.includes('bright')) {
    var $itemCardMetadataTonesBright = document.createElement('p');
    $itemCardMetadataTonesBright.textContent = 'Bright';
    $itemCardMetadata.appendChild($itemCardMetadataTonesBright);
  }

  if (item.tones.includes('grayscale')) {
    var $itemCardMetadataTonesGrayscale = document.createElement('p');
    $itemCardMetadataTonesGrayscale.textContent = 'Grayscale';
    $itemCardMetadata.appendChild($itemCardMetadataTonesGrayscale);
  }

  if (item.pockets === 'yes') {
    var $itemCardMetadataPockets = document.createElement('p');
    $itemCardMetadataPockets.textContent = 'Pockets';
    $itemCardMetadata.appendChild($itemCardMetadataPockets);
  }

  return $itemCard;
}

window.addEventListener('DOMContentLoaded', function () {
  for (i = 0; i < data.dataItems.items.length; i++) {
    $itemCardDeck.appendChild(renderNewItem(data.dataItems.items[i]));
  }
  var $itemIndexEmptyState = document.querySelector('section.item-index .empty-state');
  if (data.dataItems.items.length > 0) {
    $itemIndexEmptyState.classList.add('hidden');
  } else if (data.dataItems.items.length === 0) {
    $itemIndexEmptyState.classList.remove('hidden');
  }
});

// ENABLE DISABLE CHECK MARK SLIDERS ==================================================================

var $checkboxCreateItemWeather = document.querySelector('#create-item-weather-checkbox');
$checkboxCreateItemWeather.addEventListener('input', function () {
  if ($checkboxCreateItemWeather.checked === true) {
    $inputCreateItemWeather.removeAttribute('disabled');
  } if ($checkboxCreateItemWeather.checked === false) {
    $inputCreateItemWeather.setAttribute('disabled', '');
  }
});

var $checkboxCreateItemFormality = document.querySelector('#create-item-formality-checkbox');
$checkboxCreateItemFormality.addEventListener('input', function () {
  if ($checkboxCreateItemFormality.checked === true) {
    $inputCreateItemFormality.removeAttribute('disabled');
  } if ($checkboxCreateItemFormality.checked === false) {
    $inputCreateItemFormality.setAttribute('disabled', '');
  }
});

var $checkboxCreateItemComfort = document.querySelector('#create-item-comfort-checkbox');
$checkboxCreateItemComfort.addEventListener('input', function () {
  if ($checkboxCreateItemComfort.checked === true) {
    $inputCreateItemComfort.removeAttribute('disabled');
  } if ($checkboxCreateItemComfort.checked === false) {
    $inputCreateItemComfort.setAttribute('disabled', '');
  }
});

var $checkboxFilterItemsWeather = document.querySelector('#filter-items-weather-checkbox');
var $sliderFilterItemsWeather = document.querySelector('#filter-items-weather-slider');
$checkboxFilterItemsWeather.addEventListener('input', function () {
  if ($checkboxFilterItemsWeather.checked === true) {
    $sliderFilterItemsWeather.removeAttribute('disabled');
  } if ($checkboxFilterItemsWeather.checked === false) {
    $sliderFilterItemsWeather.setAttribute('disabled', '');
  }
});

var $checkboxFilterItemsFormality = document.querySelector('#filter-items-formality-checkbox');
var $sliderFilterItemsFormality = document.querySelector('#filter-items-formality-slider');
$checkboxFilterItemsFormality.addEventListener('input', function () {
  if ($checkboxFilterItemsFormality.checked === true) {
    $sliderFilterItemsFormality.removeAttribute('disabled');
  } if ($checkboxFilterItemsFormality.checked === false) {
    $sliderFilterItemsFormality.setAttribute('disabled', '');
  }
});

var $checkboxFilterItemsComfort = document.querySelector('#filter-items-comfort-checkbox');
var $sliderFilterItemsComfort = document.querySelector('#filter-items-comfort-slider');
$checkboxFilterItemsComfort.addEventListener('input', function () {
  if ($checkboxFilterItemsComfort.checked === true) {
    $sliderFilterItemsComfort.removeAttribute('disabled');
  } if ($checkboxFilterItemsComfort.checked === false) {
    $sliderFilterItemsComfort.setAttribute('disabled', '');
  }
});
