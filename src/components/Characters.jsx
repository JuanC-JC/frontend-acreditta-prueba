import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { simulateQuery } from "../utils";
import * as actions from "../actions";
import Card from "../components/card";
import { useParams } from "react-router";
import Pagination from "./Pagination";
import { useNavigate } from "react-router";

function Characters(props) {

  const navigate = useNavigate()

  const {
    setCurrentPage,
    addData,
    filteredData,
    loading,
    setErrorData,
    error,
    setFilterData,
    pages
  } = props;

  const { page } = useParams();

  useEffect(() => {
    if (page && page <= pages) {
      setCurrentPage(page);
    }else{
      // setCurrentPage(1);
      navigate('/1')
    }
    setFilterData()

  }, [page,pages,setCurrentPage,setFilterData]);

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
    pages: state.filteredPages,
    filteredData: state.filteredData
  };
};

export default connect(mapStateToProps, actions)(Characters);
