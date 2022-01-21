var width = 1800;
var height = 1842;
var available=0;

let str = [];
var backgroundC=false;

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
        console.log(items);
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

var image1 = new Image();
image1.onload = function () {
  var img1 = new Konva.Image({
    x: 0,
    y: 50,
    image: image1,
    name: 'ez',
    width: 106,
    height: 118,
    draggable: true,
  });


  layer.add(img1);
};
image1.src = '1.bmp';


/*
var image2 = new Image();
image2.onload = function () {
  var img2 = new Konva.Image({
    x: 50,
    y: 150,
    image: image2,
    width: 106,
    height: 118,
    draggable: true,
  });/*

 
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

    if (backgroundC == false) {
        Konva.Image.fromURL(itemURL, function (image) {
            layer.add(image);
            image.name('ez');
            image.position(stage.getPointerPosition());
            image.draggable(true);
        });
    } else {
        var imgtmp;
        Konva.Image.fromURL(itemURL, function (image) {
           
            image.name('back');
            imgtmp.src = image.src();
            image.position(stage.getPointerPosition());
           
        });
        var background = new Konva.Rect({

            x: 0,
            y: 0,
            width: stage.width(),
            height: stage.height(),
            fillPatternImage: image1,
            fillPatternOffset: { x: -220, y: 70 },
            // remove background from hit graph for better perf
            // because we don't need any events on the background
            listening: false,
        });
        layer.add(background);
    }
});


var rect1 = new Konva.Rect({
    x: 60,
    y: 60,
    width: 100,
    height: 90,
    fill: 'red',
    name: 'rect',
    draggable: true,
});
layer.add(rect1);

var tr = new Konva.Transformer();
layer.add(tr);

// by default select all shapes
tr.nodes([rect1]);

// add a new feature, lets add ability to draw selection rectangle
var selectionRectangle = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
    visible: false,
});
layer.add(selectionRectangle);

var x1, y1, x2, y2;
stage.on('mousedown touchstart', (e) => {
    // do nothing if we mousedown on any shape
    if (e.target !== stage) {
        return;
    }
    e.evt.preventDefault();
    x1 = stage.getPointerPosition().x;
    y1 = stage.getPointerPosition().y;
    x2 = stage.getPointerPosition().x;
    y2 = stage.getPointerPosition().y;

    selectionRectangle.visible(true);
    selectionRectangle.width(0);
    selectionRectangle.height(0);
});

stage.on('mousemove touchmove', (e) => {
    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
        return;
    }
    e.evt.preventDefault();
    x2 = stage.getPointerPosition().x;
    y2 = stage.getPointerPosition().y;

    selectionRectangle.setAttrs({
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
    });
});

stage.on('mouseup touchend', (e) => {
    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
        return;
    }
    e.evt.preventDefault();
    // update visibility in timeout, so we can check it in click event
    setTimeout(() => {
        selectionRectangle.visible(false);
    });

    var shapes = stage.find('.rect');
    var box = selectionRectangle.getClientRect();
    var selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
    );
    tr.nodes(selected);
});


// clicks should select/deselect shapes
stage.on('click tap', function (e) {
    // if we are selecting with rect, do nothing
    if (selectionRectangle.visible()) {
        return;
    }

    // if click on empty area - remove all selections
    if (e.target === stage) {
        tr.nodes([]);
        return;
    }

    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName('ez')) {
        return;
    }

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        tr.nodes([e.target]);
    } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = tr.nodes().slice(); // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1);
        tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = tr.nodes().concat([e.target]);
        tr.nodes(nodes);
    }
});

var imagesel;
stage.on('click', function (evt) {
    // get the shape that was clicked on
    imagesel = evt.target;
    
});





function klikk(){
  

  
}

function select() {
    sideload.hidden = false;
    document.getElementById("drag-drop-area").hidden = true;
    backgroundC = false;
}

function upload() {
    sideload.hidden = true;
    document.getElementById("drag-drop-area").hidden = false;
}

function deleteI (){
    imagesel.remove();
    tr.nodes([]);
}

function backG() {
    backgroundC = true;
}

function createalbum() {
    document.getElementById('felirat').innerHTML = page.value;
   
}


