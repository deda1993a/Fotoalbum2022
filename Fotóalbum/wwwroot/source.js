var width = 18;
var height = 18;
var available = 0;
var allpage;
var tempstage;
var twidth;
var theight;
var mmtopx = 3.7795275591;
var displayed = true;
var image2;
var tr;
var tr2;
var textNode;
var seltext;
var txSize;
var moreimage = false;
var drawimg;
var background;
var created = false;

var imagesel;


let str = [];
var backgroundC=false;

var mode = 0;

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

/*var image1 = new Image();
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
  //image1.cache();
  image1.filters([Konva.Filters.Blur, Konva.Filters.Brighten, Konva.Filters.Enhance, Grscale]),
  layer.add(img1);
};
image1.src = 'background1.jpg';*/


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

document
    .getElementById('frame')
    .addEventListener('dragstart', function (e) {
        itemURL = e.target.src;
    });

var Grscale = function (imageData) {
    var nPixels = imageData.data.length;
    if (grscale == true)
        for (var i = 0; i < nPixels; i += 4) {
            brightness = 0.34 * imageData.data[i] + 0.5 * imageData.data[i + 1] + 0.16 * imageData.data[i + 2];
            imageData.data[i] = brightness;
            imageData.data[i + 1] = brightness;
            imageData.data[i + 2] = brightness;
        }
};

var con = stage.container();
con.addEventListener('dragover', function (e) {
    e.preventDefault(); 
    //console.log(con);
});

var grscale = false;
con.addEventListener('drop', function (e) {
    e.preventDefault();






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
            if (image.width() > 1100) {
                image.scaleX(0.2);
                image.scaleY(0.2);
            }
            image.setAttr('source', itemURL);
            image.draggable(true);
            console.log(image);
            console.log(layer);
            image.cache();
            image.filters([Konva.Filters.Brighten, Konva.Filters.Enhance, Grscale]);
            if (moreimage == false) {
                imagesel = image;
                moreimage = true;
            }



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
                
                imagesel.filters([Konva.Filters.Brighten, Konva.Filters.Enhance, Grscale]);
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
            image.src = itemURL;
            //image.position(stage.getPointerPosition());
            image.position({
                x: layer.offsetX(),
                y: 0
            });
            image.width(stage.width());
            image.height(stage.height());
            image.fillPatternOffsetX(0);
            image.cache();
            background = image;
            image.filters([Konva.Filters.Brighten, Konva.Filters.Enhance, Grscale]);
            


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

                imagesel.filters([Konva.Filters.Brighten, Konva.Filters.Enhance, Grscale]);
                layer.draw();
                imagesel.setAttr('grscale', grscale);
                // grscale = false;
            };
            console.log("megy");
            layer.add(image);
            stage.add(layer);
            image.moveToBottom();
            image.moveUp();
        });
        /*for(i=0;i<allpage;i++){
         background = new Konva.Rect({
            
            x: layer.offsetX(),
            y: 0,
            width: stage.width(),
            height: stage.height(),
            fillPatternImage: image2,
            fillPatternOffset: { x: -220, y: 70 },
            // remove background from hit graph for better perf
            // because we don't need any events on the background
            listening: false,
        });
        }*/
       
    }
});


var rect1 = new Konva.Rect({
    x: 60,
    y: -100,
    width: 100,
    height: 90,
    fill: 'red',
    name: 'rect',
    draggable: true,
});
layer.add(rect1);

 stgevents();


stage.on('click', function (evt) {
   
    imagesel = evt.target;
    seltext = evt.target;

});





function klikk(){
  

  
}

function select() {
    sideload.hidden = false;
    document.getElementById("drag-drop-area").hidden = true;
    paintitems.hidden = true;
    document.getElementById("filters").hidden = true;
    document.getElementById("stamps").hidden = true;
    frame.hidden = true;
    backgroundC = false;
}

function upload() {
    sideload.hidden = true;
    document.getElementById("drag-drop-area").hidden = false;
    paintitems.hidden = true;
    document.getElementById("filters").hidden =idden = true;
    document.getElementById("stamps").hidden = true;
    frame.hidden = true;
}

function deleteI (){
    imagesel.remove();
    tr.nodes([]);
}

function backG() {
    sideload.hidden = false;
    document.getElementById("drag-drop-area").hidden = true;
    paintitems.hidden = true;
    document.getElementById("filters").hidden = true;
    document.getElementById("stamps").hidden = true;
    frame.hidden = true;
    backgroundC = true;
}

