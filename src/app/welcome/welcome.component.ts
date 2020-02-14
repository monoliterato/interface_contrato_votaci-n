import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { Page, ContentView } from "@nativescript/core/ui/page";
import { SwipeGestureEventData } from "@nativescript/core/ui/gestures/gestures";
import { GridLayout, GridUnitType, ItemSpec } from "@nativescript/core/ui/layouts/grid-layout";
import { AnimationDefinition, Animation } from '@nativescript/core/ui/animation';
import { screen, isAndroid, device } from "@nativescript/core/platform";

import * as app from "@nativescript/core/application";
import * as fs from "@nativescript/core/file-system";
import * as builder from "@nativescript/core/ui/builder";

import { WelcomeSlidesService } from "./welcome-slides.service";

declare var android: any;

@Component({
    selector: "welcome",
    moduleId: module.id,
    templateUrl: "./welcome.component.html"
})
export class WelcomeComponent implements OnInit {
    private slidesPath = 'pages/welcome/slides';
    private slideFiles = ['slide1.xml', 'slide2.xml', 'slide3.xml'];

    private currentSlideNum: number = 0;
    private slideCount = 3;

    private screenWidth;
    private slidesView: GridLayout;

    @ViewChild('slideContent',{static:true}) slideElement: ElementRef;
    private slideView: ContentView;

    constructor(
        private page: Page,
        private nav: RouterExtensions,
        private slidesService: WelcomeSlidesService
    ) {
        this.screenWidth = screen.mainScreen.widthDIPs;

        // Span the background under status bar on Android
        if (isAndroid && device.sdkVersion >= '21') {
            var View = android.view.View;
            var window = app.android.startActivity.getWindow();
            window.setStatusBarColor(0x000000);

            var decorView = window.getDecorView();
            decorView.setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.page.cssClasses.add("welcome-page-background");
        this.page.backgroundSpanUnderStatusBar = true;

        this.slideView = this.slideElement.nativeElement;

        this.loadSlides(this.slidesService.getSlides()).then((slides: any) => {
            var row = new ItemSpec(1, GridUnitType.STAR);
            let gridLayout = new GridLayout();
            slides.forEach((element, i) => {
                GridLayout.setColumn(element, 0);
                if (i > 0)
                    element.opacity = 0
                gridLayout.addChild(element);
            });
            gridLayout.addRow(row);
            this.slideView.content = (this.slidesView = gridLayout);
        });
    }

    private loadSlides(slides) {
        return new Promise(function (resolve, reject) {
            const slideViews = []
            slides.forEach((slide, i) => {
                slideViews.push(builder.parse(slide))
            });

            resolve(slideViews);
        });
    }

    skipIntro() {
        // this.nav.navigate(["/home"], { clearHistory: true });
        this.nav.navigate(["/home"]);
    }

    onSwipe(args: SwipeGestureEventData) {
        let prevSlideNum = this.currentSlideNum;
        let count = this.slideCount;
        if (args.direction == 2) {
            this.currentSlideNum = (this.currentSlideNum + 1) % count;
        } else if (args.direction == 1) {
            this.currentSlideNum = (this.currentSlideNum - 1 + count) % count;
        } else {
            // We are interested in left and right directions
            return;
        }

        const currSlide = this.slidesView.getChildAt(prevSlideNum);
        const nextSlide = this.slidesView.getChildAt(this.currentSlideNum);

        this.animate(currSlide, nextSlide, args.direction);
    }

    animate(currSlide, nextSlide, direction) {
        nextSlide.translateX = (direction == 2 ? this.screenWidth : -this.screenWidth);
        nextSlide.opacity = 1;
        var definitions = new Array<AnimationDefinition>();
        var defn1: AnimationDefinition = {
            target: currSlide,
            translate: { x: (direction == 2 ? -this.screenWidth : this.screenWidth), y: 0 },
            duration: 500
        };
        definitions.push(defn1);

        var defn2: AnimationDefinition = {
            target: nextSlide,
            translate: { x: 0, y: 0 },
            duration: 500
        };
        definitions.push(defn2);

        var animationSet = new Animation(definitions);
        animationSet.play()
            .then(() => {
                // console.log("Animation finished");
            })
            .catch((e) => {
                console.log(e.message);
            });
    }

    itemSelected(item: number) {

        console.log(item)
    }

    getSliderItemClass(item: number) {
        if (item == this.currentSlideNum)
            return "caro-item-dot caro-item-dot-selected";

        return "caro-item-dot";
    }
}
