
//EVENT LISTENERS
// window load
window.addEventListener('load', fetchNewDog);
window.addEventListener('load', createImageGrid);
//click and change
document.getElementById("fetchButton").addEventListener('click', fetchNewDog);
document.getElementById("gridButton").addEventListener('click', createImageGrid);

//FETCH CALLS



//HELPER FUNCTIONS
//checkStatus
function checkStatus(response){
  if(response.ok){
    return Promise.resolve(response);
  }else{
    return Promise.reject(new Error(response.statusText));
  }
}

//display Dog Info
function displayDogInfo(data){
  //populate paragraph
  document.getElementById('dogInfo').innerHTML = `<strong>${capitalize(data[0])}:</strong> ${data[2][0]} <a href="${data[3][0]}" alt="read more on wikipedia"> Read more on wikipedia</a>`;
}


//handleData
function handleData(data){
  let url = data.message;
  console.log(url)
  let regex = /https:\/\/images\.dog\.ceo\/breeds\/(\w+\-?\w+)\/.+/g;
  let breedName = regex.exec(url);
  document.getElementById('randomImageContainer').innerHTML = `<img alt="random image of a ${fixBreed(breedName[1])}" src='${url}'/>`;
  document.querySelector('.dogInfo').innerHTML = `<p class="h5">Random image of a ${fixBreed(breedName[1])}</p>`;
}

//getImageURL
function getImageURL(data){
  //get random number
  let randomNumberURL = data[Math.floor(Math.random()*data.length)+1];
  listImageContainer.innerHTML = `<img src="${randomNumberURL}" alt="${extractBreedName(data)}"/>`;
}

//notifyUser
function notifyUser(error){
  const errorContainer = document.querySelector('.alert');
  errorContainer.innerHTML = `There was an error with the server request (${error}). <br> Click the button again.`;
  errorContainer.style.display = 'block';
  setTimeout(()=>{
    errorContainer.innerHTML = '';
    errorContainer.style.display ='none';
  },4000)
}

//fixBreed
function fixBreed(breedName){
  if(breedName === 'germanshepherd'){
    return 'German Shepherd';
  }else if(breedName === 'mexicanhairless'){
    return 'Mexican Hairless';
  }else if(breedName === 'stbernard'){
    return 'St. Bernard';
  }else if(breedName === "african"){
    return 'African Wild Dog';
  }else if(breedName === 'bullterrier'){
    return 'Bull Terier';
  }
  return capitalize(breedName);
}

//capitalize breed name
function capitalize(breedName){
  return breedName.replace(/\-/g,' ')
                  .split(" ")
                  .map(word => word.charAt(0).toUpperCase()+word.slice(1))
				          .join(" ");
}

//extract breed name
function extractBreedName(data){
  let regex = /https:\/\/images\.dog\.ceo\/breeds\/(\w+-?\w+)\/\w+\.\w+/g;
  let match = regex.exec(data);
  return fixBreed(match[1]);
}

//createGrid
function createGrid(data){
  let output = '';
  const container = document.querySelector('.card-deck');
  data.map(item =>{
    output+=
    `
    <div class="card mb-4 box-shadow">
      <div class="card-header">
        <h4 class="my-0 font-weight-normal">${extractBreedName(item)}</h4>
      </div>
      <div class="card-body">
        <img src="${item}" class="img-fluid" alt="${extractBreedName(item)}"/>
      </div>
    </div>    
    `
  })
    container.innerHTML = output;
}
