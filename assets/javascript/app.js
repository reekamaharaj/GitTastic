let anime = ["Pokemon", "Cowboy Bebop", "Naruto"];
let cartoons = ["Scooby Doo", "CatDog", "Kim Possible"];
let animals = ["Cat", "Dog", "Pig"];
let fav = [ ];

let topic = ["Cat", "Dog", "Pig"];

function addButton() {
    $("#buttons").empty();
    for (let i = 0; i < topic.length; i++) {
        let a = $("<button>");
        a.addClass("gif");
        a.attr("data-name", topic[i]);
        a.text(topic[i]);
        $("#buttons").append(a);
    }

    
    $(".gif").on("click", function () {
        let gif = $(this).attr("data-name");
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            gif + "&api_key=Ko2TodEFIU2Wjn5jsH2Iy2CCGCVVBg7q&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                let results = response.data;
                for (let i = 0; i < results.length; i++) {
                    let gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv" + i);
                    let title = results[i].title;
                    let rating = results[i].rating;
                    let p = $("<p>").html("<br><p class='title'>Title: " + title + "</p><p class= 'rating'>Rating: " + rating);
                    let gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);
                    gifImage.attr("data-state", "still");
                    gifImage.attr("alt", "gif image");
                    gifImage.addClass("gifImg");
                    gifDiv.append(gifImage);
                    gifDiv.append(p);
                    $("#gifContainer").prepend(gifDiv);
                }

                // $(".fa-star").click(function() {
                //     $(this).toggleClass("fas far"); 
                //     thisId = $(this).attr("id");
                //     let favDiv = $("<div>");
                //     favDiv.addClass("gifDiv" + thisId);
                //     let p = $("<p>")
                    
                //     fav.push(".gifDiv" + thisId);
                //     console.log(fav);
                //     //if the img is in the array then delete it
                //     //if it isnt in the array then add it
                //     //this is only pushing the star... need to have it push the gif in the array... 
                // })

                $(".gifImg").on("click", function () {
                    let state = $(this).attr("data-state");
                    console.log(this)
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    }
                    else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                })
            });
    });
}


$("#gifSearch").on("click", function (event) {
    event.preventDefault();
    let search = $("#searchBox").val();
    topic.push(search);
    addButton();
})

function clicked(topicChange){
    topic = topicChange;
    addButton();
}

addButton();
