/**
 * Sample JavaScript code for youtube.search.list
 * See instructions for running APIs Explorer code samples locally:
 * https://developers.google.com/explorer-help/guides/code_samples#javascript
 */

setTimeout(function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({
            scope: "https://www.googleapis.com/auth/youtube.force-ssl"
        })
        .then(function() {
                console.log("Sign-in successful");
            },
            function(err) {
                console.error("Error signing in", err);
            });
}, 1000)

setTimeout(function loadClient() {
        gapi.client.setApiKey("AIzaSyBylHuXxIExYiTAU6zGRHvvsSo6zUHCOhI");
        return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
            .then(function() {
                    console.log("GAPI client loaded for API");
                },
                function(err) {
                    console.error("Error loading GAPI client for API", err);
                });
    }, 1000)
    // Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
    let input = document.getElementById('input')
    let keyword = input.value
    return gapi.client.youtube.search.list({
            "part": [
                "snippet"
            ],
            "maxResults": 24,
            "q": keyword
        })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                let res = response.result.items
                let block = document.getElementById('block')
                block.innerHTML = ''
                res.forEach(el => {
                    let videoId = el.id.videoId
                    let div = document.createElement('div')
                    div.classList = 'vidos'

                    block.appendChild(div)
                    let title = document.createElement('h2')
                    let br = document.createElement('br')
                    let chanell = document.createElement('h3')
                    title.style.cssText = 'font-size:20;font-weight:500;width:300px;'
                    title.innerHTML = el.snippet.title
                    chanell.style.cssText = 'font-size:25px; '
                    title.classList = 'tt'
                    chanell.innerHTML = el.snippet.channelTitle
                    chanell.classList = 'ch'
                    let divIfr = document.createElement('div')
                    divIfr.innerHTML = ` <iframe width="100%" height="190px" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                    div.append(divIfr)
                    div.append(title)
                    div.append(br)
                    div.append(chanell)
                    console.log(el)
                })
            },
            function(err) {
                console.error("Execute error", err);
            });
}
gapi.load("client:auth2", function() {
    gapi.auth2.init({
        client_id: "YOUR_CLIENT_ID"
    });
});