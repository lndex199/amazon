export let cart = JSON.parse(sessionStorage.getItem('cart')) || []

function saveToStorage() {
  sessionStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId, timeouts) {
  let matchingItem

  cart.forEach(cartItem => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem
    }
  })

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  )
  const quantity = Number(quantitySelector.value)

  if (matchingItem) {
    matchingItem.quantity += quantity
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    })
  }

  saveToStorage()

  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`)

  addedMessage.classList.add('added-to-cart-visible')

  const previousTimeout = timeouts[productId]

  if (previousTimeout) {
    clearTimeout(previousTimeout)
  }

  const uniqueTimeoutId = setTimeout(() => {
    addedMessage.classList.remove('added-to-cart-visible')
  }, 2000)

  timeouts[productId] = uniqueTimeoutId

  console.log(uniqueTimeoutId)
  console.log(timeouts)
}

export function removeFromCart(productId) {
  const newCart = []

  cart.forEach(cartItem => {
    if (productId !== cartItem.productId) {
      newCart.push(cartItem)
    }
  })

  cart = newCart

  saveToStorage()
}

export function calculateCartQuantity() {
  let cartQuantity = 0

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity
  })

  return cartQuantity
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem

  cart.forEach(cartItem => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem
    }
  })

  matchingItem.quantity = newQuantity

  saveToStorage()
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem

  cart.forEach(cartItem => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem
    }
  })

  matchingItem.deliveryOptionId = deliveryOptionId

  saveToStorage()
}