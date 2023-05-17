console.log('Welcome to Voice');

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName=document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs= [
    {songName: "Falsafa - Tanzeel Khan", filePath: "1.mp3", coverPath: "falsafa.jpg"},
    {songName: "Comethru - Jeremy Zucker", filePath: "2.mp3", coverPath: "comethru.jpg"},
    {songName: "This Feeling - The Chainsmokers", filePath: "3.mp3", coverPath: "ThisFeeling.png"},
    {songName: "Dance Monkey - Tones and I", filePath: "4.mp3", coverPath: "DanceMonkey.jpg"},
    {songName: "Ek Tarfa 2.0 - Darshan Raval", filePath: "5.mp3", coverPath: "ektarfa.jpg"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName ("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText =songs[i].songName;
})

// audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity=0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

//Handle Seekbar
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value/100)*audioElement.duration;
})

const makeAllPlays=()=>{
   Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex= parseInt(e.target.id)
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src=`${songIndex}.mp3`;
        masterSongName.innerText= songs[songIndex-1].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>4){
        songIndex=0;
    }
    else{
        songIndex+=1
    }
    audioElement.src=`${songIndex}.mp3`;
    masterSongName.innerText= songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=1){
        songIndex=0;
    }
    else{
        songIndex-=1
    }
    audioElement.src=`${songIndex}.mp3`;
    masterSongName.innerText= songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})