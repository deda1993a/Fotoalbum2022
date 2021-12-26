var width = 1800;
var height = 1842;
var available=0;

let str=[];

const { XHRUpload } = Uppy;

var uppy = new Uppy.Core()

    .use(Uppy.Dashboard, {
        inline: true,
        target: `#drag-drop-area`,
        width: 200,
        height: 200
    })

    .use(Uppy.XHRUpload, {
        endpoint: `Upload`,
        formData: true,
        fieldName: "files"

    })

    .on('file-added', (file) => {
        str.push(file.name);
        //console.log(file.name)
    })

    .on('upload', (data) => {
       

        })




uppy.on(`complete`, (result) => {
    console.log("complete", result.succesfull);
    for (let items of str) {
              
        document.getElementById('sideload').innerHTML += '<img src="Upload\\' + items + '"alt="kep" onclick="klikk();" draggable="true">';
    }
    str = [];
})


var stage = new Konva.Stage({
  container: 'container',
  width: 1800,
  height: 1800,
});
var layer = new Konva.Layer();
layer.offsetX = 1400;
stage.add(layer);

/*var image1 = new Image();
image1.onload = function () {
  var img1 = new Konva.Image({
    x: 0,
    y: 50,
    image: image1,
    width: 106,
    height: 118,
    draggable: true,
  });


  layer.add(img1);
};
image1.src = '1.bmp';

var image2 = new Image();
image2.onload = function () {
  var img2 = new Konva.Image({
    x: 50,
    y: 150,
    image: image2,
    width: 106,
    height: 118,
    draggable: true,
  });

 
  layer.add(img2);
};
image2.src = '2.bmp';*/

stage.on('click', function (e) {

  console.log('clicked on', e.target);
  console.log(
    'usual click on ' + JSON.stringify(stage.offsetX())
  );
});



var itemURL = '';
document
    .getElementById('sideload')
    .addEventListener('dragstart', function (e) {
        itemURL = e.target.src;
    });

var con = stage.container();
con.addEventListener('dragover', function (e) {
    e.preventDefault(); // !important
    console.log("ok");
});

con.addEventListener('drop', function (e) {
    e.preventDefault();
    // now we need to find pointer position
    // we can't use stage.getPointerPosition() here, because that event
    // is not registered by Konva.Stage
    // we can register it manually:
    stage.setPointersPositions(e);

    Konva.Image.fromURL(itemURL, function (image) {
        layer.add(image);

        image.position(stage.getPointerPosition());
        image.draggable(true);
    });
});

function klikk(){
  

  
}





