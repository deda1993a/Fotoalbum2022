var width = 1800;
var height = 1800;
var available = 0;


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
        document.getElementById('sideload').innerHTML += '<img src="Upload\\' + items + '"alt="kep" width="200" height="150" onclick="klikk();" draggable="true">';
    }
    str = [];
})


var stage = new Konva.Stage({
  container: 'container',
  width: 1800,
  height: 1800,
});
var layer = new Konva.Layer();
//layer.offsetX = 1400;
stage.add(layer);

var image1 = new Image();
image1.onload = function () {
  var img1 = new Konva.Image({
    x: 1110,
    y: 2500,
    image: image1,
    name: 'ez',
    width: 106,
    height: 118,
    draggable: true,
  });


  layer.add(img1);
};
image1.src = 'background1.jpg';


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

var Grscale = function (imageData) {
    // make all pixels opaque 100%
    var nPixels = imageData.data.length;
    if (grscale == true)
        for (var i = 0; i < nPixels; i += 4) {
            brightness = 0.34 * imageData.data[i] + 0.5 * imageData.data[i + 1] + 0.16 * imageData.data[i + 2];
            // red
            imageData.data[i] = brightness;
            // green
            imageData.data[i + 1] = brightness;
            // blue
            imageData.data[i + 2] = brightness;
        }
};

var con = stage.container();
con.addEventListener('dragover', function (e) {
    e.preventDefault(); // !important
    //console.log(con);
});

