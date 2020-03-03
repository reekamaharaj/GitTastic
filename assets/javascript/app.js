let topics = ["cat", "dog", "bird"];
        addButton();

        function addButton() {
            $("#buttons").empty();
            for (let i = 0; i < topics.length; i++) {
                let a = $("<button>");
                a.addClass("gif");
                a.attr("data-name", topics[i]);
                a.text(topics[i]);
                $("#buttons").append(a);
            }
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
                            gifImage.attr("src", results[i].images.fixed_height_still.url);
                            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                            gifImage.attr("data-animate", results[i].images.fixed_height.url);
                            gifImage.attr("data-state", "animate");
                            gifImage.attr("alt", "gif image");
                            gifImage.addClass("gifImg");
                            gifDiv.append(gifImage);
                            gifDiv.append(p);
                            $("#gifContainer").prepend(gifDiv);
                        }

                        $(".gifImg").on("click", function () {
                            let state = $(this).attr("data-state");
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

        $("#gifsearch").on("click", function (event) {
            event.preventDefault();
            let search = $("#searchbox").val();
            topics.push(search);
            addButton();
        })


        /* giphy notes 

        Add to API URL to get random gifs
        e826c9fc5c929e0d6c6d423841a282aa

        q: string, search query term or phrase
        rating: string, filters by rating
        limit: integer number of objects returned
        
        Gif URL
        api.giphy.com/v1/gifs/search

        Sticker URL
        api.giphy.com/v1/stickers/
        
        parameters: api_key, q,limit, offset, rating, lang, random_id
        ==================================================================

        Trending GIF URL
        api.giphy.com/v1/gifs/trending

        Trending sticker URL
        api.giphy.com/v1/stickers/trending

        parameters: api_key, limit, offset, rating, random_id

        ==================================================================

        Translate URL gif
        api.giphy.com/v1/gifs/translate

        Translate sticker URL
        api.giphy.com/v1/stickers/translate

        parameters: api_key, s, weirdness (1-10), random_id

        ==================================================================

        Random URL gif
        api.giphy.com/v1/gifs/random

        Translate sticker URL
        api.giphy.com/v1/stickers/random

        parameters: api_key, tag, rating, random_id

        ==================================================================

        Translate URL gif
        api.giphy.com/v1/gifs/translate

        Translate sticker URL
        api.giphy.com/v1/stickers/translate

        parameters: api_key, s, weirdness (1-10), random_ids

        ==================================================================
        */
