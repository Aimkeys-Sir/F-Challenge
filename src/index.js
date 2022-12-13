const baseUrl="http://localhost:3000/films"
//Dom elements
const movieList=document.getElementById("films")
const poster=document.getElementById("poster")
const title=document.getElementById("title")
const runtime=document.getElementById("runtime")
const description=document.getElementById("film-info")
const showtime=document.getElementById("showtime")
const ticketNum=document.getElementById("ticket-num")
const buyButton=document.getElementById('buy-ticket')

buyButton.addEventListener('click',()=>{
    ticketNum.innerText=buyTickets(parseInt(ticketNum.innerText,10))
})

fetch(baseUrl)
.then(response => response.json())
.then(jsonData=>{
    displayMovieTitles(jsonData)
    displayMovieInfo(jsonData[0])
})

function displayMovieTitles(arrayOfMovies)
{
    arrayOfMovies.forEach((movie,i)=>{
        
        const li=document.createElement("li")
        li.className="film-item"
        li.innerText=movie.title
        li.style.cursor="cursor: pointer"
        movieList.append(li)
        if(i==0){
            li.classList.add('film-active')
        }
        li.addEventListener('click',()=>{
            displayMovieInfo(movie)
            const activeLi= document.querySelector('.film-active')
            activeLi.classList.remove('film-active')
            li.classList.add("film-active")
        })
    })
}
function displayMovieInfo(movie)
{

    poster.src=movie.image
    title.innerText=movie.title
    runtime.innerText=movie.runtime + " minutes"
    showtime.innerText=movie.showtime
    description.innerText=movie.description
    ticketNum.innerText=movie.capacity-movie.tickets_sold +" remaining tickets"
}
function buyTickets(numberOfTickets)
{
    
    numberOfTickets-=1
    if(numberOfTickets>0)
    {
        return numberOfTickets +' remaining tickets'
    }
    else
    {
        return "sold out"
    }
}
