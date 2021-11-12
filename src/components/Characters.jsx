import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Card from "../components/card";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

import '../styles/characters.scss'

function Characters(props) {

  const navigate = useNavigate()

  const {
    setCurrentPage,
    addData,
    filteredData,
    loading,
    setErrorData,
    error,
    applyFilterData,
    characters,
    pages
  } = props;

  const { page } = useParams();

  useEffect(() => {
    if (page && page <= pages) {
      setCurrentPage(page);
    }else{
      navigate('/1')
    }
    applyFilterData()

  }, [navigate,page,pages,setCurrentPage,applyFilterData]);

  useEffect(() => {

    const fetchData = async () => {
      try {

        if(characters.length === 0){
          const res = await fetch('https://shrouded-tor-30746.herokuapp.com/characters')
          const data = await res.json()

          window.sessionStorage.setItem('charactersData',JSON.stringify(data))

          addData(data);
          applyFilterData()
        }else{
          addData(characters);
          applyFilterData()
        }
        
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
        filteredData.map((character, index) => <Card key={`${character.name}__${index}`} data={character} />)
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
