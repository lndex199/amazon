class Cart {
  cartItems
  #sessionStorageKey

  constructor(sessionStorageKey) {
    this.#sessionStorageKey = sessionStorageKey
    this.#loadFromStorage()
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(sessionStorage.getItem(this.#sessionStorageKey)) || [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }
    ]
  }

  saveToStorage() {
    sessionStorage.setItem(this.#sessionStorageKey, JSON.stringify(this.cartItems))
  }

  addToCart(productId) {
    let matchingItem

    this.cartItems.forEach(cartItem => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem
      }
    })

    const quantitySelector = document.querySelector(
      `js-quantity-selector-${productId}`
    )
    const quantity = Number(quantitySelector.value)

    if (matchingItem) {
      matchingItem.quantity += quantity
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      })
    }

    this.saveToStorage()

    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`)
  }

  removeFromCart(productId) {
    const newCart = []

    this.cartItems.forEach(cartItem => {
      if (productId !== cartItem.productId) {
        newCart.push(cartItem)
      }
    })

    this.cartItems = newCart

    this.saveToStorage()
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem

    this.cartItems.forEach(cartItem => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem
      }
    })

    matchingItem.deliveryOptionId = deliveryOptionId

    this.saveToStorage()
  }

}

const cart = new Cart('cart-class')
const businessCart = new Cart('cart-business')