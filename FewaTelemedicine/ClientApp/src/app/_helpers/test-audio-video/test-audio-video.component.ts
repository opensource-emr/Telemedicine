import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'test-audio-video',
    templateUrl: 'test-audio-video.component.html',
    styleUrls: ['./test-audio-video.component.scss']
})
export class TestAudioVideoComponent implements OnInit, AfterViewInit, OnDestroy {
    isCamOn = true;

    @Input('turnOnCam')
    set camOnOff(val: boolean) {
        if (val == true) {
            this.startVideo();
        } else {
            this.stopVideo();
        }
    }

    constructor(private changeDetector: ChangeDetectorRef) {
        
    }
    ngOnInit() {
        this.startVideo();
    }
    ngAfterViewInit() {
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
        var video = document.getElementById('pcam') as HTMLVideoElement;
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    video.srcObject = stream;
                })
                .catch((err0r) => {
                    // console.log("Something went wrong!");
                });
        }
        this.changeDetector.detectChanges();
    }
    /**
     * stop video
     * added by ajay patil
     */
    stopVideo() {
        this.isCamOn = false;
        var video = document.querySelector("#pcam") as HTMLVideoElement;
        var video2 = document.getElementById("pcam") as HTMLVideoElement;
        const mediaStream = video ? video.srcObject : video2 ? video2.srcObject : null;
        if (mediaStream == null) {
            return;
        }
        (<MediaStream>mediaStream).getTracks().forEach(stream => stream.stop());
        this.changeDetector.detectChanges();
    }
}