// Скрываем все карточки товара при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
  var allProductCards = document.querySelectorAll('.product-card');
  allProductCards.forEach(function (card) {
    card.style.display = 'none';
  });
});

function toggleBrand(brandId) {
  var brand = document.querySelector('.' + brandId);
  var otherBrands = document.querySelectorAll('.brand:not(.' + brandId + ')');

  // Отображаем или скрываем карточки товаров выбранного бренда
  var productCards = brand.querySelectorAll('.product-card');
  productCards.forEach(function (card) {
    card.style.display =
      card.style.display === 'none' || card.style.display === ''
        ? 'block'
        : 'none';
  });

  // Скрываем блоки остальных брендов
  otherBrands.forEach(function (otherBrand) {
    otherBrand.style.display = 'none';
  });

  // После скрытия карточек товара возвращаем все блоки брендов
  if (productCards[0].style.display === 'none') {
    otherBrands.forEach(function (otherBrand) {
      otherBrand.style.display = 'block';
    });
  }
}

function toggleDescription(descriptionId) {
  var description = document.getElementById(descriptionId);
  description.style.display =
    description.style.display === 'none' || description.style.display === ''
      ? 'block'
      : 'none';
}
// карусель
let currentIndex = 0;
const intervalTime = 5000; // Интервал в миллисекундах (5 секунд)

function changeSlide(direction) {
  const slides = document.querySelector('.slider');
  const slideWidth = document.querySelector('.slide').offsetWidth;

  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = slides.children.length - 1;
  } else if (currentIndex >= slides.children.length) {
    currentIndex = 0;
  }

  const translateValue = -currentIndex * slideWidth;
  slides.style.transform = `translateX(${translateValue}px)`;
}

function autoChangeSlide() {
  changeSlide(1); // Переключаемся на следующий слайд
}

// Устанавливаем интервал для автоматического переключения слайдов
setInterval(autoChangeSlide, intervalTime);

//

updateCartCountBadge();
// Функция для отображения корзины в модальном окне
function showCart() {
  var cartModal = document.getElementById('cart-modal');
  var cartList = document.getElementById('cart-list-modal');

  // Очищаем текущее содержимое модального окна
  cartList.innerHTML = '';

  // Получаем текущий список товаров в корзине из localStorage
  var cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Создаем элементы списка для каждого товара в корзине
  cart.forEach(function (product) {
    var listItem = document.createElement('li');
    listItem.textContent = product.name + ' - ' + product.price + ' ';

    // Добавляем кнопку удаления для каждого товара
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.className = 'cart-btn';
    deleteButton.onclick = function () {
      removeFromCart(product);
    };

    listItem.appendChild(deleteButton);
    cartList.appendChild(listItem);
    updateCartCountBadge();
  });

  // Показываем модальное окно корзины
  cartModal.style.display = 'flex'; // Меняем display на 'flex'

  // Добавляем обработчик события для закрытия модального окна при клике за его пределами
  window.onclick = function (event) {
    if (event.target == cartModal) {
      hideCartModal();
    }
  };

  // Обновляем отображение бейджа
  updateCartCountBadge();
}

// Функция для обновления отображения корзины в модальном окне
function updateCartModal() {
  var cartModal = document.getElementById('cart-modal');

  // Проверяем, отображается ли модальное окно, прежде чем обновить его содержимое
  if (cartModal.style.display === 'flex') {
    showCart();
  }
  updateCartCountBadge();
}

// Функция для скрытия модального окна корзины
function hideCartModal() {
  var cartModal = document.getElementById('cart-modal');
  cartModal.style.display = 'none';

  // Убираем обработчик события после закрытия модального окна
  window.onclick = null;
}

// Функция для обновления отображения корзины
function updateCartView() {
  var cartList = document.getElementById('cart-list');

  // Получаем текущий список товаров в корзине из localStorage
  var cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Очищаем текущее содержимое корзины
  cartList.innerHTML = '';

  // Создаем элементы списка для каждого товара в корзине
  cart.forEach(function (product) {
    var listItem = document.createElement('li');
    listItem.textContent = product.name + ' - ' + product.price;

    // Добавляем кнопку удаления для каждого товара
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = function () {
      removeFromCart(product);
    };

    listItem.appendChild(deleteButton);
    cartList.appendChild(listItem);
  });

  // Обновляем отображение бейджа
  updateCartCountBadge();
}

// Функция для обновления отображения бейджа
function updateCartCountBadge() {
  var cartCountElement = document.getElementById('cart-count-badge');
  var cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartCountElement.textContent = cart.length;
}

// Функция для добавления товара в корзину
function addToCart(productName, price) {
  var product = {
    name: productName,
    price: price,
  };

  var cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));

  // Обновляем отображение корзины в модальном окне
  updateCartModal();
}

// Функция для удаления товара из корзины
function removeFromCart(product) {
  var cart = JSON.parse(localStorage.getItem('cart')) || [];
  var index = cart.findIndex(function (item) {
    return item.name === product.name && item.price === product.price;
  });

  if (index !== -1) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Обновляем отображение корзины в модальном окне
    updateCartModal();
  }
}

// Функция для очистки корзины
function clearCart() {
  localStorage.removeItem('cart');

  // Обновляем отображение корзины в модальном окне
  updateCartModal();

  hideCartModal(); // Скрываем модальное окно корзины после очистки
}

// Функция для обновления отображения корзины в навигационной панели
function updateCartInfo() {
  updateCartView();
  updateCartCountBadge();
}

// Инициализация отображения корзины при загрузке страницы
updateCartInfo();
