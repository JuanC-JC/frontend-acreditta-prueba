import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Characters from "../components/Characters";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
// import Menu from "../components/Menu";
import SideMenu from "../components/menus/SideMenu";
import '../styles/home.scss';

function Home(props) {
  const { setSortData, setPaginationQuantity } = props;

  useEffect(() => {

    const resize = () =>{
      setPaginationQuantity(window.innerWidth <= 768 ? 5 : 10)
    }

    window.addEventListener('resize',resize)

    return ()=>  window.removeEventListener('resize',resize)
  }, []);

  return (
    <div className="home">

      <Header/>
      <SideMenu/>

      <div className="hero">
        <Characters />
        <Pagination />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    characters: state.characters,
    loading: state.loading,
    error: state.error,
    filters: state.filters,
  };
};

export default connect(mapStateToProps, actions)(Home);
