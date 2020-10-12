const $mainVideo = document.getElementById("main_video");
const $mainGif = document.querySelector(".main_gif");
const $mainOverlay = document.querySelector(".main_overlay");
const $textOverlay = document.querySelector(".overlay_text");
const $imgOverlay = document.querySelector(".overlay_img");
const $btnsOverlay = document.querySelector(".overlay_btns");
const $downloadOverBtn = document.querySelector(".btn_over_download");
const $screenTitle = document.querySelector(".screen_title");
const $screenParagraph = document.querySelector(".screen_paragraph");
const $startBtn = document.querySelector(".button_start");
const $recordBtn = document.querySelector(".button_record");
const $stopBtn = document.querySelector(".button_stop");
const $uploadBtn = document.querySelector(".button_upload");
const $restartBtn = document.querySelector(".restartButton");
const $step1 = document.querySelector(".step1");
const $step2 = document.querySelector(".step2");
const $step3 = document.querySelector(".step3");
let recorder;

const record = () => {
    $step1.classList.add("active");
    $startBtn.style.display = "none";
    $recordBtn.style.display = "block";
    $screenTitle.innerHTML = "¿Nos das acceso a tu cámara?";
    $screenParagraph.innerHTML =
        "El acceso a tu camara será válido sólo por el tiempo que estés creando el GIFO.";

    navigator.mediaDevices
        .getUserMedia({
            audio: false,
            video: {
                height: { max: 480 },
            },
        })
        .then(function (stream) {
            $step1.classList.remove("active");
            $step2.classList.add("active");

            $screenParagraph.classList.add("hide");
            $screenTitle.classList.add("hide");
            $mainVideo.classList.remove("hide");
            $mainVideo.srcObject = stream;
            $mainVideo.onloadedmetadata = function (e) {
                $mainVideo.play();
            };

            recorder = RecordRTC(stream, {
                type: "gif",
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,

                onGifRecordingStarted: function () {
                    console.log("started");
                },
            });
        });
};

$startBtn.addEventListener("click", record);

const startRecord = () => {
    $recordBtn.style.display = "none";
    $stopBtn.style.display = "block";
    recorder.startRecording();
};

$recordBtn.addEventListener("click", startRecord);

let form = new FormData();
const stopRecord = () => {
    $stopBtn.style.display = "none";
    $uploadBtn.style.display = "block";
    $mainVideo.classList.add("hide");
    $mainGif.classList.remove("hide");
    $restartBtn.classList.remove("hide");
    recorder.stopRecording(() => {
        blob = recorder.getBlob();
        const url = URL.createObjectURL(blob);
        $mainGif.src = url;
        $downloadOverBtn.onclick = () => downloadGif(url, "myGif");
        form.append("file", blob, "myGif.gif");
    });
};

$stopBtn.addEventListener("click", stopRecord);

const uploadRecord = async () => {
    $step2.classList.remove("active");
    $step3.classList.add("active");
    $mainOverlay.classList.remove("hide");
    $uploadBtn.style.display = "none";

    await fetch(
        "https://upload.giphy.com/v1/gifs?api_key=eDyIdYyGYjGzyjzBCvahgfJE97JU6hYJ",
        {
            mode: "cors",
            method: "POST",
            body: form,
        }
    )
        .then((res) => res.json())
        .then((gif) => {
            $imgOverlay.src = "/assets/check.svg";
            $textOverlay.innerHTML = "Subido con exito!";
            $btnsOverlay.classList.remove("hide");

            console.log(gif);
        })
        .catch((err) => console.log(err));
};

$uploadBtn.addEventListener("click", uploadRecord);
$restartBtn.addEventListener("click", () => {
    $uploadBtn.style.display = "none";
    $mainOverlay.classList.add("hide");
    $step3.classList.remove("active");
    $mainVideo.classList.remove("hide");
    $mainGif.classList.add("hide");
    recorder.clearRecordedData();
    record();
});
