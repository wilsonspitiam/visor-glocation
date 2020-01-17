import * as map from './map'
import * as mapController from './mapController'

export function init() {
    changeSelect()
    radioChanged()
    radioChangedArea()
    baseMapSelected()
    activeLeftPanel()
    dataSelected()
}

function changeSelect() {
    document.querySelector("#listaMpios").addEventListener("change", (d) =>{
        let value = getValueMpio()
        let checkedRadio = getChecked()
        let checkedRadioArea = getCheckedArea()
        let urlFetch
        let typeArea

        if(checkedRadioArea == "type-layer-area-urbana"){
            typeArea = 'U'
        }
        else if(checkedRadioArea == "type-layer-area-rural"){
            typeArea = 'R'
        }
        if(checkedRadio == "type-layer-manzana"){
            urlFetch = 'data/' + value + '_' + typeArea + 'MANZANA.json'
        }
        else if(checkedRadio == "type-layer-construccion"){
            urlFetch = 'data/' + value + '_' + typeArea + 'CONSTRUCCION.json'
        }
        else if(checkedRadio == "type-layer-terreno"){
            urlFetch = 'data/' + value + '_' + typeArea + 'TERRENO.json'
        }

        fetchPoly(urlFetch);
    })
}

function radioChanged() {
    let elementsArray = document.querySelectorAll('input[name=type-layer]');

    elementsArray.forEach((elem) => {
        elem.addEventListener("change", (d) =>{
            let value = getValueMpio()
            let checkedRadio = getChecked()
            let checkedRadioArea = getCheckedArea()
            let urlFetch
            let typeArea

            if(checkedRadioArea == "type-layer-area-urbana"){
                typeArea = 'U'
            }
            else if(checkedRadioArea == "type-layer-area-rural"){
                typeArea = 'R'
            }
            if(checkedRadio == "type-layer-manzana"){
                urlFetch = 'data/' + value + '_' + typeArea + 'MANZANA.json'
            }
            else if(checkedRadio == "type-layer-construccion"){
                urlFetch = 'data/' + value + '_' + typeArea + 'CONSTRUCCION.json'
            }
            else if(checkedRadio == "type-layer-terreno"){
                urlFetch = 'data/' + value + '_' + typeArea + 'TERRENO.json'
            }
      
            fetchPoly(urlFetch);
        });
    });
}

function radioChangedArea() {
    let elementsArray = document.querySelectorAll('input[name=type-layer-area]');

    elementsArray.forEach((elem) => {
        elem.addEventListener("change", (d) =>{
            let checkedRadioArea = getCheckedArea()
            let typeArea

            if(checkedRadioArea == "type-layer-area-urbana"){
                typeArea = 'U'    
                document.querySelector("#type-layer-manzana").disabled = false            
            }
            else if(checkedRadioArea == "type-layer-area-rural"){
                typeArea = 'R'
                if(document.querySelector("#type-layer-manzana").checked){
                    document.querySelector("#type-layer-manzana").disabled = true
                    document.querySelector("#type-layer-manzana").checked = false
                    document.querySelector("#type-layer-construccion").checked = true
                }
            }


            let value = getValueMpio()
            let checkedRadio = getChecked()
            let urlFetch
            if(checkedRadio == "type-layer-manzana"){
                urlFetch = 'data/' + value + '_' + typeArea + 'MANZANA.json'
            }
            else if(checkedRadio == "type-layer-construccion"){
                urlFetch = 'data/' + value + '_' + typeArea + 'CONSTRUCCION.json'
            }
            else if(checkedRadio == "type-layer-terreno"){
                urlFetch = 'data/' + value + '_' + typeArea + 'TERRENO.json'
            }
      
            fetchPoly(urlFetch);
        });
    });
}

function baseMapSelected(){
    let elementsArray = document.querySelectorAll('input[name=type-base-layer]');

    elementsArray.forEach((elem) => {
        elem.addEventListener("change", (d) =>{
            let elementSelected = getSelectedBase();

            console.log(elementSelected)

            if(elementSelected == "type-google-rm"){
                mapController.loadGoogleRM()
            }
            else if(elementSelected == "type-google-st"){
                mapController.loadGoogleST()
            }
            else if(elementSelected == "type-bing"){
                mapController.loadBing()
            }
            else if(elementSelected == "type-maxar-fb"){
                mapController.loadMaxar()
            }
            else if(elementSelected == "type-osm"){
                mapController.loadOSM()
            }
        })
    })
}

function activeLeftPanel(){    
    document.querySelector(".top-bar__btn").addEventListener("click", (d) =>{
        if(document.querySelector(".left-bar").classList.contains("active")){
            document.querySelector(".left-bar").classList.remove('active')

            document.querySelector(".arrow-left").classList.remove('--active')
            document.querySelector(".arrow-left").classList.add('--inactive')

            document.querySelector(".arrow-right").classList.add('--active')            
            document.querySelector(".arrow-right").classList.remove('--inactive')
        }
        else{
            document.querySelector(".left-bar").classList.add('active')

            document.querySelector(".arrow-right").classList.remove('--active')
            document.querySelector(".arrow-right").classList.add('--inactive')

            document.querySelector(".arrow-left").classList.add('--active')
            document.querySelector(".arrow-left").classList.remove('--inactive')
        }
    })
}

function dataSelected(){
    document.querySelector("#type-data").addEventListener("change", (d) =>{
        if(document.querySelector("#type-data").checked){
            map.getMap().data.setMap(map.getMap())
        }
        else{
            map.getMap().data.setMap(null)
        }
    })
}

function fetchPoly(urlFetch){
    document.querySelector(".loader").className += " active";

    fetch(urlFetch)
        .then((response) => {
            if (response.status !== 200) {
                if(response.status == 404){
                    throw new Error("Archivo no encontrado")
                }
                else{                    
                    throw new Error("Ocurrio un error")
                }
            } else {
                return response.json()
            }            
        })
        .then((myJson) => {
            map.drawPolygon(myJson)
        })
        .catch((err) => {
            alert(err)
            document.querySelector(".loader").className = "loader";
        });
}

function getChecked(){
    let radioButtons = document.getElementsByName("type-layer")
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) return radioButtons[i].id
    }
}

function getCheckedArea(){
    let radioButtons = document.getElementsByName("type-layer-area")
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) return radioButtons[i].id
    }
}

function getSelectedBase(){
    let radioButtons = document.getElementsByName("type-base-layer")
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) return radioButtons[i].id
    }
}

function getValueMpio(){
    let elementsArray = document.querySelectorAll("#listaMpios option")
    for (let i = 0; i < elementsArray.length; i++) {
        if (elementsArray[i].selected) return elementsArray[i].value
    }
}
