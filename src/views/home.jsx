import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import "../styles/app.scss";
import Characters from "../components/Characters";
import { useParams } from "react-router";
import Pagination from "../components/Pagination";

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
      <Characters />
      <button
        onClick={() => {
          console.log("click");
          setSortData();
        }}
      >
        Filter
      </button>

      <Pagination />
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
