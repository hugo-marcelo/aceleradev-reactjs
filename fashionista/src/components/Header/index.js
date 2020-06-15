import React from "react";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import { toggleCartVisible } from "../../store/actions/cart";
import { toggleSearchVisible } from "../../store/actions/search";

import {
  Container,
  Nav,
  SectionLogo,
  LinkLogo,
  Logo,
  SectionIcons,
  ButtonSearch,
  ButtonCart,
} from "./styles";

import { FiSearch, FiShoppingBag } from "react-icons/fi";

import fashionista_img from "../../assets/fashionista.png";

function Header({ count }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickLogo = () => {
    history.push("/");
  };

  const handleClickCart = () => {
    dispatch(toggleCartVisible());
  };

  const handleClickSearch = () => {
    dispatch(toggleSearchVisible());
  };

  return (
    <Container>
      <Nav>
        <SectionLogo>
          <LinkLogo onClick={handleClickLogo}>
            <Logo src={fashionista_img} alt="Fashionista" />
          </LinkLogo>
        </SectionLogo>
        <SectionIcons>
          <ButtonSearch onClick={handleClickSearch} className="button-search">
            <FiSearch size={20} />
          </ButtonSearch>
          <ButtonCart
            onClick={handleClickCart}
            className="button-cart"
            quantityItems={count}
          >
            <FiShoppingBag size={20} />
          </ButtonCart>
        </SectionIcons>
      </Nav>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  count: state.cart.count,
});

export default connect(mapStateToProps)(Header);
