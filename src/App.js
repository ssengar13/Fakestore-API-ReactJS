import { useState } from "react";
// import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cartData")));
  const [page, setPage] = useState('products');
  let productsInCart = [];
  let api_url = "https://fakestoreapi.com";
  function fetchProducts(){
    fetch(api_url + '/products').then(rsp => rsp.json()).then(data => {
      setProducts(data);
      console.log(data);
    });
  }
  function addToCart(prd){
    productsInCart.push(prd);
    console.log(productsInCart);
    localStorage.setItem("cartData", JSON.stringify(productsInCart));
  }
  if(page == 'products'){
    return (
      <>
      <button className="btn btn-primary mt-3 ml-3" style={{marginLeft:"10px"}} onClick={() => {
        fetchProducts();
      }}>Fetch Products</button><br/><br/>

      <button className="btn btn-primary ml-3" style={{marginLeft:"10px"}} onClick={() => {
        setPage('cart');
      }}>View Cart</button>
  
      <div className="p-4">
      <input type='text' placeholder='Search...' onChange={(e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
      }} className="form-control" />
      </div>
  
      <br/>
  
      Cart Items { cart.length }
        
      <div className="row m-2">
        {
          products.filter(prddata => (prddata.title.toLowerCase()).includes(search.toLowerCase()) || (prddata.description.toLowerCase()).includes(search.toLowerCase()) || (prddata.price.toString()).includes(search.toLowerCase())).map((product, index) => (<>
          <div className="col-lg-4 mt-2">
          <div className="card shadow" style={{ minHeight: "300px" }}>
            <div className="text-center p-3">
              <img alt= "#" src={product.image} className="img-fluid" style={{ height:"200px" }}  />
            </div>
            <div className="card-body">
              <h4>{ (product.title).slice(0, 50)}...</h4>
              <p>
                { (product.description).slice(0, 150) }...
              </p>
              <h4>${ product.price }</h4>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary float-end" onClick={(e) => {
                // localStorage.setItem("cartItems", );
                e.preventDefault();
                e.target.innerText = 'Added To Cart';
                e.target.className = 'btn btn-success float-end';
                setTimeout(() => {
                  e.target.innerText = 'Add To Cart';
                  e.target.className = 'btn btn-primary float-end';
                }, 1500)
                addToCart(product)
              }}>Add To Cart</button>
            </div>
          </div>
        </div>
          </>))
        }
      </div>
  
      </>
    );
  } 
  if(page == 'cart'){

    const getGrandTotal = () => {
      var cartItems = JSON.parse(localStorage.getItem("cartData"));
      var grandTotal = 0;
      for(var i=0;i < cartItems.length; i++){
        grandTotal += cartItems[i].price;
      }
      return grandTotal;
    }
    

    return(<>
      <div className="container">
        <button className="btn btn-primary" onClick={() => {
          setPage('products');
        }}>View Products</button>
      <div className="row">
      {
        cart.map((item, index) => (
          <>
            <div className="col-lg-12 mt-3">
              <div className="card">
                <div className="card-body">
                  { (item.title).slice(0, 50) }...
                  <p>
                    { item.description }
                  </p>
                  <h4>${ item.price }</h4>
                </div>
              </div>
            </div>
          </>
        ))
      }
        </div>
        <h3 className="mt-2">Grand Total: ${getGrandTotal()}</h3>
      </div>
    </>)
  }
}

export default App;
