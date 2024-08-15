var songs = [
    { unique: "0", songName: "I Tried so hard", image: "https://i.ytimg.com/vi/0JtqyGREebg/maxresdefault.jpg", url: "./songs/1 I tried so long.mp3" },
    { unique: "1", songName: "Kabhi Kabhi Aditi", image: "https://i1.sndcdn.com/artworks-GArwu8k4nmxqcByq-kGjdLg-t500x500.jpg", url: "songs/2 Kabhi kabhi aaditi.mp3" },
    { unique: "2", songName: "Free Fire theme song", image: "https://play-lh.googleusercontent.com/nIV146CRuDyVKmYaXWtFR0BK7iZFqq4UyQPfY_iZOqolvk-USWmG9YupzKWDsN59fm6K=w240-h480-rw", url: "songs/3 free fire Theme song.mp3" },
    { unique: "3", songName: "Skyfall", image: "https://lyricsjunction.wordpress.com/wp-content/uploads/2012/10/adele-has-handed-her-stunning-vocals-to-the-official-theme-tune-for-the-new-bond-movie-skyfall.jpg?w=300", url: "./songs/4 Skyfall.mp3" },
    { unique: "4", songName: "kali mantra", image: "https://i.ytimg.com/vi/TTqOBt7EiNo/maxresdefault.jpg", url: "./songs/5 Kali mantra.mp3" },
    { unique: "5", songName: "Piya aayena", image: "https://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg", url: "./songs/6 Piya aayena.mp3" },
    { unique: "6", songName: "Anjanadri theme song", image: "https://c.saavncdn.com/753/Anjanadri-Theme-Song-From-HanuMan-Telugu-Telugu-2024-20240620164855-500x500.jpg", url: "./songs/7 Anjanadari theme song.mp3" },
    { unique: "7", songName: "After dark X Sweater weather", image: "https://i1.sndcdn.com/artworks-LYzjOkNTzGeFJh8y-781gng-t500x500.jpg", url: "./songs/8 After dark X sweater weather.mp3" },
    { unique: "8", songName: "Phonk", image: "https://i2o.scdn.co/image/ab67706c0000cfa3948008ad4904d9e1806c48f6", url: "./songs/9 Phonk.mp3" },
    { unique: "9", songName: "Isa-Andro", image: "https://i.scdn.co/image/ab67616d0000b273cc5bbae201a6df3c2d92130a", url: "./songs2/10 Isa-indro.mp3" },
    { unique: "10", songName: "Namami shamishan", image: "https://www.shutterstock.com/shutterstock/videos/1062247672/thumb/1.jpg?ip=x480", url: "./songs2/11 Namami Shamishan.mp3" },
    { unique: "11", songName: "Mahabali maharudrabal", image: "https://i.pinimg.com/736x/24/39/20/243920873cd73d4393cdc8ca37c9eac2.jpg", url: "./songs2/12 Mahabali maharudrabal.mp3" },
    { unique: "12", songName: "Rang morla", image: "https://a10.gaanacdn.com/gn_img/albums/w4MKPObojg/MKPDklQGKo/size_m.jpg", url: "./songs2/13 Rang morla.mp3" },
    { unique: "13", songName: "Pularikalo", image: "https://i1.sndcdn.com/artworks-000138814512-l0ul6z-t500x500.jpg", url: "./songs2/14 Pularikalo.mp3" },
    { unique: "14", songName: "Tu hain kahan", image: "https://hugh.cdn.rumble.cloud/s/s8/1/5/p/x/L/5pxLp.oq1b.2-small-TU-HAI-KAHAN-PERFECTLY-SLOW.jpg", url: "./songs2/15 Tu hain kahan.mp3" },
    { unique: "15", songName: "Guru Ashtakam", image: "https://www.quietkarma.org/wp-content/uploads/2018/08/introduction-to-the-guru-gita.jpg", url: "./songs2/16 Guru Ashtakam.mp3" }
]

var allSong_cont = document.querySelector(".songs");
var images = document.querySelector(".image_cont");
var blurImage = document.querySelector(".prt1");
var player = document.querySelector(".player");
var backward = document.querySelector(".ri-skip-back-mini-fill");
var forward = document.querySelector(".ri-skip-forward-mini-fill");
var display = document.querySelector(".volumeDisplay");
var prt2 = document.querySelector(".prt2")
var slider = document.querySelector(".slider");
var input = document.querySelector("input");
var suggesionBox = document.querySelector(".suggesion");
var blackLayer = document.querySelector(".blackLayer");
var searchbar = document.querySelector(".search");

var checkingheight = 0;
var disappear = 0;
var time = document.querySelector(".seconds");
var tl = gsap.timeline();
var range = document.querySelector(".range");
var range_cont = document.querySelector(".range_cont");
var select = -1;
var manage = 0;

var audio = new Audio();
var selectedSong = 0;
var currentIndex = 0;

