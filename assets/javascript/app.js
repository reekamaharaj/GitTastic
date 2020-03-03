let topic = ["cat", "dog", "bird"];

            $("button").on("click", function () {
                let gif = $(this).attr("data-name");
                let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                    gif + "&api_key=Ko2TodEFIU2Wjn5jsH2Iy2CCGCVVBg7q&limit=10";
                $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                    .then(function (response) {
                        let results = response.data;
                        console.log(response);
                        for (let i = 0; i < results.length; i++) {
                            let gifDiv = $("<div>");
                            let rating = results[i].rating;
                            let p = $("<p>").text("Rating: " + rating);
                            let gifImage = $("<img>");
                            gifImage.attr("src", results[i].images.fixed_height.url);
                            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                            gifImage.attr("data-animate", results[i].images.fixed_height.url);
                            gifImage.attr("data-state", "animate");
                            gifImage.attr("alt", "gif image");
                            gifImage.addClass("gifImg");
                            gifDiv.append(p);
                            gifDiv.append(gifImage);
                            $("#gifContainer").prepend(gifDiv);
                        }
                    });
            });