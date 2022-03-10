import React from 'react';
import ResultCard from '../components/ResultCard'
 

const SearchResultContainer = props =>{
    const resultCards = []
    for(let i = 0; i < props.results.length; i++){
      resultCards.push(<ResultCard key={`ResultCard${i}`} id={`ResultCard${i}`} song={props.results[i]}/>)
    }
    return(
      <div>
        <span>
            {resultCards}
        </span>
      </div>
    )

}
export default SearchResultContainer