var grscale = false;
con.addEventListener('drop', function (e) {
    e.preventDefault();
    // now we need to find pointer position
    // we can't use stage.getPointerPosition() here, because that event
    // is not registered by Konva.Stage
    // we can register it manually:





    stage.setPointersPositions(e);
    if (backgroundC == false) {
        //console.log("itemurl:"+itemURL);
        Konva.Image.fromURL(itemURL, function (image) {
            image.name('ez');
            image.position({
                x: stage.getPointerPosition().x - (twidth * currentpage),
                y: stage.getPointerPosition().y
            });
            image.src = itemURL;
            image.setAttr('source', itemURL);
            image.draggable(true);
            console.log(image);
            console.log(layer);          
            image.cache();
            image.filters([Konva.Filters.Blur, Konva.Filters.Brighten, Konva.Filters.Enhance, Grscale]);

            var blur = document.getElementById('blur');
            blur.oninput = function () {
                imagesel.blurRadius(blur.value);
                imagesel.setAttr('blur', blur.value);
            };

            var brighten = document.getElementById('brighten');
            brighten.oninput = function () {
                imagesel.brightness(brighten.value);
                imagesel.setAttr('brighten', brighten.value);
            };

            var enhance = document.getElementById('enhance');
            enhance.oninput = function () {
                imagesel.enhance(parseFloat(enhance.value));
                imagesel.setAttr('enhance', parseFloat(enhance.value));
            };


            grayscale.onclick = function () {
                if (grscale == true) {
                    grscale = false;
                } else {
                    grscale = true;
                }
                
                imagesel.filters([Konva.Filters.Blur, Konva.Filters.Brighten, Konva.Filters.Enhance, Grscale]);
                layer.draw();
                imagesel.setAttr('grscale', grscale);
               // grscale = false;
            };
            console.log("megy");
            layer.add(image);
            stage.add(layer);
        });
        
    } else {
        var imgtmp;
        Konva.Image.fromURL(itemURL, function (image) {
           
            image.name('back');
            imgtmp.src = image.src();
            image.position(stage.getPointerPosition());
           
        });
        for(i=0;i<page.value;i++){
        var background = new Konva.Rect({
            
            x: layer.offsetX(),
            y: 0,
            width: stage.width(),
            height: stage.height(),
            fillPatternImage: image1,
            fillPatternOffset: { x: -220, y: 70 },
            // remove background from hit graph for better perf
            // because we don't need any events on the background
            listening: false,
        });
        }
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

 stgevents();

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
    paintitems.hidden = true;
}

function upload() {
    sideload.hidden = true;
    document.getElementById("drag-drop-area").hidden = false;
    paintitems.hidden = true;
}

function deleteI (){
    imagesel.remove();
    tr.nodes([]);
}

function backG() {
    backgroundC = true;
}

function painttool() {
    sideload.hidden = true;
    paintitems.hidden = false;
    document.getElementById("drag-drop-area").hidden = true;
}

function filters() {
    sideload.hidden = true;
    paintitems.hidden = true;
    document.getElementById("drag-drop-area").hidden = true;
    document.getElementById("filters").hidden = false;

}

function painter() {
    // then we are going to draw into special canvas element
    var canvas = document.createElement('canvas');
    canvas.width = stage.width();
    canvas.height = stage.height();

    // created canvas we can add to layer as "Konva.Image" element
    var image = new Konva.Image({
        image: canvas,
        x: 0,
        y: 0,
    });
    layer.add(image);

    // Good. Now we need to get access to context element
    var context = canvas.getContext('2d');
    context.strokeStyle = '#df4b26';
    context.lineJoin = 'round';
    context.lineWidth = 5;

    var isPaint = false;
    var lastPointerPosition;
    var mode = 'brush';

    // now we need to bind some events
    // we need to start drawing on mousedown
    // and stop drawing on mouseup
    image.on('mousedown touchstart', function () {
        isPaint = true;
        lastPointerPosition = stage.getPointerPosition();
    });

    // will it be better to listen move/end events on the window?

    stage.on('mouseup touchend', function () {
        isPaint = false;
    });

    // and core function - drawing
    stage.on('mousemove touchmove', function () {
        if (!isPaint) {
            return;
        }

        if (mode === 'brush') {
            context.globalCompositeOperation = 'source-over';
        }
        if (mode === 'eraser') {
            context.globalCompositeOperation = 'destination-out';
        }
        context.beginPath();

        var localPos = {
            x: lastPointerPosition.x - image.x(),
            y: lastPointerPosition.y - image.y(),
        };
        context.moveTo(localPos.x, localPos.y);
        var pos = stage.getPointerPosition();
        localPos = {
            x: pos.x - image.x(),
            y: pos.y - image.y(),
        };
        context.lineTo(localPos.x, localPos.y);
        context.closePath();
        context.stroke();

        lastPointerPosition = pos;
        // redraw manually
        layer.batchDraw();
    });

    var select = document.getElementById('tool');
    select.addEventListener('change', function () {
        mode = select.value;
    });
}

function depainter() {
    stage.off();
    stgevents();
}

let json = [];
let stdata = [];
function createalbum() {
    document.getElementById("container").style.borderStyle="solid";
    if (size.value == 1) {
        twidth = 793.706;
        theight = 1122.52;
        slmode='p';
    } else {
        twidth = 1122.52;
        theight = 793.706;
        slmode='l';
    }
    con = stage.container();
    stage.width(twidth);
    stage.height(theight);
    //document.querySelector('container').clientHeight = theight + "px";
    //document.querySelector('container').clientWidth = twidth + "px";

    for (i = 0; i < page.value; i++) {
        stdata[i] = stage.toDataURL({ pixelRatio: 2 });
    }

    currentpage = 0;
    document.getElementById('felirat').innerHTML = currentpage+1+"-"+ page.value;
}

function next() {
    
    if (currentpage < page.value - 1) {
        stdata[currentpage] = stage.toDataURL({ pixelRatio: 2 });
        layer.offsetX(layer.offsetX() - twidth);
        /*console.log(stage);
        console.log(json[currentpage]);
        if (json[currentpage]==null) {
            json.push(stage.toJSON());
        }
        stage = Konva.Node.create(json[currentpage], 'container');
        stage.find('Image').forEach(imageNode => {
            const nativeImage = new window.Image();
            nativeImage.onload = () => {
                imageNode.image(nativeImage);
                //imageNode.name('ez');
                grscale = imageNode.getAttr('grscale');
                imageNode.getLayer().batchDraw();
                imageNode.cache();
                imageNode.filters([Konva.Filters.Blur, Konva.Filters.Brighten, Konva.Filters.Enhance, Grscale]);
                imageNode.blurRadius(imageNode.getAttr('blur'));
                imageNode.brightness(imageNode.getAttr('brighten'));
                imageNode.enhance(imageNode.getAttr('enhance'));

            }
            nativeImage.src = imageNode.getAttr('source');

        })
       
        stgevents();

        console.log(stage);
        json[currentpage]=stage.toJSON();
        console.log("elso"+json[currentpage]);
        
        //layer.destroy();
        layer.destroyChildren();
        layer.draw();

        console.log("uj:");
        console.log(stage);
        */
        currentpage++;
        document.getElementById('felirat').innerHTML = currentpage + 1 + "-" + page.value;
    }
}

    function previous()
    {

        if (currentpage > 0) {
            stdata[currentpage] = stage.toDataURL({ pixelRatio: 2 });
            layer.offsetX(layer.offsetX() + twidth);
            currentpage--;
            
            //json[currentpage] = stage.toJSON();
           /* console.log(json);
            stage.destroy();
            layer.destroy();
            stage = Konva.Node.create(json[currentpage], 'container');
            stage.find('Image').forEach(imageNode => {
                const nativeImage = new window.Image();
                nativeImage.onload = () => {
                    imageNode.image(nativeImage);
                    imageNode.getLayer().batchDraw();
                }
                nativeImage.src = imageNode.getAttr('source');
            })
            

            stgevents();*/
            // by default select all shapes
            


            /*json[currentpage] = stage.toJSON();
            layer.destroyChildren();
            layer.draw();
            console.log("json: "+json[currentpage]);*/
            document.getElementById('felirat').innerHTML = currentpage + 1 + "-" + page.value;
        }
}
    
function draw() {

}

function stgevents() {
    var tr = new Konva.Transformer();
    layer.add(tr);

    // by default select all shapes
    tr.nodes([]);


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

    stage.on('mousemove', function (e) {
        //var pos = group.getRelativePointerPosition()
        // console.log(stage.getPointerPosition());
        console.log("stage width: " + stage.width() + " stage height: " + stage.height());
    });
}

function addtext() {
    var textNode = new Konva.Text({
        text: tx.value,
        x: 50,
        y: 80,
        fontFamily: fonttype.value,
        fontSize: fontsize.value,
        draggable: true,
        width: 200,
    });

    layer.add(textNode);

    var tr = new Konva.Transformer({
        node: textNode,
        enabledAnchors: ['middle-left', 'middle-right'],
        // set minimum width of text
        boundBoxFunc: function (oldBox, newBox) {
            newBox.width = Math.max(30, newBox.width);
            return newBox;
        },
    });

    textNode.on('transform', function () {
        // reset scale, so only with is changing by transformer
        textNode.setAttrs({
            width: textNode.width() * textNode.scaleX(),
            scaleX: 1,
        });
    });

    layer.add(tr);

    textNode.on('dblclick dbltap', () => {
        // hide text node and transformer:
        textNode.hide();
        tr.hide();

        // create textarea over canvas with absolute position
        // first we need to find position for textarea
        // how to find it?

        // at first lets find position of text node relative to the stage:
        var textPosition = textNode.absolutePosition();

        // so position of textarea will be the sum of positions above:
        var areaPosition = {
            x: stage.container().offsetLeft + textPosition.x,
            y: stage.container().offsetTop + textPosition.y,
        };

        // create textarea and style it
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        // apply many styles to match text on canvas as close as possible
        // remember that text rendering on canvas and on the textarea can be different
        // and sometimes it is hard to make it 100% the same. But we will try...
        textarea.value = textNode.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
        textarea.style.height =
            textNode.height() - textNode.padding() * 2 + 5 + 'px';
        textarea.style.fontSize = textNode.fontSize() + 'px';
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = textNode.lineHeight();
        textarea.style.fontFamily = textNode.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = textNode.align();
        textarea.style.color = textNode.fill();
        rotation = textNode.rotation();
        var transform = '';
        if (rotation) {
            transform += 'rotateZ(' + rotation + 'deg)';
        }

        var px = 0;
        // also we need to slightly move textarea on firefox
        // because it jumps a bit
        var isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
            px += 2 + Math.round(textNode.fontSize() / 20);
        }
        transform += 'translateY(-' + px + 'px)';

        textarea.style.transform = transform;

        // reset height
        textarea.style.height = 'auto';
        // after browsers resized it we can set actual value
        textarea.style.height = textarea.scrollHeight + 3 + 'px';

        textarea.focus();

        function removeTextarea() {
            textarea.parentNode.removeChild(textarea);
            window.removeEventListener('click', handleOutsideClick);
            textNode.show();
            tr.show();
            tr.forceUpdate();
        }

        function setTextareaWidth(newWidth) {
            if (!newWidth) {
                // set width for placeholder
                newWidth = textNode.placeholder.length * textNode.fontSize();
            }
            // some extra fixes on different browsers
            var isSafari = /^((?!chrome|android).)*safari/i.test(
                navigator.userAgent
            );
            var isFirefox =
                navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if (isSafari || isFirefox) {
                newWidth = Math.ceil(newWidth);
            }

            var isEdge =
                document.documentMode || /Edge/.test(navigator.userAgent);
            if (isEdge) {
                newWidth += 1;
            }
            textarea.style.width = newWidth + 'px';
        }

        textarea.addEventListener('keydown', function (e) {
            // hide on enter
            // but don't hide on shift + enter
            if (e.keyCode === 13 && !e.shiftKey) {
                textNode.text(textarea.value);
                removeTextarea();
            }
            // on esc do not set value back to node
            if (e.keyCode === 27) {
                removeTextarea();
            }
        });

        textarea.addEventListener('keydown', function (e) {
            scale = textNode.getAbsoluteScale().x;
            setTextareaWidth(textNode.width() * scale);
            textarea.style.height = 'auto';
            textarea.style.height =
                textarea.scrollHeight + textNode.fontSize() + 'px';
        });

        function handleOutsideClick(e) {
            if (e.target !== textarea) {
                textNode.text(textarea.value);
                removeTextarea();
            }
        }
        setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
        });
    });
}

