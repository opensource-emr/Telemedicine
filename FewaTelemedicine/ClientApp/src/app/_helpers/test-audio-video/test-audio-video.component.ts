import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'test-audio-video',
    templateUrl: 'test-audio-video.component.html',
    styleUrls: ['./test-audio-video.component.scss']
})
export class TestAudioVideoComponent implements OnInit, OnDestroy {
    isCamOn = true;

    ngOnInit() {
        this.startVideo();
    }
    ngOnDestroy() {
        this.stopVideo();
    }
    /**
     * start video
     * added by ajay patil
     */
    startVideo() {
        this.isCamOn = true;
        var video = document.querySelector("#pcam") as HTMLVideoElement;
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    video.srcObject = stream;
                })
                .catch((err0r) => {
                    console.log("Something went wrong!");
                });
        }
    }
    /**
     * stop video
     * added by ajay patil
     */
    stopVideo() {
        this.isCamOn = false;
        var video = document.querySelector("#pcam") as HTMLVideoElement;
        const mediaStream = video ? video.srcObject : null;
        if (mediaStream == null) {
            return;
        }
        (<MediaStream>mediaStream).getTracks().forEach(stream => stream.stop());
    }
}