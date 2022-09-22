//import "./styles.css";

//const alueTable = document.getElementById("alue");

//let divider = document.createElement("div");
//divider.className = "center";


let alueTable = document.createElement("table");
alueTable.id = "alue";
//divider.innerHTML = alueTable;

//let header1 = document.createElement("h1");
//alueTable.innerHTML = header1

//let thead1 = document.createElement("thead");
//header1.innerHTML = thead1;

document.body.appendChild(alueTable);

let getAlueButton = document.createElement("button");
getAlueButton.innerHTML = "Get areas";
document.body.appendChild(getAlueButton);

getAlueButton.addEventListener("click", getAlueData);

let thead = document.createElement("thead")
let th1 = document.createElement("th");
let th2 = document.createElement("th");
let th3 = document.createElement("th");
let th4 = document.createElement("th");

th1.innerText = 'Municipality';
th2.innerText = 'Population';
th3.innerText = 'Employment';
th4.innerText = 'Employment-%';

thead.appendChild(th1);
thead.appendChild(th2);
thead.appendChild(th3);
thead.appendChild(th4);

alueTable.appendChild(thead);

async function getAlueData() {
  
  const url = "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff"
  const aluePromise = await fetch(url)
  const alueJSON = await aluePromise.json()
  let ID = 0;

  const tyoUrl = "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065"
  const tyoPromise = await fetch(tyoUrl)
  const tyoJSON = await tyoPromise.json()

  /*let thead = document.createElement("thead")
  let th1 = document.createElement("th");
  let th2 = document.createElement("th");
  let th3 = document.createElement("th");
  let th4 = document.createElement("th");
  
  th1.innerText = 'Municipality';
  th2.innerText = 'Population';
  th3.innerText = 'Employment';
  th4.innerText = 'Employment-%';

  thead.appendChild(th1);
  thead.appendChild(th2);
  thead.appendChild(th3);
  thead.appendChild(th4);

  alueTable.appendChild(thead);*/

  Object.keys(alueJSON.dataset.dimension.Alue.category.label).forEach(key => {
    let tr = document.createElement("tr")
    

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    td1.innerText = alueJSON.dataset.dimension.Alue.category.label[key];
    td1.id = 'alue'+ID;
    td2.id = 'vaki'+ID;
    td3.id = 'tyo'+ID;
    td4.id = 'tyo%'+ID;
    tr.id = 'rivi'+ID;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    alueTable.appendChild(tr);
    ID = ID+1;
  });

  ID = 0;
  Object.keys(alueJSON.dataset.value).forEach(key => {
    let td2 = document.getElementById('vaki'+ID)
    td2.innerText = alueJSON.dataset.value[key];


    ID = ID+1;
  });



  ID = 0;
  Object.keys(tyoJSON.dataset.value).forEach(key => {
    let tr = document.getElementById('rivi'+ID)
    let td1 = document.getElementById('alue'+ID)
    let td2 = document.getElementById('vaki'+ID)
    let td3 = document.getElementById('tyo'+ID)
    let td4 = document.getElementById('tyo%'+ID)
 
    tyoValue = tyoJSON.dataset.value[key]
    td3.innerText = tyoValue;
    tyoRatio = (tyoValue/parseInt(td2.innerHTML)*100).toFixed(2);
    td4.innerText = tyoRatio+'%';
    
    if(tyoRatio < 25){
      td1.className = 'huono'
      td2.className = 'huono'
      td3.className = 'huono'
      td4.className = 'huono'
      
    }

    if(tyoRatio > 45){
      td1.className = 'hyva'
      td2.className = 'hyva'
      td3.className = 'hyva'
      td4.className = 'hyva'
    }





    ID = ID+1;
  }); 
}


/*<!--<div class="center">
<table id="alue">
  <h1>
    <thead>
    </thead>
  </h1>
<tbody class="body">
  <tr></tr>
</tbody>
</table>
</div>-->*/