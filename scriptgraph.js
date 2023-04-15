const sizew = 600;

function gerarGraficos() {
   var dataoriginal = [
      {
         z: laplacian(lastV),
         type: "surface",
         contours: {
            z: {
               show: true,
               usecolormap: true,
               highlightcolor: "#42f462",
               project: { z: true },
            },
         },
      },
   ];
   var data = [
      {
         z: laplacian(lastU),
         type: "surface",
         contours: {
            z: {
               show: true,
               usecolormap: true,
               highlightcolor: "#42f462",
               project: { z: true },
            },
         },
      },
   ];

   var datacolor = [
      {
         z: dataccolor,
         type: "surface",
         contours: {
            z: {
               show: true,
               usecolormap: true,
               highlightcolor: "#42f462",
               project: { z: true },
            },
         },
      },
   ]

   var layoutOriginal = {
      title: "Dv",
      autosize: false,
      width: sizew,
      height: sizew,
      margin: {
         l: 65,
         r: 50,
         b: 65,
         t: 90,
      },
   };

   var layout = {
      title: "Du",
      autosize: false,
      width: sizew,
      height: sizew,
      margin: {
         l: 65,
         r: 50,
         b: 65,
         t: 90,
      },
   };

   var layoutColor = {
      title: "color",
      autosize: false,
      width: sizew,
      height: sizew,
      margin: {
         l: 65,
         r: 50,
         b: 65,
         t: 90,
      },
   };

   Plotly.newPlot("original", dataoriginal, layoutOriginal);
   Plotly.newPlot("laplaciano", data, layout);
   Plotly.newPlot("color", datacolor, layoutColor);


   
}
