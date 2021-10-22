// NAVIGATION =================================================================

var $sectionItemIndex = document.querySelector('section.item-index');
var $sectionItemCreate = document.querySelector('section.item-create');
var $sectionItemDetail = document.querySelector('section.item-detail');
var $sectionOutfitIndex = document.querySelector('section.outfit-index');
var $sectionOutfitDetail = document.querySelector('section.outfit-detail');
var $sectionHistory = document.querySelector('section.history');
var $sectionAnalytics = document.querySelector('section.analytics');

function navTo(page) {
  $sectionItemIndex.classList.add('.hidden');
  $sectionItemCreate.classList.add('.hidden');
  $sectionItemDetail.classList.add('.hidden');
  $sectionOutfitIndex.classList.add('.hidden');
  $sectionOutfitDetail.classList.add('.hidden');
  $sectionHistory.classList.add('.hidden');
  $sectionAnalytics.classList.add('.hidden');

  if (page === 'itemIndex') {
    $sectionItemIndex.classList.remove('.hidden');
  } else if (page === 'itemCreate') {
    $sectionItemCreate.classList.remove('.hidden');
  } else if (page === 'itemDetail') {
    $sectionItemDetail.classList.remove('.hidden');
  } else if (page === 'outfitIndex') {
    $sectionOutfitIndex.classList.remove('.hidden');
  } else if (page === 'outfitDetail') {
    $sectionOutfitDetail.classList.remove('.hidden');
  } else if (page === 'history') {
    $sectionHistory.classList.remove('.hidden');
  } else if (page === 'analytics') {
    $sectionAnalytics.classList.remove('.hidden');
  }
}

var $newItemButton = document.querySelector('#new-item');
$newItemButton.addEventListener('click', navTo('itemCreate'));
