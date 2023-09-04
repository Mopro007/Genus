//the tyrping effect for the introduction:
var intro = 'Input the genetic sequence below and get the amino acids that make it up.Example: TACAAAGGCTAACGTCCTAGAGCTATT';
var introElement = document.getElementById("introduction")
typeEffect(introElement,intro);

//the "analyze" button:
const analyze_btn = document.getElementById("Analyze")
analyze_btn.addEventListener("click",analyze)

function analyze() {
  const sequenceElement = document.getElementById("sequence");
  const sequence = sequenceElement.value;
  if(sequence === ''){
    document.getElementById("Analysis").textContent = "Invalid Input";
  }
  else{
    fetch("/analyze", {method: "POST",body: JSON.stringify({ sequence: sequence }),headers: {"Content-Type": "application/json"}})
      .then(response => response.text())
      .then(data => {
        const analysisElement = document.getElementById("Analysis");
        analysisElement.innerHTML = "";
  
        const aminoAcids = JSON.parse(data)
        const acidsList = aminoAcids["aminoAcids"];
        acidsList.pop();
        for(i=0;i<acidsList.length;i++){
          analysisElement.textContent += String(acidsList[i].name) + " ";
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
}

function typeEffect(element, text) {
  let index = 0;

  const typing = setInterval(() => {
    if (index >= text.length) {
      clearInterval(typing);
    } else {
      element.innerHTML += text.charAt(index);
      if(text.charAt(index) === "."){element.innerHTML += "<br/>";}
      index++;
    }
  }, 20);
}
