$(document).ready(() => {
	$('#searchForm').on('submit',(e)=>{
		let searchText = $('#searchText').val();
		getMovies(searchText);

		e.preventDefault();
	});
});

function getMovies(searchText){
	axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=8d06aa3a&s='+searchText)
	.then((response)=>{
		//console.log(response);
		let movies = response.data.Search;
		let output = '';
		$.each(movies,(index,movie)=>{
			output += `
				<div class="col-md-3 p-4">
					<div class="well text-center card">
						<img src="${movie.Poster}" >
						<h6 class="pt-3 pb-3 card-title">${movie.Title}</h6>
						<a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="javascript:void(0)">Movie Details</a>
					</div>
				</div>
			`;
		});
		$('#movies').html(output);
	})
	.catch((err)=>{
		console.log(err);
	})
}

function movieSelected(id){
	sessionStorage.setItem('movieID',id);
	window.location = 'movie.html';
	return false;
}

function getMovie(){
	let movieID = sessionStorage.getItem('movieID');
	axios.get('http://www.omdbapi.com/?i='+movieID+'&apikey=8d06aa3a')
	.then((response)=>{
		console.log(response.data);
		let movie = response.data;
		let output = `
			<div class="col-md-4">
				<img src="${movie.Poster}" class="rounded" alt="...">
			</div>
			<div class="col-md-8">
				<h2>${movie.Title}</h2>
				<ul class="list-group">
					<li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
					<li class="list-group-item"><strong>Country: </strong>${movie.Country}</li>
					<li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
					<li class="list-group-item"><strong>Language: </strong>${movie.Language}</li>
					<li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
					<li class="list-group-item"><strong>imdbRating: </strong>${movie.imdbRating}</li>
					<li class="list-group-item"><strong>Awards: </strong>${movie.Awards}</li>
					<li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
					<li class="list-group-item"><strong>BoxOffice: </strong>${movie.BoxOffice}</li>
					<li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
					<li class="list-group-item"><strong>Year: </strong>${movie.Year}</li>
				</ul>
			</div>
			<div class="row p-5">
				<h3>Plot</h3>
				<p>${movie.Plot}</p>
				<hr>
				<a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View iMDB</a>
				<a href="index.html" class="btn btn-default">Back To Search</a>
			</div>
		`;
		$('#movie').html(output);
	})
	.catch((err)=>{
		console.log(err);
	})

}