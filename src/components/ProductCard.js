import React, {useEffect, useState} from "react";
import "./ProductCard.css";
import { useNavigate } from 'react-router-dom';

const ProductCard = ({list}) => {
  const [addbag, setaddbag] = useState(1);
  const [heart, setheart] = useState(1);
  const history = useNavigate();

  const AddBag = () => {
    if (addbag < 10) {
      setaddbag(addbag + 1);
    }
  };

  const DecBag = () => {
    if (addbag >= 1) {
      setaddbag(addbag - 1);
    }
  };

  const Heart = () => {
    if (heart) {
      setheart(0);
    } else {
      setheart(1);
    }
  };

  const cartHandler = () => {
    history('/cart');
  }

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="top_part">
            <small>
              <i
                onClick={Heart}
                className={`fa ${heart ? "fa-heart-o" : "fa-heart"}`}
              ></i>
            </small>
          </div>
          <div className="image">
            <img src={list.defaultImage} />
          </div>
          <div className="vitamin">
            <h3>{list.name}</h3>
            <div className="rating">
              <input type="radio" name="rating" value="5" id="5" />
              <label htmlFor="5">☆</label>
              <input type="radio" name="rating" value="4" id="4" />
              <label htmlFor="4">☆</label>
              <input type="radio" name="rating" value="3" id="3" />
              <label htmlFor="3">☆</label>
              <input type="radio" name="rating" value="2" id="2" />
              <label htmlFor="2">☆</label>
              <input type="radio" name="rating" value="1" id="1" />
              <label htmlFor="1">☆</label>
            </div>
          </div>
          <div className="reviews">
            <p className="description">{list.description}</p>
            <h3 className="price">€ {list.price}</h3>
          </div>
          <div className="last_buttons">
            <div className="qty_btn">
              <i onClick={DecBag} className="fa fa-minus"></i>
              <p>{addbag}</p>
              <i onClick={AddBag} className="fa fa-plus"></i>
            </div>
            <div className="money_bag">
              <button onClick={cartHandler}>
                <i className="fa fa-shopping-bag"></i>Add to bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
