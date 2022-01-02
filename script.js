const auth = "563492ad6f91700001000001898ce564ce444b7382f79c253af9ce4d";
const next = document.querySelector(".next");
const input = document.querySelector("input");
const searchButton = document.querySelector(".searchButton");

let pagenr = 1;
let search = false;
let query = "";

input.addEventListener("input", (e) => {
  e.preventDefault();
  query = e.target.value;
});

async function curatedPhotos(pagenr){
  const data = await fetch(`https://api.pexels.com/v1/curated?per_page=15&page=${pagenr}`, {
    method: "GET",
    headers: 
    {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const result = await data.json();
  result.photos.forEach((photo) => {
    const pic = document.createElement("div");
    pic.innerHTML = `<img src=${photo.src.large}>`;
    document.querySelector(".gallery").appendChild(pic);
  });

  console.log(result);
}

async function SearchPhotos(query,pagenr){
  const data = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=15`, {
    method: "GET",
    headers: 
    {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const result = await data.json();
  result.photos.forEach((photo) => {
    const pic = document.createElement("div");
    pic.innerHTML = `<img src=${photo.src.large}>`;
    document.querySelector(".gallery").appendChild(pic);
  });

  console.log(result);
}

searchButton.addEventListener("click", () => {
  if (input.value === "") return;
  clear();
  search = true;
  SearchPhotos(query, pagenr);
  pagenr++;
});

function clear() {
  input.value = "";
  document.querySelector(".gallery").innerHTML = "";
  pagenr = 1; 
}

next.addEventListener("click",()=> {
    if (!search)
    {
      pagenr++;
      curatedPhotos(pagenr);
  }
    else {
      if (query.value === "") return;
      pagenr++;
      SearchPhotos(query, pagenr);
  }
})

curatedPhotos(pagenr);