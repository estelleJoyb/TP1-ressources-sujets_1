class Destination{
  constructor(pays, circuit, tarif) {
    this.pays = pays;
    this.circuit = circuit;
    this.tarif = tarif;
  }
}

class Menu{
    constructor(nom, lien, sous_menus){
        this.nom = nom;
        this.lien = lien;
        this.sous_menus = sous_menus;
    }
}

class SousMenu{
    constructor(nom, lien){
        this.nom = nom;
        this.lien = lien;
    }
}

//ajouts des destinations à la page
window.onload = function(){
    //creation des destinations
    var Espagne = new Destination("Espagne","Week-End Catalan en Amoureux",230);
    var BresilArgentine = new Destination("Brésil & Argentique", "Découverte entre Plaisir et Aventures", 1520);
    var Irlande = new Destination("Irlande","A la mode Celte",315);
    var France = new Destination("France","Paris et les bâteaux mouches",150);
    var destinations = [];
    destinations.push(Espagne);
    destinations.push(BresilArgentine);
    destinations.push(Irlande);
    destinations.push(France);

    //ajouts des destinations à la page
    var bloc_dest = document.getElementById("destinations");
    if(bloc_dest != null ){
        for(var i = 0; i< destinations.length; i++){
            var tr = document.createElement("tr");

            var td_Pays = document.createElement("td");
            td_Pays.innerText = destinations[i].pays;

            var td_circuit = document.createElement("td");
            td_circuit.innerText = destinations[i].circuit;

            var td_tarif = document.createElement("td");
            td_tarif.innerText = destinations[i].tarif + "€";

            var td_reserver = document.createElement("td");
            var a_reserver = document.createElement("a");
            a_reserver.innerText = "Réserver";
            td_reserver.appendChild(a_reserver);
            

            var td_admin = document.createElement("td");
            td_admin.innerText = "Modifier";
            
            //ajouts des td au tr
            tr.appendChild(td_Pays);
            tr.appendChild(td_circuit);
            tr.appendChild(td_tarif);
            tr.appendChild(td_reserver);
            tr.appendChild(td_admin);

            //ajout du tr au tbody d'id = destinations
            bloc_dest.appendChild(tr);
        }
    }

    /////MENU /////
    //création du menu
    var menu_accueil = new Menu("Accueil", "index.html");
    var menu_perso = new Menu("Espace Perso", "perso.html");
        perso_connexion = new SousMenu("Connexion","perso.html");
        perso_infos = new SousMenu("Mes Informations","perso.html");
        perso_messagerie = new SousMenu("Messagerie","perso.html");
        perso_historique = new SousMenu("Historique", "perso.html");
        perso_sousmenus = [];
        perso_sousmenus.push(perso_connexion);
        perso_sousmenus.push(perso_infos);
        perso_sousmenus.push(perso_messagerie);
        perso_sousmenus.push(perso_historique);
        menu_perso.sous_menus = perso_sousmenus;
    var menu_destinations = new Menu("Destinations", "destinations.html");
    var menu_audio = new Menu("Voyage Virtuel Audio","audio.html");
    var menu_video = new Menu("Voyage Virtuel Video","video.html");
    var menu_contact = new Menu("Contact", "contact.html");
    var menus = [];
    menus.push(menu_accueil);
    menus.push(menu_perso);
    menus.push(menu_destinations);
    menus.push(menu_audio);
    menus.push(menu_video);
    menus.push(menu_contact);

    //affichage du menu
    var div_menu = document.createElement("div");
    div_menu.classList.add("menu");

        var h1_titre = document.createElement("h1");
        h1_titre.classList.add("titre_menu");
        h1_titre.innerText = "Travel Discount";
        div_menu.appendChild(h1_titre);

        var ul_menu_nav = document.createElement("ul");
        ul_menu_nav.classList.add("nav");

        for(var i = 0; i< menus.length; i++){
            var li = document.createElement("li");
            
            if(menus[i].sous_menus != undefined){//s'il y a un sous menu, on va le créer aussi
                li.classList.add("dropdown");
                var a = document.createElement("a");
                a.classList.add("dropbtn");
                a.setAttribute("href","javascript:void(0)");
                a.innerText = menus[i].nom;
                li.appendChild(a);

                var div_sous_menu = document.createElement("div");
                div_sous_menu.classList.add("dropdown-content");
                    for(var y = 0; y < menus[i].sous_menus.length; y++){
                        var a_ss = document.createElement("a");
                        a_ss.setAttribute("href",menus[i].sous_menus[y].lien);
                        a_ss.innerText = menus[i].sous_menus[y].nom;
                        div_sous_menu.appendChild(a_ss);
                    }
                li.appendChild(div_sous_menu);
            }else{//menu sans sous menu :
                var a_menu = document.createElement("a");
                a_menu.setAttribute("href",menus[i].lien);
                a_menu.innerText = menus[i].nom;
                
                li.appendChild(a_menu);
            }
            ul_menu_nav.appendChild(li);
        }
        
        div_menu.appendChild(ul_menu_nav);
        document.getElementsByTagName("body")[0].appendChild(div_menu);
        document.getElementById("btn_admin").onclick = AdminMode();
        
}


function AdminMode(){
    console.log("admin");

}