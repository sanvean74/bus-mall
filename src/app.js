import store from '../src/data/store.js';
import ProductSet from './product-set.js';

const productButton = document.querySelectorAll('.product-button');
console.log(productButton);

const products = store.getProducts();
const masterProductSet = new ProductSet(products);
let selectedProduct;
let productToDisplay;
let displayedProducts = {};

function tally(products, id) {
    if(products[id]) {
        products[id] += 1;
    }
    else {
        products[id] = 1;
    }
}

function renderProducts() {
    let productSet = masterProductSet;
    
    if(selectedProduct && masterProductSet.list.length > 3) {
        productSet = new ProductSet(masterProductSet.list);
        productSet.removeById(selectedProduct.id);
    }
    
    productToDisplay = [];

    // generate 3 random product imgs to display
    for(let i = 0; i < 3; i++) {
        // eslint-disable-next-line no-console
        console.log([i]); // only gets first item in array :(
        let renderProduct = productSet.getRandomProduct();
        console.log(productToDisplay); // only gets index[0] of array
        productToDisplay.push(renderProduct);
        tally(displayedProducts, renderProduct.id);
        productSet.removeById(renderProduct.id);
    
        // displaying image
        let img = productButton[i].querySelector('img'); // will return a single random image if remove [i]
        img.src = renderProduct.image;
    }
}
renderProducts();
