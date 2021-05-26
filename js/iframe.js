const playBtn = document.querySelector('.js-play');
const playBtnYt = document.querySelector('.js-play-yt');
const wrapper = document.querySelector('.wrapper');

playBtn.addEventListener('click', () => {
    console.log('play');
    wrapper.innerHTML = "<iframe frameborder=\"0\" allowfullscreen=\"1\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" title=\"YouTube video player\" width=\"50%\" height=\"100%\" src=\"https://www.youtube.com/embed/Bsamw_hpL4A?autoplay=1&mute=0&controls=1&origin=https%3A%2F%2Frecette.devoirs.objectif-crpe.fr&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=1\" id=\"widget2\"></iframe>"
});

playBtnYt.addEventListener('click', loadIframe);

function onYouTubeIframeAPIReady() {
    var player;

    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'Bsamw_hpL4A',
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': (event) => event.target.playVideo()
        }
    });
}

function loadIframe() {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}