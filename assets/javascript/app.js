var API_Key = "ab90f8c5a4d5439083721c1808c112e9";
$("#clear").on("click", function (event) {
    $("#results").empty();
});

$("#search").on("click", function (event) {
    //get input from the user here
    var searchString = $("#formGroupExampleInputterm").val().trim();
    alert(searchString);
    //page limit get user from the input here
    var pageLimit = $("#inlineFormCustomSelectPref").val().trim();
    var startYear = $("#formGroupExampleInput2startYear").val().trim();
    
    var endYear = $("#formGroupExampleInput2endYear").val().trim();
    var queryURL= "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    if(startYear!==""&& endYear!==""){
    queryURL += '?' + $.param({
        'api-key': API_Key,
        'q': searchString,
        //api query searches in this format only YYYYMMDD
        'begin_date': startYear + "0101",
        'end_date': endYear+ "0101"
    });
    }
    else{
        queryURL += '?' + $.param({
            'api-key': API_Key,
            'q': searchString,
            
            
        }); 

    }
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (result) {
        console.log(result.response.docs.length);
        $("#results").empty();

        for (var i = 0; i < pageLimit; i++) {
            var articleList = $("<div class='well'>");
            //headline
            var mainHeading = result.response.docs[i].headline.main;
            articleList.append("<div><h3><strong>" + mainHeading + "</h3></strong></div>");
            //byline
           //used if condition here sometimes byline doesn't appear in response object
            var byLine="";
            if(result.response.docs[i].byline===undefined){
             
            articleList.append("<div><h5>" + undefined + "<h5></div>");
            }
            else{
                byLine= result.response.docs[i].byline.original;    
            articleList.append("<div><h5>" + byLine + "<h5></div>");
            }
            //section
            var section = result.response.docs[i].section_name;
            articleList.append("<div><h5>Section :" + section + "</h5></div>");
            //published date
            var publishedDate = result.response.docs[i].pub_date;
            articleList.append("<div><h5>" + publishedDate + "</h5></div>");
            //website url
            var websiteUrl = result.response.docs[i].web_url;
            articleList.append("<div class='webUrl'><a href=" + websiteUrl + ">" + websiteUrl + "</a></div><br>");
            console.log("headline " + mainHeading);
            console.log("byline " + byLine);
            console.log("Section " + section);

            console.log("Published Date " + publishedDate);
            console.log("Website Url" + websiteUrl);
            $("#results").append(articleList);


        }
    });
});
