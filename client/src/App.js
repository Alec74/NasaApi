import logo from './logo.svg';
import React, { useReducer, useEffect } from "react";
import Search from "./components/Search";
import Header from "./components/Header";
import NasaImg from "./components/NasaImg"
import './App.css';

const apiKey = 'ihKvhJM6OOovOrZzVhz4r8IAu2PG6KAavZjp06Lh';


const NASA_SEARCH = `https://images-api.nasa.gov/search?q=galaxy&media_type=image`


const initialState = {
  loading: true,
  nasa: [],
  errorMessage: null,
  num: 0
};


const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_NASA_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        num: +1
      };
    case "SEARCH_NASA_SUCCESS":
      return {
        ...state,
        loading: false,
        nasa: action.payload
      };
    case "SEARCH_NASA_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};


function App() {


  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {

    fetch(NASA_SEARCH)
      .then(response => response.json())
      .then(jsonResponse => {

        dispatch({
          type: "SEARCH_NASA_SUCCESS",
          payload: jsonResponse.collection.items
        });
      });
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_NASA_REQUEST"
    });

    fetch(`https://images-api.nasa.gov/search?q=${searchValue}&media_type=image`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse) {
          dispatch({
            type: "SEARCH_NASA_SUCCESS",
            payload: jsonResponse.collection.items
          });
        } else {
          dispatch({
            type: "SEARCH_NASA_FAILURE",
            error: jsonResponse.Error
          });
        }
      });

  };


  const { nasa, errorMessage, loading, num } = state;

  // console.log(state)

  return (
    <div className="App">
      <Header text="Image Search" />
      <br></br>
      <Search search={search}></Search>
      {num > 0 ? (
        <p className="App-intro">Displaying Search Results:</p>
      ) : (<p className="App-intro">Welcome to a NASA Image Search App! Click an image to open a it in a new tab.</p>)
      }
      <br></br>
      <div className="nasa">
      <div className="columns is-mobile is-multiline is-centered">
          {/* <span>{console.log(search)}</span> */}
          
          {loading && !errorMessage ? (
            <span>loading... </span>
          ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
          ) : (
            nasa.map((nasaI, index) => (
              <NasaImg key={`${index}-${nasaI.data[0].title}`} nasa={nasaI} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
