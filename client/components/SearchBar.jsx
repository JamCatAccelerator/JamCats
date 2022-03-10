import React, {useState} from 'react'
import SearchResult from './SearchResult';


function SearchBar() {
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResults] = useState([]); 

  const search = async (formValue) => {
    // fetch('api', formValue)
    // .then(res => {
    //   setSearchResults(res)
    // })
    console.log(formValue);
  }

  
  return(
    <div>
      <form>
        <label>Search Song</label>
        <input 
          id="search-song"
          placeholder="enter song"
          onChange={(e) => search(e.target.value)}
        />
      </form>
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
//         'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
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