function painttool() {
    sideload.hidden = true;
    document.getElementById("drag-drop-area").hidden = true;
    paintitems.hidden = false;
    document.getElementById("filters").hidden = true;
    document.getElementById("stamps").hidden = true;
    frame.hidden = true;
}

function filters() {
    sideload.hidden = true;
    document.getElementById("drag-drop-area").hidden = true;
    paintitems.hidden = true;
    document.getElementById("filters").hidden = false;
    document.getElementById("stamps").hidden = true;
    frame.hidden = true;

}

var drw;
var imagedraw = [];
function painter() {


    var canvas = document.createElement('canvas');
    canvas.width = stage.width();
    canvas.height = stage.height();

  
     imagedraw[currentpage] = new Konva.Image({
        image: canvas,
        name: currentpage,
        x: 0 - (twidth * currentpage),
        y: 0,
    });
    console.log("x: " + imagedraw[currentpage]);
    drw = imagedraw[currentpage];
    drawimg = imagedraw[currentpage];
    layer.add(imagedraw[currentpage]);


    var context = canvas.getContext('2d');
    context.strokeStyle = colourselect.value;
   
    context.lineJoin = 'round';
    context.lineWidth = strokewidth.value;

    document.getElementById('colourselect')
        .addEventListener('change', function (e) {
            context.strokeStyle = colourselect.value;
        });

    document.getElementById('strokewidth')
        .addEventListener('change', function (e) {
            context.lineWidth = strokewidth.value;
        });

    var isPaint = false;
    var lastPointerPosition;
    var mode = 'brush';


    imagedraw[currentpage].on('mousedown touchstart', function () {
        isPaint = true;
        lastPointerPosition = stage.getPointerPosition();
    });



    stage.on('mouseup touchend', function () {
        isPaint = false;
    });


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
            x: (lastPointerPosition.x- (twidth * currentpage)) - imagedraw[currentpage].x(),
            y: lastPointerPosition.y - imagedraw[currentpage].y(),
        };
        context.moveTo(localPos.x, localPos.y);
        var pos = stage.getPointerPosition();
        localPos = {
            x: (pos.x- (twidth * currentpage)) - imagedraw[currentpage].x(),
            y: pos.y - imagedraw[currentpage].y(),
        };
        context.lineTo(localPos.x, localPos.y);
        context.closePath();
        context.stroke();

        lastPointerPosition = pos;
     
        layer.batchDraw();
    });

    var select = document.getElementById('tool');
    select.addEventListener('change', function () {
        mode = select.value;
    });
}

function depainter() {
    drw.moveToBottom();
    stage.off();
    stgevents();

    stage.on('click', function (evt) {
     
        imagesel = evt.target;
        seltext = evt.target;

    });
    
}

let json = [];
let stdata = [];
function createalbum() {
    allpage = parseInt(page.value);
    if (size.value == 1) {
        twidth = 793.70;
        theight = 1122.52;
        slmode = 'p';
    } else if (size.value == 2) {
        twidth = 1122.52;
        theight = 793.70;
        slmode = 'l';
    } else if (size.value == 3) {
        twidth = 1133.86;
        theight = 1133.86;
        console.log(twidth);
        slmode = 'p';
    } else if (size.value == 4) {
        twidth = 755.91;
        theight = 1133.86;
        console.log(twidth);
        slmode = 'p';
    } else if (size.value == 5) {
        twidth = 755.91;
        theight = 755.91;
        console.log(twidth);
        slmode = 'p';
    } else if (size.value == 6) {
        twidth = 1133.86;
        theight = 755.91;
        console.log(twidth);
        slmode = 'l';
    } else if(size.value == 7) {
        twidth = 1511.81;
        theight = 1133.86;
        console.log(twidth);
        slmode = 'l';
    } else if (size.value == 8) {
        twidth = 559.37;
        theight = 793.70;
        console.log(twidth);
        slmode = 'p';
    } else if (size.value == 9) {
        twidth = 793.70;
        theight = 559.37;
        console.log(twidth);
        slmode = 'l';
    }

    document.getElementById("container").style.width = twidth+"px";
    document.getElementById("container").style.height = theight+"px";
    document.getElementById("container").style.borderStyle = "solid";
    con = stage.container();
    stage.width(twidth);
    stage.height(theight);
    //document.querySelector('container').clientHeight = theight + "px";
    //document.querySelector('container').clientWidth = twidth + "px";

    for (i = 0; i < allpage; i++) {
        tempstage = stage.toDataURL({ pixelRatio: 2 });
        stdata[i] = stage.toDataURL({ pixelRatio: 2 });
    }

    currentpage = 0;
    document.getElementById('felirat').innerHTML = currentpage + 1 + "-" + allpage;
}

