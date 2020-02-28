import { Component, OnInit } from '@angular/core';
var fs= require("file-system");
let imagepicker= require("nativescript-imagepicker");

import { takePicture } from 'nativescript-camera';
import {ImageSource, fromFile, fromResource, fromBase64} from "tns-core-modules/image-source";
import {Folder, path, knownFolders} from "tns-core-modules/file-system";


@Component({
  selector: 'ns-pics',
  templateUrl: './pics.component.html',
  styleUrls: ['./pics.component.css']
})
export class PicsComponent implements OnInit {
  public saveImage;
  constructor() { }

  ngOnInit(): void {
  }


openCam(){
  var milliseconds=(new Date).getTime();
  var that =this;
  takePicture({width:300,height:300,keepAspectRatio:true}).then((function(img){

let source = new ImageSource();
source.fromAsset(img).then((source)=>{
  let folder =fs.knowFolders.documents();
  var path =fs.path.joim(folder.path,milliseconds+".png");
  var saved =source.saveToFile(path,"png");
  this.saveImage=path;

} );

  }));
}

}