function dataput() {
    var clutter = "";
    songs.forEach(function (obj, index) {
        clutter += `<div class="align1" id="${index}">
        <div class="song">
        <div class="song-image-cont" id="${index}">
        <img src="${obj.image}" alt="">
        </div>
        <h6>${obj.songName}</h6>
        </div>
        <div class="timer">
        <h6>3:44</h6>
        </div>
        </div>`
    })
    allSong_cont.innerHTML = clutter;
    audio.src = songs[selectedSong].url;

    audio.addEventListener('loadedmetadata', function () {
        const duration = audio.duration;
        time.innerHTML = `<h6> 0:00 / ${formatTime(duration)}</h6>`;
    });
}
dataput();

function updateProcess() {
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    const processwidth = (currentTime / duration) * 100;
    gsap.to(range, {
        width: `${processwidth}%`
    })
    time.innerHTML = `<h6>${formatTime(audio.currentTime)} / ${formatTime(duration)}</h6>`;
}
var flag = 0;

function playing() {
    audio.play();
    flag = 1;
    player.innerHTML = `<i class="ri-pause-fill"></i>`;
    player.style.padding = "0.5rem";
    player.style.fontWeight = "900";
}
function pausing() {
    audio.pause();
    flag = 0;
    player.innerHTML = `<i class="ri-play-mini-fill"></i>`;
    player.style.padding = '0.5rem 0.4rem 0.5rem 0.6rem';
}
function imageView() {
    blurImage.style.backgroundImage = `url(${songs[selectedSong].image})`;
    images.innerHTML = `<img src="${songs[selectedSong].image}" alt="">`;
}

var align1 = document.querySelectorAll(".align1");
var sideImage = document.querySelectorAll(".song-image-cont");

function controle() {
    allSong_cont.addEventListener("click", function (elem) {
        selectedSong = elem.target.id;
        dataput();
        imageView();
        playing();
        visible();
    })

    player.addEventListener("click", function () {
        if (flag == 0) {
            playing();
        }
        else {
            pausing();
        }
    })
}
controle();

var count = 0;

function soundUpdata() {
    gsap.to("#volumeIndicator", {
        height: `${Math.floor(audio.volume * 100)}%`,
        duration: 0.2,
    })

    gsap.to("#volume_cont", {
        opacity: 1,
        duration: 0.6,
    })

    count++;

    if (count == 1) {
        setTimeout(() => {
            gsap.to("#volume_cont", {
                opacity: 0,
                duration: 0.6,
            })
            count = 0;
        }, 4000);
    }
}

const MAX_VOLUME = 1.0;
const MIN_VOLUME = 0.0;

const VOLUME_STEP = 0.05;

var check = 0;
var typingStatus = false;
window.addEventListener("keydown", function (event) {
    if (typingStatus == false) {
        if (event.key == ' ') {
            if (flag == 0) {
                playing();
            }
            else {
                pausing();
            }
        }
        function volumeControl() {
            if (event.key === "ArrowUp") {
                audio.volume = Math.min(audio.volume + VOLUME_STEP, MAX_VOLUME);
                soundUpdata();
            }
            else if (event.key === "ArrowDown") {
                audio.volume = Math.max(audio.volume - VOLUME_STEP, MIN_VOLUME);
                soundUpdata();
            }
            else if (event.key === "ArrowRight") {
                if (selectedSong <= songs.length - 1) {
                    selectedSong++;
                    dataput();
                    imageView();
                    playing();
                    visible();
                }
            }
            else if (event.key === "ArrowLeft") {
                if (selectedSong > 0) {
                    selectedSong--;
                    dataput();
                    imageView();
                    playing();
                    visible();
                }
            }
        }
        volumeControl();
    }
    if (typingStatus == true) {
        if (input.value !== null) {
            if (event.key == "ArrowDown") {
                if (select < suggesionBox.children.length - 1) {
                    select++;
                }

                suggesionBox.children[select].style.backgroundColor = "var(--selected)";

                if (select >= 1) {
                    suggesionBox.children[select - 1].style.backgroundColor = "black";
                }

                var getheight = suggesionBox.children[select].getBoundingClientRect();

                if (getheight.top >= window.innerHeight - getheight.height) {
                    checkingheight += getheight.height;
                    suggesionBox.style.transform = `translate(0px,-${checkingheight}px)`;
                    console.log(checkingheight);
                }

                if (select == suggesionBox.children.length - 1) {
                    checkingheight = 0;
                }
            }
            else if (event.key == "ArrowUp") {
                if (select > 0) {
                    select--;
                }
                suggesionBox.children[select].style.backgroundColor = "var(--selected)";

                suggesionBox.children[select + 1].style.backgroundColor = "black";

                var getheight1 = suggesionBox.children[select].getBoundingClientRect();

                var searchInfo = searchbar.getBoundingClientRect();

                if (getheight1.top <= searchInfo.height - getheight1.height) {
                    var position = Number(suggesionBox.style.transform.split('(')[1].split(')')[0].split(',')[1].trim().split('px')[0]);
                    if (getheight1.top != getheight1.height)
                        suggesionBox.style.transform = `translate(0px,${position + getheight1.height}px`;
                }
            }
        }
    }
    if (event.key == "Escape") {
        input.blur();
        vanish();
    }
    if (event.key == "Enter") {
        selectedSong = suggesionBox.children[select].getAttribute("data-unique")
        dataput();
        playing();
        imageView();
        input.value = "";
        vanish();
        input.blur();
        visible();
    }
    if (event.key == "/") {
        input.focus();
        this.setTimeout(() => {
            input.value = "";
        }, 1)
    }
})