function next() {

    if (currentpage < allpage - 1) {
        if (imagedraw[currentpage] != null) {
            imagedraw[currentpage].moveToTop();
        }
        stdata[currentpage] = stage.toDataURL({ pixelRatio: 2 });
        layer.offsetX(layer.offsetX() - twidth);
        currentpage++;
        document.getElementById('felirat').innerHTML = currentpage + 1 + "-" + allpage;
    }
}

    function previous()
    {
        if (imagedraw[currentpage] != null) {
            imagedraw[currentpage].moveToTop();
        }
        if (currentpage > 0) {
            stdata[currentpage] = stage.toDataURL({ pixelRatio: 2 });
            layer.offsetX(layer.offsetX() + twidth);
            currentpage--;
            document.getElementById('felirat').innerHTML = currentpage + 1 + "-" + allpage;
        }
}

function addpage() {
    for (i = allpage - 1; i < allpage + 2; i++) {

        stdata[i] = tempstage;
    }
    allpage += 2;
    console.log(allpage);
    document.getElementById('felirat').innerHTML = currentpage + 1 + "-" + allpage;
 }
    
function draw() {

}

function stgevents() {
    tr = new Konva.Transformer();
    layer.add(tr);


    tr.nodes([]);



    var selectionRectangle = new Konva.Rect({
        fill: 'rgba(0,0,255,0.5)',
        visible: false,
    });
    layer.add(selectionRectangle);

    var x1, y1, x2, y2;
    stage.on('mousedown touchstart', (e) => {
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
   
        if (!selectionRectangle.visible()) {
            return;
        }
        e.evt.preventDefault();

        setTimeout(() => {
            selectionRectangle.visible(false);
        });

        var shapes = stage.find('Image');
        var box = selectionRectangle.getClientRect();
        var selected = shapes.filter((shape) =>
            Konva.Util.haveIntersection(box, shape.getClientRect())
        );
        tr.nodes(selected);
    });


    stage.on('click tap', function (e) {
  
        if (selectionRectangle.visible()) {
            return;
        }


        console.log(e.target.name());
  
        if (e.target === stage || imagesel.hasName('back')===true) {
            tr.nodes([]);
            //tr2.nodes([]);
            return;
        }


        
        if (!e.target.hasName('ez')) {
            
            return;
        }


   
        const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
        const isSelected = tr.nodes().indexOf(e.target) >= 0;

        if (!metaPressed && !isSelected) {

            tr.nodes([e.target]);
            tr.nodes([e.target]);
        } else if (metaPressed && isSelected) {
          
            const nodes = tr.nodes().slice(); 
            nodes.splice(nodes.indexOf(e.target), 1);
            tr.nodes(nodes);
        } else if (metaPressed && !isSelected) {
          
            const nodes = tr.nodes().concat([e.target]);
            tr.nodes(nodes);
        }
    });

    stage.on('mousemove', function (e) {
        
        //var pos = group.getRelativePointerPosition()
        // console.log(stage.getPointerPosition());
        //console.log("stage width: " + stage.width() + " stage height: " + stage.height());
    });


}

