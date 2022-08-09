import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Cart.css";

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const [total, setTotal] = useState(0);
  const [disable, setDisable] = useState(false);
  const history = useNavigate();
  const cartURL = "http://localhost:8080/carts";

  useEffect(() => {
    getCartList();
  }, []);

  useEffect(() => {
    if (cartList.length) {
      setTotal(cartList.reduce((partialSum, a) => partialSum + a.price, 0));
    }
  }, [cartList]);

  const getCartList = () => {
    axios
      .get(cartURL)
      .then((res) => {
        let filteredProduct = [];
        const sliceDdata = res.data.slice(0, 20);
        filteredProduct = sliceDdata.filter((item) => {
          if (item?.products?.length > 1) {
            let count = 0;
            if (count < 10) {
              axios
                .get(`http://localhost:8080/products/${item.id}`)
                .then((response) => {
                  filteredProduct.push({
                    id: item.id,
                    products: item.products[0],
                    name: response.data.name,
                    originalPrice:response.data.price,
                    price: Math.round(
                      response.data.price * item.products[0].quantity
                    ),
                    image: response.data.defaultImage,
                  });
                  setCartList(filteredProduct.slice(0, 3));
                });
              count = count + 1;
            }
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AddBag = (id) => {
    let newList = cartList.map((item) => {
      if(item.id == id){
        return {
          ...item,
          price: Math.round(
            item.originalPrice * (item.products.quantity + 1)
          ),
          products: {
            ...item.products,
            quantity : item.products.quantity + 1
          }
        }
      }else{
        return {
          ...item
        }
      }
    });
    console.log(newList);
    setCartList(newList);
  };

  const DecBag = (id) => {
    let newList = cartList.map((item) => {
      if(item.id == id){
        if(item.products.quantity - 1 > 0){
          return {
            ...item,
            price: Math.round(
              item.originalPrice * (item.products.quantity - 1)
            ),
            products: {
              ...item.products,
              quantity : item.products.quantity -1 
            }
          }
        }
        else{
          setDisable(true)
          return {
            ...item,
            price: 0,
            products: {
              ...item.products,
              quantity : 0
            }
          }
        }
      }else{
        return {
          ...item
        }
      }
    });
    console.log(newList);
    setCartList(newList);
  };

  const emptyHandler = () => {
    setCartList([]);
  };

  const backHandler = () => {
    history('/home');
  }

  const deleteHandler = (id) => {
    setCartList(cartList => cartList.filter((item) => item.id !== id));
  }

  return (
    <div className="cart_container">
      <h1 className="sub-header">Shopping Cart</h1>
      <div className="wrapper">
        {cartList.map((item,index) => (
          <div className="cart" key={index}>
            <img className="cart_image" src={item.image} />
            <div className="cart_card">
              <span>{item.name}</span>
              <div className="qty_btn">
                <i disabled={disable} onClick={()=>DecBag(item.id)} className="fa fa-minus"></i>
                <p>{item.products.quantity}</p>
                <i onClick={()=>AddBag(item.id)} className="fa fa-plus"></i>
              </div>
            </div>
            <span>{item.price}</span>
            <span>
              <i className="fa fa-trash-o deleteIcon" onClick={() => deleteHandler(item.id)}></i>
            </span>
          </div>
        ))}
      </div>
      {cartList.length > 0 ? (
        <div className="cardfooter">
          <button className="empty_cart" onClick={emptyHandler}>
            Empty
          </button>
          <span>Total: {total}</span>
        </div>
      ): <div><span>No Items Found</span><button className="cardfooter go_back" onClick={backHandler}>Go Back</button></div>}
    </div>
  );
};

export default Cart;
