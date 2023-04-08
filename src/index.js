import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import $ from "jquery";

async function fetchCssContent() {
  $.get("./one.css", function (cssContent) {
    const styleElement = document.createElement("style");
    styleElement.textContent = cssContent;
    document.body.appendChild(styleElement);
  });
}

async function fetchHTMLContent() {
  $.get("./one.html", function (htmlContent) {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(htmlContent, "text/html");

    const targetEle = htmlDoc.body.innerHTML;
    document.getElementById("parent").innerHTML = targetEle;
  });
}

fetchHTMLContent();
fetchCssContent();

document.getElementById("download").onclick = () => {
  html2canvas(document.getElementById("parent")).then(function (canvas) {
    let docWidth = document.getElementById("parent").offsetWidth;
    let docHeight = document.getElementById("parent").offsetHeight;

    const contentDataURL = canvas.toDataURL("image/png");
    let orientation; 
    if(docWidth > window.innerWidth * 2 || docHeight > window.innerHeight * 2) {
      orientation = "p" // portrait mode
    } else {
      orientation = "l" // landscape mode
    }

    console.log("orientation being used is:", orientation,);
    console.log("docWidth, docHeight", docWidth, docHeight);
    console.log("window width height :",window.innerWidth ,window.innerHeight );

    let pdf = new jsPDF({
      orientation,
      unit: "px",
      format: [docWidth, docHeight],
      userUnit: 10
    });

    //  var pdf = new jsPDF('p', 'px', [w, h]);
    //var pdf = new jsPDF();
    var pdfWidth = pdf.internal.pageSize.getWidth();
    var pdfHeight = pdf.internal.pageSize.getHeight();

    console.log("width", docWidth, docHeight, pdfWidth, pdfHeight);
    // pdf.addImage(contentDataURL, "PNG", 0, 0, h, w);
    pdf.addImage(contentDataURL, "png", 0, 0, pdfWidth,pdfHeight);
    pdf.save("new-file.pdf");
  });
};
