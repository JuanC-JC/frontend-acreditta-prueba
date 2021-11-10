import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { simulateQuery } from "../utils";
import * as actions from "../actions";
import Card from "../components/card";
import { useParams } from "react-router";

function Characters(props) {

  const {
    setCurrentPage,
    addData,
    applyFilterData,
    filteredData,
    loading,
    setErrorData
  } = props;

  const { page } = useParams();

  useEffect(() => {

    console.log('pagina',page)

    if (page) {
      setCurrentPage(page);
    }else{
      setCurrentPage(1);
    }
    applyFilterData()

  }, [page,setCurrentPage]);

  //TODO LOADING WHEN reload filter

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await simulateQuery();
        addData(data);
        applyFilterData();
      } catch (e) {
        setErrorData(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="characters">
        {loading ? (
          <h1>Loading</h1>
        ) : filteredData.length > 0 ? (
          filteredData.map((character, index) => <Card key={index} data={character} />)
        ) : (
          <div>paila</div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    characters: [...state.characters],
    loading: state.loading,
    error: state.error,
    filters: [...state.filters],
    filteredData: state.filteredData
  };
};

export default connect(mapStateToProps, actions)(Characters);
