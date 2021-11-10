import React, { useMemo } from "react";
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

      <div 
        className="previous pagination__button"
        onClick={()=>{
          if(currentPage > 1){
            navigate(`/${currentPage-1}`)
          }
        }}
      >{"<"}</div>

      <div className="indexes">
        {
          indexPagination.map(index=>{
            return(
              <div 
                key={index} 
                className={`${index === currentPage ? "active" : ''}`}
                onClick={()=>{
                  navigate(`/${index}`)
                }}
                
                >{index}</div>
              )
            })
        }
      </div>

      <div 
        className="next pagination__button"
        onClick={()=>{
          if(currentPage < pages){
            navigate(`/${currentPage+1}`)
          }
        }}
        >{">"}</div>
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
