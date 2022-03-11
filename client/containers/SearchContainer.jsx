import React, {useState} from 'react'
import SearchResultContainer from './SearchResultContainer'


function SearchBar() {
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResults] = useState([]); 

  const search = (formValue) => {
    console.log(formValue);
    let url = 
      'https://api.spotify.com/v1/search?q='
      + `${encodeURIComponent(formValue)}`
      + '&type=track&market=ES&limit=10&offset=0';
      fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'BQAf5JtcgFxjLUNg7KTyrnxgd4IxdZTbmghZXZftlAJdIPs3vAG7sxXfq8UPQBNSzaNiOjzMiSn9sw19hJEVRCLj6zpkhTxtSMRxKT4I-H6FoS6cSnefT9CmvAYOZAEf47SyTt_dj1CruhOZ4Ajg5CrwPg'
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log('Search Results: ', data);
        return data.tracks.items.map(ele => 
          ({
            name: ele.name,
            artist: ele.artists[0].name,
            albumCover: ele.album.images.filter(ele => ele.height == 64)[0].url
          }));
      })
      .then(filtered => {
        console.log(filtered);
        setSearchResults(filtered);
      })
      .catch((error) => {console.error('Error SEARCH:', error);})
  }
 
  return(
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        search(document.getElementById('search-song').value);
      }}>
        <label>Search Song</label>
        <input 
          id="search-song"
          placeholder="enter song"
        />
        <button id="search" type="submit" className="button is-primary">Search For Song</button> 
      </form>
      <div>
        <SearchResultContainer
          results={searchResults}
        />
      </div>
    </div>
  )
}



export default SearchBar

//loop through item array
//
//ele.name
//ele.artists[0].name
//let url = 
// 'https://api.spotify.com/v1/search?' 
// + 'q=' 
// + ${encodeURIComponent(songname)}
// + '&type=track&market=ES&limit=10&offset=0'
// fetch(url, {
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + 'BQBb_3CWpKFFRw-zgTdZQ26dgedSKOetYpwH9h6tCPeM6UY8duocRwty_QJfVBoEa_l6OeDSm9brkb2-cXSFnp4F5wb1JEnK4SarWQtq5HdCli2bGjaiCUpubOaUtBFwntXD2RHHK5FMCBfDFLw3zcmByg'
//     }
// });
//results.map(ele =>{
//   name: ele.name,
//   artist: ele.artists[0].name,
//   albumCover: ele.images.filter(ele => ele.height === 64)[0].url
// })
// const [searchString, setSearchString] = useState('');
//   const [searchList, setSearchList] = useState([{song: 'Hey Ya', artist: 'OutKast'}, {song: 'Dynamite', artist: 'BTS'}])
//   const [isSearching, setIsSearching] = useState(false)
  
//   async function searchSong(searchString) {
//     setIsSearching(!isSearching)
//     const result = await fetch('/search', {
//       body: new URLSearchParams({
//         searchString: searchString
//       })
//     });
//     const data = await JSON.parse(result);
//     //sync it up with our redux store and store it in searchResults property
//     //iterate through array of items and render those under search bar
//   }
  
//   const searchResults = searchList.map((element, index) => {
//     return (<SearchResult key={`result${index}`} artist={element.artist} song={element.song}/>)
//   })

//   return (
//     <div className={isSearching ? "dropdown is-active" : "dropdown"}>
//       <div className='dropdown-trigger is-flex is-full'>
//         <input type='search' className='input is-primary' placeholder='Search for your favorite songs' value={searchString} onChange={(e) => {setSearchString(e.target.value)}}></input>
//         <button onClick={() => {searchSong(searchString)}} className='button'>Search</button>
//       </div>
//       <div className='dropdown-menu'>
//         {(searchList.length !== 0) ? searchResults : null}
//       </div>
//     </div>
//   )