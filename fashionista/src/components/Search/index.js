import React from "react";

import { Lottie } from "@crello/react-lottie";

import { useHistory } from "react-router-dom";

import { connect, useDispatch } from "react-redux";

import {
  toggleSearchVisible,
  setProductsFound,
  setSearchText,
} from "../../store/actions/search";

import { setProductActived } from "../../store/actions/product";

import { format } from "../../utils/formatLink";
import { searchProductsByName } from "../../utils/products";

import { v4 as uuidv4 } from "uuid";

import SearchProduct from "../SearchProduct";

import lottieSearch from "../../assets/lottie_search.json";

import {
  Container,
  SearchHeader,
  ButtonBack,
  TitleSearch,
  SearchForm,
  SearchInput,
  SearchContent,
  AreaAnimation,
} from "./styles";

import { AiOutlineClose } from "react-icons/ai";

function Search({ visible, products, productsFound, textSearch }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleHideSearch = () => {
    dispatch(toggleSearchVisible());
  };

  const handleSearchInput = (inputText) => {
    dispatch(setSearchText(inputText));

    if (!inputText) {
      dispatch(setProductsFound([]));
    }

    if (inputText.trim().length !== 0) {
      const productsFound = searchProductsByName(products, inputText);

      dispatch(setProductsFound(productsFound));
    }
  };

  const handleClickProduct = (product) => {
    dispatch(toggleSearchVisible());
    dispatch(setProductsFound([]));
    dispatch(setProductActived(product));
    history.push(`/product/${format(product.name, true)}`);
  };

  return (
    <Container active={visible}>
      <SearchHeader>
        <ButtonBack onClick={handleHideSearch} className="button-back">
          <AiOutlineClose size={20} color={"#212529"} />
        </ButtonBack>
        <TitleSearch>Buscar Produtos</TitleSearch>
      </SearchHeader>
      <SearchForm>
        <SearchInput
          placeholder="Buscar por produtos"
          type="text"
          value={textSearch}
          onChange={(e) => handleSearchInput(e.target.value)}
        />
      </SearchForm>
      <SearchContent>
        {productsFound.length === 0 && (
          <AreaAnimation>
            <Lottie
              config={{
                animationData: lottieSearch,
                loop: true,
                autoplay: true,
              }}
            />
          </AreaAnimation>
        )}

        {productsFound.map((product) => (
          <SearchProduct
            key={uuidv4()}
            {...product}
            handleClickProduct={() => handleClickProduct(product)}
          />
        ))}
      </SearchContent>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  visible: state.search.visible,
  productsFound: state.search.productsFound,
  textSearch: state.search.searchText,
  products: state.products.data,
});

export default connect(mapStateToProps)(Search);
