const intentos = 5;

let contador = 0;

document.getElementById("ddlAFPs").onchange = function() {

    let seleccionado = this.value;

    let porcentaje = 0;

    switch(seleccionado){
        case "1":
        porcentaje = 1.44; 
        break;
        case "2":
        porcentaje = 1.44; 
        break;
        case "3":
        porcentaje = 1.27; 
        break;
        case "4":
        porcentaje = 0.58; 
        break;
        case "5":
        porcentaje = 1.16; 
        break;
        case "6":
        porcentaje = 1.45; 
        break;
        case "7":
        porcentaje = 0.69; 
        break;
        default:
        porcentaje=0;
        break
    }

    document.getElementById("txtPorcentajeComision").textContent  = porcentaje + "%";

};


document.getElementById("ddlAPV").onchange = function() {

    let seleccionado = this.value;


    var div_apv = document.getElementById("txtMontoAPV");

    if(seleccionado=="1"){

        div_apv.disabled=false;

        
    }
    else
    {
        document.getElementById("txtMontoAPV").value = 0;
        div_apv.disabled=true;


    }

};

function calcularHaberes(){

    let sueldo_base = parseInt(document.getElementById("txtSueldoBase").value);


    if(isNaN(sueldo_base)){
        sueldo_base = 0;
    }

    let gratificacion = parseInt(document.getElementById("txtGratificacion").value);

    if(isNaN(gratificacion)){
        gratificacion = 0;
    }
    
    let colacion = parseInt(document.getElementById("txtColacion").value);  

    if(isNaN(colacion)){
        colacion = 0;
    }

    let comisiones = parseInt(document.getElementById("txtComisiones").value);  

    if(isNaN(comisiones)){
        comisiones = 0;
    }

    let teletrabajo = parseInt(document.getElementById("txtTeletrabajo").value); 

    if(isNaN(teletrabajo)){
        teletrabajo = 0;
    }

    let movilizacion = parseInt(document.getElementById("txtMovilizacion").value); 

    if(isNaN(movilizacion)){
        movilizacion = 0;
    }

    let bonos = parseInt(document.getElementById("txtBonos").value); 
    
    if(isNaN(bonos)){
        bonos = 0;
    }

    let horas_extras = parseInt(document.getElementById("txtHorasExtras").value);  

    if(isNaN(horas_extras)){
        horas_extras = 0;
    }

    let aguinaldo = parseInt(document.getElementById("txtAguinaldo").value); 

    if(isNaN(aguinaldo)){
        aguinaldo = 0;
    }
    
    let suma = sueldo_base+gratificacion+colacion+comisiones+teletrabajo+movilizacion+bonos+horas_extras+aguinaldo;

    document.getElementById("txtTotalHaberes").value  = suma;

}

function calcularLiquido(){

    if(contador<=intentos){

        contador++;

        let total_haberes =  parseInt(document.getElementById("txtTotalHaberes").value);

        let comision_afp = parseFloat(document.getElementById("txtPorcentajeComision").textContent.replace("%",""));

        comision_afp = (total_haberes * comision_afp) / 100; 

        document.getElementById("txtComisionAfp").value  = parseInt(comision_afp);

        let afp = 10;

        afp = (total_haberes * afp) / 100; 

        document.getElementById("txtAFP").value  = parseInt(afp);

        let comision_salud = 0.55;

        comision_salud = (total_haberes * comision_salud) / 100; 

        document.getElementById("txtComisionSalud").value  = parseInt(comision_salud);

        let salud = 7;

        salud = (total_haberes * salud) / 100; 

        document.getElementById("txtSalud").value  = salud;

        let impuesto_renta = 4;

        if(total_haberes>=622849){

            impuesto_renta = (total_haberes * impuesto_renta) / 100; 

            document.getElementById("txtImpuesto").value  = parseInt(impuesto_renta);
        }

        let seguro_cesantia = 0.6;

        seguro_cesantia = (total_haberes * seguro_cesantia) / 100; 

        document.getElementById("txtSeguroCesantia").value  = parseInt(seguro_cesantia);

        let apv = 0;

        if(document.getElementById("ddlAPV").value == 1){

            apv = parseInt(document.getElementById("txtMontoAPV").value);
        }

        let total_descuentos = comision_afp + afp + comision_salud + salud + impuesto_renta + seguro_cesantia + apv;

        document.getElementById("txtTotalDescuentos").value = parseInt(total_descuentos);

        document.getElementById("txtLiquido").value = total_haberes - parseInt(total_descuentos);

        console.log(contador);

        
    }

    while(contador==5){
        esperar();
    }



}

function esperar() {

    contador = 0;
    const botonCalcular = document.getElementById('btnCalcular');
    botonCalcular.disabled = true;
    botonCalcular.style.opacity = 0.7;
    botonCalcular.value = 'Debe esperar un momento...';
 
    
    setTimeout(function() {
       
        botonCalcular.value = 'Calcular';
        botonCalcular.style.opacity = 1;
        botonCalcular.disabled = false;
    }, 5000);
}