var slmode;

function crtpdf() {
    stdata[currentpage] = stage.toDataURL({ pixelRatio: 2 });
    var pdf = new jsPDF(slmode, 'pt', [twidth, theight]);
    pdf.setTextColor('#000000');

    for (i = 0; i < page.value; i++) {
        
    pdf.addImage(
        stdata[i],
        0,
        0,
        stage.width(),
        stage.height()
        );
        if (page.value-1 > i) {
            pdf.addPage();
        }
    }

    pdf.save('canvas.pdf');

}

function stamps() {
    sideload.hidden = true;
    document.getElementById("drag-drop-area").hidden = true;
    backgroundC = false;
    paintitems.hidden = true;
    document.getElementById("stamps").hidden = false;
}

var selStamp;

var itemURL = '';
document
    .getElementById('stamps')
    .addEventListener('click', function (e) {
        itemURL = e.target.src;
        console.log("dragstart");
    });

    var selectedstamp=false;
function paintstamp() {

    //itemURL = target.src;

    stage.on('click', function (e) {
        
        //stage.setPointersPositions(e);
        if(selectedstamp=true){
        Konva.Image.fromURL(itemURL, function (image) {
            image.name('ez');
            image.position({
                x: stage.getPointerPosition().x - (twidth * currentpage),
                y: stage.getPointerPosition().y 
            });
            image.src = itemURL;
            image.scaleX(0.030);
            image.scaleY(0.030);
            image.setAttr('source', itemURL);
            image.draggable(true);
            layer.add(image);
            stage.add(layer);

        });
        }
      
    });


}

    function deselectstamp(){
     selectedstamp=false;
	}