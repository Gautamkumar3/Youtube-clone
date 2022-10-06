// let api_key="AIzaSyC9yllP8MG6FVoyZfXCuig2I-0UuVxTKbw"
let api_key = "AIzaSyChICCSyHlIjNOozxltHcxDWVYqxHd5X6k"

let trending_url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=48&q=trending&key=AIzaSyChICCSyHlIjNOozxltHcxDWVYqxHd5X6k"

let id;

let getData = async (query) => {



    try {
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&key=${api_key}`

        let res = await fetch(url);

        let data = await res.json()

        return data.items

    } catch (err) {
        console.log(err)
    }

}


let append = (data) => {
    let result = document.getElementById("search_Res");
    result.innerHTML = ""

    if (data == undefined) {
        return false;
    }

    data.forEach((el) => {

        let p = document.createElement("p");
        p.innerText = el.snippet.title;
        p.addEventListener("click", function () {
            getTitle(el)
        })

        result.append(p);

    })
}


let main = async () => {
    let query = document.getElementById("query").value;

    let response = await getData(query)

    append(response)

}

let debounceFunc = (func, delay) => {
    document.getElementById("search_Res").style.zIndex = "1";
    document.getElementById("movies").style.zIndex = "-1";
    document.getElementById("search_Res").style.background = "white"
    document.getElementById("search_Res").style.color = "black"



    if (id) {
        setTimeout(id)
    }

    id = setTimeout(() => {
        func()
    }, delay)
}


// youtube data 

let getTitle = async (el) => {

    document.getElementById("movies").style.zIndex = "1";
    document.getElementById("search_Res").style.zIndex = "0";
    document.getElementById("search_Res").style.color = "white"


    // document.getElementById("box").innerHTML=""

    try {

        let query = el.snippet.title;

        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&key=${api_key}`


        let res = await fetch(url);

        let data = await res.json();

        appendMovies(data.items)


    } catch (err) {
        console.log(err)
    }


}

let appendMovies = (data) => {
    let movies = document.getElementById("movies");

    movies.innerHTML = "";


    data.forEach((el) => {

        let div = document.createElement("div");
        div.addEventListener("click", function () {
            showInFullScreen(el)
        })

        //    let iframe=document.createElement("iframe");
        //    iframe.src=`https://www.youtube.com/embed/${el.id.videoId}`

        let Image = document.createElement("img");
        Image.src = el.snippet.thumbnails.high.url;

        let h3 = document.createElement("h3")
        h3.innerHTML = el.snippet.title;

        div.append(Image, h3);

        movies.append(div)



    })
}

// search button function 

let searchFunc = async (el) => {

    document.getElementById("movies").style.zIndex = "1";
    document.getElementById("search_Res").style.zIndex = "0";
    document.getElementById("search_Res").style.color = "white"

    // document.getElementById("box").innerHTML=""

    try {

        let query = document.getElementById("query").value;

        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&key=${api_key}`


        let res = await fetch(url);

        let data = await res.json();

        sappendMovies(data.items)

    } catch (err) {
        console.log(err)
    }


}

let sappendMovies = (data) => {
    let movies = document.getElementById("movies");

    movies.innerHTML = "";



    data.forEach((el) => {

        let div = document.createElement("div")
        div.addEventListener("click", function () {
            showInFullScreen(el)
        })

        //    let iframe=document.createElement("iframe");
        //    iframe.src=`https://www.youtube.com/embed/${el.id.videoId}`

        let Image = document.createElement("img");
        Image.src = el.snippet.thumbnails.high.url;

        let h3 = document.createElement("h3")
        h3.innerHTML = el.snippet.title;

        div.append(Image, h3);

        movies.append(div)

    })
}

// show in full screen on other page 

function showInFullScreen(el) {
    localStorage.setItem("video", JSON.stringify(el))

    window.location.href = "showvideo.html"
}


// show trending movies 




let trendingmovies = async (el) => {

    document.getElementById("movies").style.zIndex = "1";
    document.getElementById("search_Res").style.zIndex = "0";
    document.getElementById("search_Res").style.color = "white"

    //    document.getElementById("box").innerHTML=""

    try {

        let res = await fetch(trending_url);

        let data = await res.json();

        trendingMovies(data.items)

    } catch (err) {
        console.log(err)
    }


}

trendingmovies()

let trendingMovies = (data) => {
    let movies = document.getElementById("movies");

    movies.innerHTML = "";



    data.forEach((el) => {


        let div = document.createElement("div");
        div.addEventListener("click", function () {
            showInFullScreen(el)
        })

        let Image = document.createElement("img");
        Image.src = el.snippet.thumbnails.high.url;

        let h3 = document.createElement("h3")
        h3.innerHTML = el.snippet.title;

        div.append(Image, h3);

        movies.append(div)

    })
}

{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/4QFs62Y682g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */ }