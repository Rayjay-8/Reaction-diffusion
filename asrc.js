

var RecDiff = document.getElementById("RecDiff");
var ctx = RecDiff.getContext("2d");

const size = 200;

// o valor deve variar de -1 a 1

const data = new Array(size).fill(0).map((e, index) => new Array(size).fill( (index / (size) ) * 2 - 1));



// ctx.fillStyle = "red";
// ctx.fillRect(0, 0, size+20, size+20)

var imgData = ctx.createImageData(size, size);

for (let i = 0; i < imgData.data.length; i += 4) {
   const index = i / 4;
   const fnpowU = (index) => data[~~(index / size)][index % size];

   const pou = fnpowU(index);
 
   var d = ~~((pou + 1) * 127.5)
   
   imgData.data[i + 0] = 0;
   imgData.data[i + 1] = 0;
   imgData.data[i + 2] = 0;
   imgData.data[i + 3] = 255;
}

ctx.putImageData(imgData, 0, 0);

console.log(data)