function addtext() {
    
     textNode = new Konva.Text({
        text: tx.value,
        name: 'ez2',
         x: 50 - (twidth * currentpage),
        y: 80,
         fontFamily: fonttype.value,
         fontStyle: fontstyle.value,
        fontSize: fontsize.value,
        draggable: true,
        fill: fontcolour.value,
        width: 200,
    });

    layer.add(textNode);

     tr2 = new Konva.Transformer({
        node: textNode,
        enabledAnchors: ['middle-left', 'middle-right'],
    
        boundBoxFunc: function (oldBox, newBox) {
            newBox.width = Math.max(30, newBox.width);
            return newBox;
        },
    });
   
        //tr2.nodes([]);
    
    textNode.on('transform', function () {
        
        textNode.setAttrs({
            width: textNode.width() * textNode.scaleX(),
            scaleX: 1,
        });
    });



    layer.add(tr2);

    stage.on('click', function (e) {
        if (seltext.hasName('ez2')===true) {
            //tr2.hide();

            tr2.nodes([seltext]);
            console.log(e.target);
            console.log("textNode.fontSize: " + textNode.fontSize);
            fontsize.value = seltext.fontSize();
            fttype.value =seltext.fontFamily();
            ftcolor.value=seltext.fill();
            tx.value = seltext.text();
            ftstyle.value=seltext.fontStyle();
            textNode = seltext;
            //return;
        } else {
            tr2.nodes([]);
        }
           // tr2.nodes([e.target]);
           // console.log(e.target);
        
        
       
    });

    document
        .getElementById('addtext')
        .addEventListener('mouseenter', function (e) {
            tr2.nodes([]);
        });

    textNode.on('click', () => {
        //if (seltext.hasName('ez2') == true) { 
        
    //}
    });

    textNode.on('dblclick dbltap', () => {
     
        this.textNode.hide();
        tr2.hide();
        fontsize.value = textNode.fontSize();
 

 
        var textPosition = textNode.absolutePosition();

      
        var areaPosition = {
            x: stage.container().offsetLeft + textPosition.x,
            y: stage.container().offsetTop + textPosition.y,
        };

 
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

    
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

        var isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
            px += 2 + Math.round(textNode.fontSize() / 20);
        }
        transform += 'translateY(-' + px + 'px)';

        textarea.style.transform = transform;

       
        textarea.style.height = 'auto';
       
        textarea.style.height = textarea.scrollHeight + 3 + 'px';

        textarea.focus();

        function removeTextarea() {
            textarea.parentNode.removeChild(textarea);
            window.removeEventListener('click', handleOutsideClick);
            textNode.show();
            tr2.show();
            tr2.forceUpdate();
        }

        function setTextareaWidth(newWidth) {
            if (!newWidth) {
              
                newWidth = textNode.placeholder.length * textNode.fontSize();
            }
            
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
  
            if (e.keyCode === 13 && !e.shiftKey) {
                textNode.text(textarea.value);
                removeTextarea();
            }
           
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
    if (imagedraw[currentpage] != null) {
        imagedraw[currentpage].moveToTop();
    }
    stdata[currentpage] = stage.toDataURL({ pixelRatio: 2 });
    var pdf = new jsPDF(slmode, 'pt', [twidth / (4 / 3), theight / (4 / 3)]);

    for (i = 0; i < allpage; i++) {
        
    pdf.addImage(
        stdata[i],
        0,
        0,
        twidth/(4/3),
        theight/(4/3)
        );
        if (allpage - 1 > i) {
            pdf.addPage();
        }
    }

    pdf.save('album.pdf');

}

function stamps() {
    sideload.hidden = true;
    document.getElementById("drag-drop-area").hidden = true;
    paintitems.hidden = true;
    document.getElementById("filters").hidden = true;
    document.getElementById("stamps").hidden = false;
    frame.hidden = true;
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
            image.name('ez3');
            image.position({
                x: stage.getPointerPosition().x - (twidth * currentpage),
                y: stage.getPointerPosition().y 
            });
            image.src = itemURL;
            image.scaleX(0.030);
            image.scaleY(0.030);
            image.setAttr('source', itemURL);
            image.draggable(false);
            layer.add(image);
            stage.add(layer);

        });
        }
      
    });


}

    function deselectstamp(){
        selectedstamp = false;

        stage.off();
        stgevents();

        stage.on('click', function (evt) {
        
            imagesel = evt.target;
            seltext = evt.target;
            // drawimg = evt.target;
        });
	}

    function backgroundfilter(){
      imagesel=background;
      console.log(imagesel);
      //background.fillPatternImage(image1);
	}




                function hide() {
                    if (displayed == true) {
                        document.getElementById("side").style.display = "none";
                        displayed = false;
                    } else {
                        document.getElementById("side").style.display = "flex";
                        displayed = true;
                    }
}

                function framing() {
                    sideload.hidden = true;
                    document.getElementById("drag-drop-area").hidden = true;
                    paintitems.hidden = true;
                    document.getElementById("filters").hidden = true;
                    document.getElementById("stamps").hidden = true;
                    frame.hidden = false;
}





var ftcolor = document.getElementById("fontcolour");
var fttype = document.getElementById("fonttype");
var ftstyle = document.getElementById("fontstyle");


function modtext() {
    textNode.fontFamily(fttype.value);
    textNode.fontSize(fontsize.value);
    textNode.fill(ftcolor.value);
    textNode.text(tx.value);
    textNode.fontStyle(ftstyle.value);
}

function deletext() {
    textNode.remove();
    
}

function topdrawing() {

    imagedraw[currentpage].moveToTop();
}

function dltbackground() {
    if (imagesel.hasName('back') == true) {
        imagesel.remove();
    }
}

function deselectF() {
    tr.nodes([]);
    tr2.nodes([]);
}

function slctUp() {
    imagesel.moveToTop();
}


