var RecDiff = document.getElementById("RecDiff");
var ctx = RecDiff.getContext("2d");

// Definindo as constantes
const Du = 0.25;
const Dv = 0.36;
const f = 0.082;
const k = 0.061;
let dt = 1;

// Definindo as dimensões do grid
const gridSize = 250;

var image;
const n = gridSize;
const m = gridSize;

const nsteps = 1;

// Inicializando as matrizes u e v
let u = new Array(n).fill(1).map(() => new Array(m).fill(1));
let v = new Array(n).fill(0).map(() => new Array(m).fill(0.1));

let dataccolor = new Array(n).fill(0).map(() => new Array(m).fill(0));


function gerarRandom(arr=v, quantidade, value=0.7 ){
   for (let i = 0; i < quantidade; i++) {
      const randx = ~~(Math.random() * gridSize);
      const randy = ~~(Math.random() * gridSize);
      arr[randx][randy] = value;
   }

}
gerarRandom(v, 10)

function laplacian(matrix, nn = n, mm = m) {
   let lap = new Array(nn).fill(0).map(() => new Array(mm).fill(0));
   const supressor = 1;
   let soma = 0;
   for (let i = 1; i < nn - 1; i++) {
      for (let j = 1; j < mm - 1; j++) {
         soma =
            matrix[i + 1][j] +
            matrix[i - 1][j] +
            matrix[i][j + 1] +
            matrix[i][j - 1] -
            4 * matrix[i][j];

         lap[i][j] = soma === 0 ? 0 :   soma;
      }
   }

   return lap;
}

var imgData = ctx.createImageData(n, m);

let lastU = u;
let lastV = v;

function constrain(value, min, max) {
   return (Math.min(max, Math.max(min, value)));
 }

function drawit(imgData, substancia, substancia2) {
   var i;
   // console.log(imgData.data.length, n);
   // simulando a reação entre elas
   for (let step = 0; step < nsteps; step++) {
      const novovU = laplacian(substancia)
      const novovV = laplacian(substancia2)
      
      for (let i = 0; i < n; i++) {
         for (let j = 0; j < m; j++) {
            // Change f and k depending on position in grid
            var f0 = f //* (i/gridSize*0.1+0.4)
            var k0 = k //* (i/gridSize*0.04+0.96);
            var oldU = lastU[i][j]
            var oldV = lastV[i][j]

            const Reacao = oldU * Math.pow(oldV, 2)

            // console.log(Reacao)

            const novou = oldU + (Du * novovU[i][j] - Reacao + f0 * (1 - oldU)) * dt
            const novov = oldV + (Dv * novovV[i][j] + Reacao - ( k0 + f0 ) * oldV) * dt

            lastU[i][j] = constrain(novou, 0, 1)
            lastV[i][j] = constrain(novov, 0, 1)
       
         }
      }
   }

   for (i = 0; i < imgData.data.length; i += 4) {
      const index = i / 4;
      const fnpowU = (index) => lastU[~~(index / gridSize)][index % gridSize];
      const fnpowV = (index) => lastV[~~(index / gridSize)][index % gridSize];
      const pou = fnpowU(index);
      const pov = fnpowV(index);

      
      // o problema aqui é o seguinte
      // quando pov for maior que pou deve mostrar a cor de pov
      // o de cima vale a mesma coisa
      // caso o resultado for zera que são as beradas da reação deve mostrar o fundo
      let sub1color = 0
      let sub2color = 0
      if(pov > pou){
         sub1color = ~~(pov * 255)
      }
      if(pou > pov){
         sub2color = ~~(pou * 255)
      }
      // console.log(sub1color, sub2color)
      // var d = ~~(((pov - pou) + 1) * 127.5)
      imgData.data[i + 0] = sub1color;
      imgData.data[i + 1] = sub2color;
      imgData.data[i + 2] = 0;
      imgData.data[i + 3] = 255;

      dataccolor[~~(index / gridSize)][index % gridSize] = sub1color - sub2color
      
   }
   ctx.putImageData(imgData, 0, 0);
}

const fps = 24;
const stopon = 126;
let frame = 0;
function loop() {
   // if(frame % 24 === 0){
   //    gerarRandom(lastV, 10, 30)   
   //    console.log("gerarRandom(10)")
   // }

   drawit(imgData, lastU, lastV);
   frame++;
   
   document.querySelector("#frame").innerText = `Frame: ${frame}`
   // setTimeout(() => {
   //    if (frame < stopon) {
   //       requestAnimationFrame(loop);
   //       // frame++;
   //    }
   // }, 1000 / fps);
}

loop();

const nextFrame = () => loop();
