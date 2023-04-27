const steamres = document.getElementById("Steam");
let selectact = document.getElementById("act_today");
const dateact = document.getElementById("date_activity");
let gymops = document.getElementById("gymops");
let ex_list_display = document.getElementById("listexercise");
let ex_list_display_saved = document.getElementById("listexercisefromdate");
let chosen_date = document.getElementById("date_chosen");
let day = JSON.parse(localStorage.getItem('day'));
if (!day){
    day =[];
}
console.log(day);

let ex_count = 0;
let ex_list = [];
window.onload=datedisp();

selectact.onchange = (e) => {
    hidegym(e.target.value);
  }


function datedisp(){
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    var fin = [month, day, year].join('-')
    document.getElementById('datetoday').innerHTML=fin;
}

function hidegym(){
    var val = selectact.value;
    if (val == "Gym") {
        gymops.style.display = "block";
      } else {
        console.log("help");
        gymops.style.display = "none";
    }

}

function appendex(){
    let Gym_act = document.getElementById("gym_acts");
    let Ex_type = document.querySelector('input[name="muscletype"]:checked');
    if (Gym_act.value ===''){
        alert("Empty Text!!!");
    }else{
        ex_list.push({
            exercise:Gym_act.value,
            type:Ex_type.value,
        })
        displayex();
    
    }
}
function displayexsaved(){
    const backred = chosen_date.value;
    const currentdate = day.findIndex(x => x.date === backred)
    console.log(backred);
    console.log(currentdate);
    ex_list_display_saved.innerHTML ="";
    ex_list_display_saved.appendChild(document.createElement("br"));

    if (currentdate != -1){
        const saved_act_type = day[currentdate].activity;
        if (saved_act_type == "Rest"){
            const not_avail = document.createElement("label");
            not_avail.innerHTML = "You took a rest day during this date";
            ex_list_display_saved.appendChild(not_avail);
        } else if (saved_act_type == "Emergency"){
            const not_avail = document.createElement("label");
            not_avail.innerHTML = "There was an emergency during this date";
            ex_list_display_saved.appendChild(not_avail);
        } else {
            const curr_list_of_exercises = day[currentdate].list_of_exercises;
            for (i=0; i<curr_list_of_exercises.length; i++){
                const Gym_disp_Wrap = document.createElement("div");
                Gym_disp_Wrap.className = "gymwrapper";
    
                const Gym_act_disp = document.createElement("div");
                Gym_act_disp.classList.add("Gym_act_list");
                Gym_act_disp.innerHTML = curr_list_of_exercises[i].exercise;
    
                const Gym_type_disp = document.createElement("div");
                Gym_type_disp.classList.add("Gym_act_type");
                Gym_type_disp.innerHTML = curr_list_of_exercises[i].type;
    
                Gym_disp_Wrap.appendChild(Gym_act_disp);
                Gym_disp_Wrap.appendChild(Gym_type_disp);
                ex_list_display_saved.appendChild(Gym_disp_Wrap);
                ex_list_display_saved.appendChild(document.createElement("br"));
        }}
    }else{
        const not_avail = document.createElement("label");
        not_avail.innerHTML = "No available data";
        ex_list_display_saved.appendChild(not_avail);
    }
}





function displayex(){
    ex_list_display.innerHTML ="";
    if (ex_list.length!=0){
        console.log("help");
        const Gym_disp_Wrap = document.createElement("div");
        Gym_disp_Wrap.className = "gymwrapper bold";

        const Gym_act_disp = document.createElement("div");
        Gym_act_disp.classList.add("Gym_act_list");
        Gym_act_disp.innerHTML = "Gym Activity";

        const Gym_type_disp = document.createElement("div");
        Gym_type_disp.classList.add("Gym_act_type");
        Gym_type_disp.innerHTML = "Type of Activity";

        Gym_disp_Wrap.appendChild(Gym_act_disp);
        Gym_disp_Wrap.appendChild(Gym_type_disp);
        ex_list_display.appendChild(Gym_disp_Wrap);
        
    }

    for (i=0; i<ex_list.length; i++){
        const Gym_disp_Wrap = document.createElement("div");
        Gym_disp_Wrap.className = "gymwrapper";

        const Gym_act_disp = document.createElement("div");
        Gym_act_disp.classList.add("Gym_act_list");
        Gym_act_disp.innerHTML = ex_list[i].exercise;

        const Gym_type_disp = document.createElement("div");
        Gym_type_disp.classList.add("Gym_act_type");
        Gym_type_disp.innerHTML = ex_list[i].type;

        const del_button = document.createElement("button");
        del_button.classList.add("Delete");
        del_button.addEventListener("click", deleteact);
        del_button.id = i;
        del_button.innerHTML = "Delete!"
        Gym_disp_Wrap.appendChild(Gym_act_disp);
        Gym_disp_Wrap.appendChild(Gym_type_disp);
        Gym_disp_Wrap.appendChild(del_button);
        ex_list_display.appendChild(Gym_disp_Wrap);
        ex_list_display.appendChild(document.createElement("br"));
    }
}

function deleteact(e){

    let indrem = e.target.id;
    console.log(ex_list[0]);
    const indexrem = ex_list.indexOf(indrem);
    console.log(indexrem);
    ex_list.splice(indrem,1);
    displayex();
}

function finalize(){

    if (!dateact.value) {
       alert("Empty Text on Date!!!");
       return;
    }

    if( day.findIndex(x => x.date === dateact.value) != -1){
        alert("Selected Date Already Exists!!!");
        return;
    }

    if (selectact.value=="Gym" && ex_list ==[]){
        alert("Please input atleast one exercise!!");
       return;
    }
    
    if (selectact.value != "Gym") {
        ex_list =[];
      }
      
    
    day.push({
        date:dateact.value,
        activity: selectact.value,
        list_of_exercises: ex_list,
    })
    
    ex_list = [];
    saveacts();
    displayex();
}

function saveacts(){
    localStorage.setItem("day",JSON.stringify(day));
}