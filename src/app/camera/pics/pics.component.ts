import { Component, OnInit } from '@angular/core';
var fs= require("file-system");
let imagepicker= require("nativescript-imagepicker");

import { takePicture } from 'nativescript-camera';


import {ImageSource, fromFile, fromResource, fromBase64} from "tns-core-modules/image-source";
import {Folder, path, knownFolders} from "tns-core-modules/file-system";


//galerias de la geolocalizacion para obtener datos de el lugar donde se realiza la captura de la forografía

import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums"; // used to describe at what accuracy the location should be get


//al demonio wa usar los fancy alerts 
import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";


//bien ahora deberemos usar las alertas pero con esta galeria haber si funciona
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
  selector: 'ns-pics',
  templateUrl: './pics.component.html',
  styleUrls: ['./pics.component.css'],

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



alerta(){


 // dialogs.alert("Your message").then(() => {
   // console.log("Dialog closed!");
//});

  geolocation.enableLocationRequest()
  .then(()=>  {geolocation.getCurrentLocation({desiredAccuracy:Accuracy.high})
  .then((location)=>{dialogs.alert(JSON.stringify(location));
  })
  })

}


elemento(){



  TNSFancyAlert.showSuccess(
    "Success!",
    "This uses a custom width of 300.",
    `Oh that's nice.`,
    0,
    300
  );
  
}

}
