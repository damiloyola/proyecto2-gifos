let recorder;

//! FUNCION PRINCIPAL PARA GRABAR
const record = async () => {
    $step1.classList.add("active");
    $startBtn.style.display = "none";
    $recordBtn.style.display = "block";
    $screenTitle.innerHTML = "¿Nos das acceso a tu cámara?";
    $screenParagraph.innerHTML =
        "El acceso a tu camara será válido sólo por el tiempo que estés creando el GIFO.";

    await navigator.mediaDevices
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

                onGifRecordingStarted: function () {
                    console.log("started");
                },
            });
            console.log(recorder);
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
            $imgOverlay.src = "assets/check.svg";
            $textOverlay.innerHTML = "Subido con exito!";
            $btnsOverlay.classList.remove("hide");
            console.log(gif);
            fetchIdMiGif(gif.data.id);
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
