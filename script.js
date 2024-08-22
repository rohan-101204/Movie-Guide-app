const searchform=document.querySelector('.form');
const moviecontainer=document.querySelector('.movie-container');
const inputBox=document.getElementsByClassName('input-box');
const btn=document.getElementById('btn')


//Function to fetch movie datails using OMDB API
const getMovieInfo = async (movie)=>{
 try{
    const myapikey="4d548164";
    const url=`http://www.omdbapi.com/?apikey=${myapikey}&t=${movie}`;
  
    const response= await fetch(url);
    if(!response.ok){
      throw new Error("unable to fetch movie data");
    }
    const data = await response.json();
     console.log( data);
     
     showMovieData(data);
 }
 catch(error){
    showerrormsg("No Movie Found !!!")
}
}

//function to show movie data on screen
const showMovieData = (data) => {
    moviecontainer.innerHTML="";
    moviecontainer.classList.remove('noback');
    const {Title,imdbRating,Genre, Released ,Runtime, Actors,Plot,Poster} = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML= `<h2>${Title}</h2>
    <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;


    const movieGenreElement = document.createElement('div');
   movieGenreElement.classList.add('movie-genre');

   Genre.split(",").forEach(element =>{
    const p= document.createElement('p');
    p.innerText=element;
    movieGenreElement.appendChild(p);
   });
    movieElement.appendChild(movieGenreElement);
    movieElement.innerHTML += `<p><strong>Released Date:</strong>${Released}</p>
                            <p><strong>Duration:</strong>${Runtime}</p>
                            <p><strong>Cast:</strong>${Actors}</p>
                            <p><strong>Plot:</strong>${Plot}</p>`;


const movieposter=document.createElement('div');
movieposter.classList.add('movie-poster');
movieposter.innerHTML=`<img src="${Poster}"/>`;

moviecontainer.appendChild(movieposter);
moviecontainer.appendChild(movieElement);
   
}



//function to display error message

const showerrormsg=(message)=>{
moviecontainer.innerHTML=`<h2>${message}</h2>`;
moviecontainer.classList.add('noback');
}



//adding event listener to search form

const inputBoxes=document.getElementsByClassName('input-box');

searchform.addEventListener('submit', (e) => {
    e.preventDefault();
    Array.prototype.forEach.call(inputBoxes, (inputBox) => {
        const movieName=inputBox.value.trim();
        if(movieName !==''){
            showerrormsg("Fetching data.......")
            getMovieInfo(movieName);
        }
        else{
            showerrormsg("Enter movie name to get movie information");
        }
    });
});

