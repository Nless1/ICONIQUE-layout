(function () {

document.addEventListener('DOMContentLoaded', () => {
  let lastScrollTop = 0;

  // Основная функция для отслеживания прокрутки
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const body = document.body;

    // Обработка прокрутки вниз и вверх
    if (currentScroll > lastScrollTop) {
      if (currentScroll < 20) return;
      header.classList.add('scroll');
      if (currentScroll >= 20) {
        header.style.transition = '.3s';
        header.style.background = '#010915';
      }
    } else {
      header.classList.remove('scroll');
      if (currentScroll < 20) {
        header.style.transition = '.3s';
        header.style.background = 'transparent';
      }
    }

    // Обработка нажатий на бургер-меню
    const burgerBtn = document.querySelector('.burger');
    const overlay = document.querySelector('.overlay');

    body.addEventListener('click', (e) => headerLimpid(e, header, burgerBtn, overlay));

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  // Функция для изменения прозрачности хедера
  let headerIsLimpid = false;

  function headerLimpid(e, header, burgerBtn, overlay) {
    if (e.target !== burgerBtn && e.target !== overlay) return;
    if (window.pageYOffset <= 20) return;

    if (headerIsLimpid) {
      header.style.transition = '0.4s';
      header.style.background = '#010915';
      headerIsLimpid = false;
    } else {
      header.style.transition = '0.4s';
      header.style.background = 'transparent';
      headerIsLimpid = true;
    }
  }
});

    // Бургер

    document.addEventListener('click', burgerInit)

    function burgerInit(e) {

        const burgerIcon = e.target.closest('.burger-icon')
        const burgerNavLink = e.target.closest('.nav__link')

        if (!burgerIcon && !burgerNavLink) return
        if (document.documentElement.clientWidth > 900) return

        if (!document.body.classList.contains('body--opened-menu')) {
            document.body.classList.add('body--opened-menu')
        } else {
            document.body.classList.remove('body--opened-menu')
        }

    }

    // Выпадающее меню

    document.querySelectorAll('.dropdown').forEach(item => {
      item.addEventListener('click', event => {
        const dropdownMenu = item.querySelector('.dropdown-menu');
        if (dropdownMenu) {
          event.preventDefault();
          dropdownMenu.classList.toggle('visible');
        }
      });
    });
    
    document.addEventListener('click', event => {
      if (!event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu.visible').forEach(menu => {
          menu.classList.remove('visible');
        });
      }
    });

    var listItemContainer = document.getElementsByClassName("carousel")[0];
var listItems = document.getElementsByClassName("carousel-item");
var itemInfoContainer = document.getElementById("item-info-container");

const itemHeight = 106;

for (var i = 0; i < listItems.length; i++) {
  listItems[i].style.top = (i * itemHeight).toString() + "px";
}

var active = document.getElementsByClassName("active")[0];
var activeIndex = 2;
var canScroll = true;

// Prevent page scroll when hovering over the carousel
listItemContainer.addEventListener('wheel', function(event) {
  event.preventDefault(); // Stop page scroll
  if (canScroll == true) {
    if (event.deltaY > 0) { // Scroll down
      scrollDown();
    } else if (event.deltaY < 0) { // Scroll up
      scrollUp();
    }
  }
}, { passive: false }); // Ensure preventDefault works

function scrollUp() {
  canScroll = false;

  if (activeIndex == 2) {
    listItems[listItems.length - 1].style.top = 
      ((listItems[listItems.length - 1]).offsetTop - (itemHeight * listItems.length)).toString() + "px";
    listItemContainer.prepend(listItems[listItems.length - 1]);
  } else {
    activeIndex -= 1;
  }

  for (var i = 0; i < listItems.length; i++) {
    listItems[i].style.animation = "scroll-down 0.1s forwards"; // Correct animation for scrolling up
    adjustScroll(listItems[i], false);
  }

  active.classList.remove("active");
  active = active.previousElementSibling;
  active.classList.add("active");

  displayInfo(active);
}

function scrollDown() {
  canScroll = false;

  if (activeIndex == (listItems.length - 3)) {
    listItems[0].style.top = 
      ((listItems[0]).offsetTop + (itemHeight * listItems.length)).toString() + "px";
    listItemContainer.append(listItems[0]);
  } else {
    activeIndex += 1;
  }

  for (var i = 0; i < listItems.length; i++) {
    listItems[i].style.animation = "scroll-up 0.1s forwards"; // Correct animation for scrolling down
    adjustScroll(listItems[i], true);
  }

  active.classList.remove("active");
  active = active.nextElementSibling;
  active.classList.add("active");

  displayInfo(active);
}

function adjustScroll(item, direction) {
  setTimeout(function() {
    if (direction == true) {
      item.style.top = (item.offsetTop - itemHeight).toString() + "px";
    } else {
      item.style.top = (item.offsetTop + itemHeight).toString() + "px";
    }

    item.style.animation = "none";

    canScroll = true;
  }, 100);
}

function scrollUpButton() {
  if (canScroll == true) {
    scrollUp();
  }
}

function scrollDownButton() {
  if (canScroll == true) {
    scrollDown();
  }
}

function displayInfo(item) {
  itemInfoContainer.innerHTML = item.getElementsByClassName("item-info")[0].textContent;
}

  
})()
