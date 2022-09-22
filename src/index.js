//import "./styles.css";

const alueTable = document.getElementById("alue");
const getAlueButton = document.getElementById("getAlueet");

getAlueButton.addEventListener("click", getAlueData);

async function getAlueData() {
  
  const url = "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff"
  const aluePromise = await fetch(url)
  const alueJSON = await aluePromise.json()
  let ID = 0;

  const tyoUrl = "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065"
  const tyoPromise = await fetch(tyoUrl)
  const tyoJSON = await tyoPromise.json()
  

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

    console.log(tr)
    
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
  

  /*alueJSON.forEach((alue) => {

    console.log(alue)
    let tr = document.createElement("tr")
    let td1 = document.createElement("td")
    let td2 = document.createElement("td")

    console.log(td1)





    td1.innerText = alue.dataset.dimension.Alue.category.label
    //td2.innerText = dataset.value
    tr.appendChild(td1)
    //tr.appendChild(td2)

    alueTable.appendChild(tr)
})*/
}
