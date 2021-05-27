const playBtn = document.querySelector('.js-play');
const playBtnYt = document.querySelector('.js-play-yt');
const playBtnVimeo = document.querySelector('.js-play-vimeo');
const wrapper = document.querySelector('.wrapper');

playBtn.addEventListener('click', () => {
    wrapper.innerHTML = "<iframe frameborder=\"0\" allowfullscreen=\"1\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" title=\"YouTube video player\" width=\"50%\" height=\"100%\" src=\"https://www.youtube.com/embed/Bsamw_hpL4A?autoplay=1&mute=1&controls=1&origin=https%3A%2F%2Frecette.devoirs.objectif-crpe.fr&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=1\" id=\"widget2\"></iframe>"
});

playBtnYt.addEventListener('click', () => {
    loadApi('youtube', '8l5yhh0m1HA')
        .then(createYoutubeIframe);
});

playBtnVimeo.addEventListener('click', () => {
    loadApi('vimeo', 'some vimeo id')
        .then(createVimeoIframe);
});

function createYoutubeIframe(videoId) {
    const player = new YT.Player('yt-player', {
        height: '390',
        width: '640',
        videoId: videoId,
        playerVars: {
            'playsinline': 1,
            'mute': 1,
            'autoplay': 1
        },
        events: {
            'onReady': (event) => {
                event.target.mute();
                event.target.playVideo();
                event.target.unMute();
            }
        }
    });
}

function createVimeoIframe(videoId) {
    const player = new Vimeo.Player('vimeo-player');
    player.play()
}

let youtubeResolve;

function onYouTubeIframeAPIReady() {
    youtubeResolve()
}

function loadApi(provider, videoId) {
    const isYoutubeIframe = provider === "youtube";

    return new Promise(function (resolve, reject) {

        const scriptId = isYoutubeIframe ? "yt-iframe-api" : "vimeo-iframe-api";
        if(!!document.querySelector('#' + scriptId)) return resolve(videoId);

        const tag = document.createElement('script');
        tag.id = scriptId;

        if(isYoutubeIframe) {
            tag.src = "https://www.youtube.com/iframe_api";
            if (isYoutubeIframe) {
                youtubeResolve = () => resolve(videoId);
            }
        } else {
            tag.src = "https://player.vimeo.com/api/player.js";
            tag.addEventListener('load', () => resolve(videoId)) ;
        }

        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    });
}