import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import LoginForm from './components/loginform';

const App = () => {
	const adminUser = {
		email: "admin@admin.com",
		password : "admin123"
	}
	const [user, setUser] = useState({name:"",email:""});
	const [error, setError] = useState("");

	const Login = details =>{
		console.log(details);
	}
	const Logout = () => {
		console.log("LogOut");
	}

	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=776f9ec0`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className="App">
		{(user.email !="") ?(
			<div className="welcome">
				<h2>Welcome,bro </h2>
				<button>Logout</button>
			</div>
		) : (
			<LoginForm />
		)}
		</div>
	);
};


// 	return (
// 		<div className='container-fluid movie-app'>
// 			<div className='row d-flex align-items-center mt-4 mb-4'>
// 				<MovieListHeading heading='Movies' />
// 				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
// 			</div>
// 			<div className='row'>
// 				<MovieList
// 					movies={movies}
// 					handleFavouritesClick={addFavouriteMovie}
// 					favouriteComponent={AddFavourites}
// 				/>
// 			</div>
// 			<div className='row d-flex align-items-center mt-4 mb-4'>
// 				<MovieListHeading heading='Favourites' />
// 			</div>
// 			<div className='row'>
// 				<MovieList
// 					movies={favourites}
// 					handleFavouritesClick={removeFavouriteMovie}
// 					favouriteComponent={RemoveFavourites}
// 				/>
// 			</div>
// 		</div>
// 	);
// };

export default App;
