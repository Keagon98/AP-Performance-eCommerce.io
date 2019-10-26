// The shopping cart
let cart = [];
    
// Returns an array of products
const getProducts = () => {
  return [...products];
};

// Checks for a product with 'id' and returns it
const getProductById = id => {
  id = +id || null;
  return (id) ? products.filter(item => item.id === id)[0] : null;
};

// Returns the shopping cart (array of product id's)
const getCart = () => {
  return [...cart];
};

// Used to add or remove an item from the shopping cart
const modifyCart = (method, id) => {
  // Adding an item
  if(method === 'add') {
    // Check the the item they want to add is actually a shop item
    if(cart.indexOf(id) === -1) {
      // Push the item into the shopping cart
      cart.push(id);
      
      // Update the localStorage with the new cart
      localStorage.setItem('cart', JSON.stringify({items: getCart()}));
      
      // Emit an event to let everyone know the cart was updated
      Events.emit('cartupdated', getCart());
      
      return true;
    }
    
  // Removing an item
  } else if(method === 'remove') {
    // Check if the item they want to add is actually a shop item
    if(cart.indexOf(id) !== -1) {
      // Remove the item from the cart
      cart.splice(cart.indexOf(id), 1);
      
      // Update the localStorage with the new cart
      localStorage.setItem('cart', JSON.stringify({items: getCart()}));
      
      // Emit an event to let everyone know the cart was updated
      Events.emit('cartupdated', getCart());
      
      return true;
    }
  }
  
  return false;
};

// Initializes the shopping cart
const initCart = () => {
  // Check if localStorage is available
  if('localStorage' in window) {
    // Get the cart stored in localStorage
    let storedCart = JSON.parse(localStorage.getItem('cart'));
    
    // Did we find an existing cart?
    if(storedCart) {
      // Cool, set the stored cart equal to our app cart
      cart = storedCart.items;
    } else {
      // Otherwise, create a new localStorage item for our cart
      localStorage.setItem('cart', JSON.stringify({items: getCart()}));
    }
  }
  
  // Tell everyone we've updated the cart
  Events.emit('cartupdated', getCart());
};

return {
  getCart,
  modifyCart,
  initCart,
  getProducts,
  getProductById
};


















