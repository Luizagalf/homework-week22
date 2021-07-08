async function onSearch() {
    let getImg = document.getElementById("imgSearch").value;
    try {
        let response = await fetch("https://api.giphy.com/v1/gifs/search?api_key=NJKq4zZxfERGuaQGxf4ae2ICKIG6Wcg7&q=" + getImg + "&limit=5&offset=0&rating=g&lang=en/");
        let img = await response.json();
        document.getElementById("gif").innerHTML = "";
        if (img.data.length != 0) {
            for (let i = 0; i < img.data.length; i++) {
                document.getElementById("gif").innerHTML += `<div align="center"><img src="${img.data[i].images.downsized.url}"></div><br>`;
                document.getElementById("gif").innerHTML;
            }
            document.getElementById("result").innerText = "";
        }
        else {
            document.getElementById("result").innerHTML = `Ничего не найдено!<br>Попробуйте еще раз ;)`;
        }
        document.getElementById("imgSearch").value = "";
    }
    catch(error) {
        document.getElementById("result").innerHTML = `Сервер не доступен`;
        console.log(error);
    }
}