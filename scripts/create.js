const $mainVideo = document.getElementById("main_video");
const $mainGif = document.querySelector(".main_gif");
const $mainOverlay = document.querySelector(".main_overlay");
const $screenTitle = document.querySelector(".screen_title");
const $screenParagraph = document.querySelector(".screen_paragraph");
const $startBtn = document.querySelector(".button_start");
const $recordBtn = document.querySelector(".button_record");
const $stopBtn = document.querySelector(".button_stop");
const $uploadBtn = document.querySelector(".button_upload");
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
    recorder.stopRecording(() => {
        blob = recorder.getBlob();
        $mainGif.src = URL.createObjectURL(blob);

        form.append("file", blob, "myGif.gif");
    });
};

$stopBtn.addEventListener("click", stopRecord);

const uploadRecord = async () => {
    $step2.classList.remove("active");
    $step3.classList.add("active");
    $mainOverlay.classList.remove("hide");

    await fetch(
        "https://upload.giphy.com/v1/gifs?api_key=eDyIdYyGYjGzyjzBCvahgfJE97JU6hYJ",
        {
            method: "POST",
            body: form,
        }
    )
        .then((res) => res.json())
        .then((gif) => {
            console.log(gif);
        })
        .catch((err) => console.log(err));
};

$uploadBtn.addEventListener("click", uploadRecord);
