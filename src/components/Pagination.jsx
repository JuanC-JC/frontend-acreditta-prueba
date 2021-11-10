import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { buildPagination } from "../utils";
import * as actions from '../actions'
import {useNavigate} from 'react-router-dom'

function Pagination(props) {
  const { currentPage, pages ,paginationQuantity} = props;

  const navigate = useNavigate()

  const indexPagination = useMemo(() => {
    return buildPagination(pages,currentPage,paginationQuantity);
  }, [pages,currentPage,paginationQuantity]);

  return( 
    <div className="pagination">

      <div className="previous">{"<"}</div>


      <div className="indexes">
        {
          indexPagination.map(index=>{

            console.log(index,currentPage)
            return(
              <div 
                key={index} 
                className={`${index == currentPage ? "active" : ''}`}
                onClick={()=>{
                  navigate(`/${index}`)
                }}
                
                >{index}</div>
              )
            })
        }
      </div>
      <div className="next">{">"}</div>
    </div>);
}

const mapStateToProps = (state) => {
  return {
    filteredData: state.filteredData,
    elementsPerPage: state.elementsPerPage,
    currentPage: state.currentPage,
    pages: state.pages,
    paginationQuantity: state.paginationQuantity
  };
};

export default connect(mapStateToProps, actions)(Pagination);
