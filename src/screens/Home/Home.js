import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";

function Home() {
  const [productList, setProductList] = useState([]);
  const [recommendList, setRecommendList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useNavigate();
  const productURL = "http://localhost:8080/products";
  const recommendURL = "http://localhost:8080/recommendeds";

  useEffect(() => {
    getProductList();
    getRecommendedProducts();
  }, []);

  const getRecommendedProducts = () => {
    axios
      .get(recommendURL)
      .then((res) => {
        const sliceDdata = res.data.slice(0, 5);
        setRecommendList(sliceDdata);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProductList = () => {
    axios
      .get(productURL)
      .then((res) => {
        const sliceDdata = res.data.slice(0, 10);
        setProductList(sliceDdata);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchHandler = (event) => {
    let value = event.target.value;
    if (value) {
      const searchProductData = productList.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      const searchRecommendData = recommendList.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setProductList(searchProductData);
      setRecommendList(searchRecommendData);
    } else {
      getProductList();
      getRecommendedProducts();
    }
  };

  const paginate = (pageNumber) => {
    event.preventDefault();
    axios
      .get(`http://localhost:8080/products?_page=${pageNumber}&_limit=5`)
      .then((res) => {
        setCurrentPage(pageNumber);
        setProductList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const adminHandler = (e) => {
    history("/cart");
  };

  return (
    <div>
      <h1 className="header">Smart Hardware Shop</h1>
      <div>
        <img
          className="banner"
          src="https://www.expertdepot.it/img_expertdepot/ferramenta-banner.png"
        />
        <div className="searchwrapper">
          <input
            type="search"
            className="searchInput"
            placeholder="Search"
            onChange={searchHandler}
          />
          <div className="dropdown">
            <select className="options" onChange={adminHandler}>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <h3 className="sub-header">Recommended Products</h3>
        <div className="productList">
          {recommendList.map((item, index) => (
            <ProductCard list={item} key={index} />
          ))}
        </div>
        <h3 className="sub-header">Products</h3>
        <div className="productList">
          {productList.map((item, index) => (
            <ProductCard list={item} key={index} />
          ))}
        </div>
        {productList.length > 0 && <Pagination paginate={paginate} />}
      </div>
    </div>
  );
}

export default Home;
