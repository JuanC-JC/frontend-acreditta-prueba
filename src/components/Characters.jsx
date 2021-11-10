import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { simulateQuery } from "../utils";
import * as actions from "../actions";
import Card from "../components/card";
import { useParams } from "react-router";
import Pagination from "./Pagination";

function Characters(props) {

  const {
    setCurrentPage,
    addData,
    filteredData,
    loading,
    setErrorData,
    error,
    setFilterData
  } = props;

  const { page } = useParams();

  useEffect(() => {
    if (page) {
      setCurrentPage(page);
    }else{
      setCurrentPage(1);
    }
    setFilterData()

  }, [page,setCurrentPage,setFilterData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await simulateQuery();
        addData(data);
        setFilterData()
      } catch (e) {
        setErrorData(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="characters">
      {loading ? (
        <h1>Loading</h1>
      ) : filteredData.length > 0 ? (
        filteredData.map((character, index) => <Card key={index} data={character} />)
      ) : (
        <div>{error}</div>
      )}


    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    characters: [...state.characters],
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    filteredData: state.filteredData
  };
};

export default connect(mapStateToProps, actions)(Characters);
