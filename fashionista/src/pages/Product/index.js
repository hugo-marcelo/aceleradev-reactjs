import React, { useEffect } from "react";

import { connect, useDispatch } from "react-redux";
import { addProductToCart } from "../../store/actions/cart";
import {
  setSelectedSize,
  toggleErrorSelectedSize,
} from "../../store/actions/product";

import Header from "../../components/Header";
import SingleProduct from "../../components/SingleProduct";
import Cart from "../../components/Cart";
import Search from "../../components/Search";

import { useHistory } from "react-router-dom";

import { Container, ContainerSize } from "./styles";

function Product({ product }) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!product?.name) {
      history.push("/");
    }
  }, [history, product]);

  const addProductCart = (sizeProduct) => {
    const productToCart = {
      ...product,
      selectedSize: sizeProduct,
    };

    dispatch(addProductToCart(productToCart));
  };

  const toggleErrorSize = (hasError) => {
    dispatch(toggleErrorSelectedSize(hasError));
  };

  const addSelectedSize = (size) => {
    dispatch(setSelectedSize(size));
  };

  return (
    <Container>
      <Header />
      <ContainerSize>
        <SingleProduct
          addProductCard={addProductCart}
          toggleErrorSize={toggleErrorSize}
          addSelectedSize={addSelectedSize}
          {...product}
        />
      </ContainerSize>
      <Cart />
      <Search />
    </Container>
  );
}

const mapStateToProps = (state) => ({
  product: state.product.product,
});

export default connect(mapStateToProps)(Product);