forward.addEventListener("click", function () {
    if (selectedSong <= songs.length - 1) {
        selectedSong++;
        dataput();
        imageView();
        playing();
        visible();
    }
})

backward.addEventListener("click", function () {
    if (selectedSong > 0) {
        selectedSong--;
        dataput();
        imageView();
        playing();
        visible();
    }
})

// you have to make playlist of favorite songs when ever we click on the heart icon the song will be added to playlist

function visible() {
    if (selectedSong == 0) {
        backward.style.color = "rgba(151, 151, 151, 0.153)";
    }
    else if (selectedSong > 0) {
        backward.style.color = "white";
    }

    if (selectedSong == songs.length - 1) {
        forward.style.color = "rgba(151, 151, 151, 0.153)";
    }
    else {
        forward.style.color = "white";
    }
}
visible();

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

audio.addEventListener("timeupdate", updateProcess);

range_cont.addEventListener("click", function (e) {
    const rect = range_cont.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const timelineWidth = range_cont.offsetWidth;
    const newTime = (clickX / timelineWidth) * audio.duration;
    audio.currentTime = newTime;
})

slider.addEventListener("click", () => {
    if (check == 0) {
        gsap.to(".prt2", {
            top: "3%",
            duration: 1,
            ease: "expo.inOut",
            transform:"translate(0px,0px)"
        })

        gsap.to(".slider", {
            bottom: "94%",
            duration: 1,
            ease: "expo.inOut",
            alignItems: "flex-start",
            function() {
                setTimeout(() => {
                    slider.innerHTML = `<i class="ri-arrow-drop-down-line"></i>`;
                }, 500)
            }
        })
        check = 1;
    }
    else {
        gsap.to(".prt2", {
            top: "100%",
            duration: 1,
            ease: "expo.inOut",
        })

        gsap.to(".slider", {
            bottom: "14%",
            duration: 1,
            ease: "expo.inOut",
            function() {
                setTimeout(() => {
                    slider.innerHTML = `<i class="ri-arrow-drop-up-line"></i>`;
                }, 500)
            }
        })
        check = 0;
    }
})

function vanish() {
    gsap.to(".blackLayer", {
        opacity: 0,
        pointerEvents: "none",
    })
    input.value = "";
    select = -1;
}

function suggesionPlay() {
    suggesionBox.addEventListener("click", function (elem) {
        selectedSong = elem.target.getAttribute("data-unique");
        dataput();
        imageView();
        playing();
        vanish();
        visible();
    })
}

function search() {
    input.addEventListener("input", () => {
        select = -1;
        var clutter1 = "";
        var arrFilter = songs.filter(obj => obj.songName.toLowerCase().startsWith(input.value.toLowerCase()));
        arrFilter.forEach((val) => {
            clutter1 += `<h4 data-image="${val.image}" data-name="${val.url}" data-unique="${val.unique}">${val.songName}</h4>`;
        })

        gsap.to(suggesionBox, {
            display: "block",
        })

        suggesionBox.innerHTML = clutter1;
        suggesionPlay();
        if (input.value == "") {
            select = -1;
            suggesionBox.style.transform = `translate(0px,0px)`;
        }
        suggesionBox.style.transform = `translate(0px,0px)`;

    })

    input.addEventListener("focus", () => {

        if (window.innerWidth <= 800) {
            gsap.to(".prt2", {
                transform: "translate(0%,18%)",
                duration: 0.2,
                ease: "power3"
            },)

            gsap.to(".search", {
                width: "100%",
                duration: 1,
                delay: 0.6
            })

        }
        gsap.to(".blackLayer", {
            opacity: 1,
            pointerEvents: "all",
        })

        if (window.innerWidth <= 800) {
            gsap.to("input", {
                width: "70%",
                duration: 1,
                ease: "expo.inOut",
            })
        }
        gsap.to("input", {
            width: "70%",
            duration: 1,
            ease: "expo.inOut",
        })

        typingStatus = true;
    })
    input.addEventListener("blur", () => {
        typingStatus = false;

        gsap.to("input", {
            width: "40%",
            duration: 1,
            ease: "expo.inOut"
        })
        if (window.innerWidth <= 600) {
            vanish();

            gsap.to("input", {
                width: "53%",
            })
        }
        select = -1;
    })

    blackLayer.addEventListener("click", () => {
        vanish();
    })
}

search();