//Classes
class Destination{
  constructor(image, pays, circuit, tarif) {
    this.image = image
    this.pays = pays;
    this.circuit = circuit;
    this.tarif = tarif;
  }
}

class Menu{
    constructor(nom, lien, onclick, sous_menus){
        this.nom = nom;
        this.lien = lien;
        this.onclick = onclick;
        this.sous_menus = sous_menus;
    }
}

class SousMenu{
    constructor(nom, lien, onclick){
        this.nom = nom;
        this.lien = lien;
        this.onclick = onclick;
    }
}




//Au refresh de la page, charger la page d'accueil
window.onload = function(){
    InitAccueil();
}

/* Affiche le menu */
function InitMenu(){
        //création du menu
        var menu_accueil = new Menu("Accueil", "", "InitAccueil()");
        var menu_perso = new Menu("Espace Perso", "perso.html");
            perso_connexion = new SousMenu("Connexion","","InitMesInfos()");
            perso_infos = new SousMenu("Mes Informations","","InitMesInfos()");
            perso_messagerie = new SousMenu("Messagerie","","InitMesInfos()");
            perso_historique = new SousMenu("Historique","", "InitMesInfos()");
            perso_sousmenus = [];
            perso_sousmenus.push(perso_connexion);
            perso_sousmenus.push(perso_infos);
            perso_sousmenus.push(perso_messagerie);
            perso_sousmenus.push(perso_historique);
            menu_perso.sous_menus = perso_sousmenus;
        var menu_destinations = new Menu("Destinations", "","InitDestination()");//"destinations.html");
        var menu_audio = new Menu("Voyage Virtuel Audio","","InitAudio()");
        var menu_video = new Menu("Voyage Virtuel Video","","InitVideo()");
        var menu_contact = new Menu("Contact", "", "InitContact()");
        var menus = [];
        menus.push(menu_accueil);
        menus.push(menu_perso);
        menus.push(menu_destinations);
        menus.push(menu_audio);
        menus.push(menu_video);
        menus.push(menu_contact);
    
        //affichage du menu
        var div_menu = document.getElementsByClassName("menu")[0];  
        div_menu.innerHTML = ""; 
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
                            if(menus[i].sous_menus[y].onclick != undefined){
                                var p_ss = document.createElement("p");
                                p_ss.classList.add("p_lien_sousmenu");
                                p_ss.setAttribute("onclick",menus[i].sous_menus[y].onclick);
                                p_ss.innerText = menus[i].sous_menus[y].nom;
                                div_sous_menu.appendChild(p_ss);
                            }else{
                                var a_ss = document.createElement("a");
                                a_ss.setAttribute("onclick",menus[i].sous_menus[y].onclick);
                                a_ss.setAttribute("href",menus[i].sous_menus[y].lien);
                                a_ss.innerText = menus[i].sous_menus[y].nom;
                                div_sous_menu.appendChild(a_ss);
                            }
                        }
                    li.appendChild(div_sous_menu);
                }else{//menu sans sous menu :
                    if(menus[i].onclick != undefined){
                        var p_menu = document.createElement("p");
                        p_menu.setAttribute("onclick",menus[i].onclick);
                        p_menu.classList.add("p_titre_menu");
                        p_menu.innerText = menus[i].nom;
                        li.classList.add("li_menu");
                        li.appendChild(p_menu);
                    }else{
                        var a_menu = document.createElement("a");
                        a_menu.setAttribute("href",menus[i].lien);
                        a_menu.innerText = menus[i].nom;
                        li.appendChild(a_menu);
                    }
                    
                }
                ul_menu_nav.appendChild(li);
            }
            
            div_menu.appendChild(ul_menu_nav);
            document.getElementsByTagName("body")[0].appendChild(div_menu);
}

/* Affiche le contenu de la page Destination + maj le menu */
function InitDestination(){
    InitMenu();
    for(var i = 0; i< document.getElementsByClassName("p_titre_menu").length; i++){
        if(document.getElementsByClassName("p_titre_menu")[i].innerText =="Destinations"){
            document.getElementsByClassName("p_titre_menu")[i].parentElement.classList.add("active");
        }
    }
    var div_contenu = document.getElementsByClassName("contenu")[0];
    div_contenu.innerHTML ="";
        //bouton
        var button_admin = document.createElement("button");
        button_admin.setAttribute("id","btn_admin");
        button_admin.setAttribute("onclick","AdminMode()");
        button_admin.innerText = "Admin";
        div_contenu.appendChild(button_admin);
        //titre
        var h1 = document.createElement("h1");
        h1.innerText = "Destinations";
        div_contenu.appendChild(h1);
        //table
        var table = document.createElement("table");
            var thead = document.createElement("thead");
                var tr = document.createElement("tr");
                    //th
                    var th_image = document.createElement("th");
                    th_image.innerText = "Image";
                    tr.appendChild(th_image);
                    //th
                    var th_Pays = document.createElement("th");
                    th_Pays.innerText = "Pays";
                    tr.appendChild(th_Pays);
                    //th
                    var th_circuit = document.createElement("th");
                    th_circuit.innerText = "Circuit";
                    tr.appendChild(th_circuit);
                    //th
                    var th_Tarif = document.createElement("th");
                    th_Tarif.innerText = "Tarif";
                    tr.appendChild(th_Tarif);
                    //th
                    var th_reservation = document.createElement("th");
                    th_reservation.innerText = "Réservation";
                    tr.appendChild(th_reservation);
                    //th
                    var th_admin = document.createElement("th");
                    th_admin.innerText = "Admin";
                    th_admin.classList.add("admin_mode");
                    th_admin.classList.add("hidden");
                    tr.appendChild(th_admin);
                thead.appendChild(tr);
                table.appendChild(thead);
                var tbody = document.createElement("tbody");
                tbody.setAttribute("id","destinations");
                table.appendChild(tbody);
        div_contenu.appendChild(table);
        var btn_ajout = document.createElement("button");
        btn_ajout.setAttribute("id","btn_admin_ajout");
        btn_ajout.setAttribute("onclick","AdminAjoutForm()");
        btn_ajout.classList.add("admin_mode");
        btn_ajout.classList.add("hidden");
        btn_ajout.innerText = "Ajouter une destination";
        div_contenu.appendChild(btn_ajout);
        //div pop up ajout
        var divajout = document.createElement("div");
        divajout.classList.add("admin_mode_ajout");
        divajout.classList.add("hidden");
        divajout.setAttribute("id","admin_ajout_form");
            var h2 = document.createElement("h2");
            h2.innerText = "Ajouter une destination";
            divajout.appendChild(h2);
            var perreur = document.createElement("p");
            perreur.setAttribute("id","erreur");
            divajout.appendChild(perreur);

            var divinputajout = document.createElement("div");
            divinputajout.classList.add("flex");
            divinputajout.classList.add("admin_input_ajout");
                var inputpays = document.createElement("input");
                inputpays.setAttribute("id","admin_add_pays");
                inputpays.setAttribute("type","text");
                inputpays.setAttribute("placeholder","Pays");
                divinputajout.appendChild(inputpays);

                var inputdescajout = document.createElement("input");
                inputdescajout.setAttribute("id","admin_add_description");
                inputdescajout.setAttribute("type","text");
                inputdescajout.setAttribute("placeholder","Description");
                divinputajout.appendChild(inputdescajout);

                var inputprixajout = document.createElement("input");
                inputprixajout.setAttribute("id","admin_add_prix");
                inputprixajout.setAttribute("type","number");
                inputprixajout.setAttribute("placeholder","Prix");
                divinputajout.appendChild(inputdescajout);

                var divimg = document.createElement("div");
                divimg.classList.add("flex");
                    var label = document.createElement("label");
                    label.setAttribute("id","label_add_image");
                    label.setAttribute("for","admin_add_image");
                    label.innerText = "Image : ";
                    divimg.appendChild(label);

                    var inputimg = document.createElement("input");
                    inputimg.setAttribute("id","admin_add_image");
                    inputimg.setAttribute("type","file");
                    divimg.appendChild(inputimg);

                divinputajout.appendChild(divimg);

            divajout.appendChild(divinputajout);
            var button_ajout = document.createElement("button");
            button_ajout.setAttribute("onclick","AdminAjout()");
            button_ajout.innerText = "Ajouter";
            divajout.appendChild(button_ajout);
        div_contenu.appendChild(divajout);
    InitTab();
}

/* Affiche le contenu de la page Accueil + maj le menu */
function InitAccueil(){
    InitMenu();
    for(var i = 0; i< document.getElementsByClassName("p_titre_menu").length; i++){
        if(document.getElementsByClassName("p_titre_menu")[i].innerText =="Accueil"){
            document.getElementsByClassName("p_titre_menu")[i].parentElement.classList.add("active");
        }
    }
    var divcontenu = document.getElementsByClassName("contenu")[0];
        divcontenu.innerHTML = "";
        var h1 = document.createElement("h1");
        h1.innerText = "Travel Discount";
        divcontenu.appendChild(h1);
        var section_desc = document.createElement("section");
        section_desc.setAttribute("id","description_generale");
            var h2_desc = document.createElement("h2");
            h2_desc.classList.add("h2_blanc");
            h2_desc.innerText = "Description Générale";
            section_desc.appendChild(h2_desc);
            var p_desc = document.createElement("p");
            p_desc.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum necessitatibus adipisci hic accusamus vero modi cupiditate accusantium quibusdam veniam sed. Veritatis enim fugiat mollitia, corrupti quas a modi nostrum autem?";
            section_desc.appendChild(p_desc);
            var em_desc = document.createElement("em");
            em_desc.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, est molestias voluptates delectus distinctio voluptatibus cumque perferendis nam voluptatum unde. Sequi natus eum est ab doloremque unde saepe aliquid magnam!";
            section_desc.appendChild(em_desc);
        divcontenu.appendChild(section_desc);
        var section_info = document.createElement("section");
        section_info.setAttribute("id","infos_pratiques");
        var h2_info = document.createElement("h2");
            h2_info.classList.add("h2_blanc");
            h2_info.innerText = "Infos Pratiques";
            section_info.appendChild(h2_info);
            var p_info = document.createElement("p");
            p_info.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum necessitatibus adipisci hic accusamus vero modi cupiditate accusantium quibusdam veniam sed. Veritatis enim fugiat mollitia, corrupti quas a modi nostrum autem?";
            section_info.appendChild(p_info);
            var em_info = document.createElement("em");
            em_info.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, est molestias voluptates delectus distinctio voluptatibus cumque perferendis nam voluptatum unde. Sequi natus eum est ab doloremque unde saepe aliquid magnam!";
            section_info.appendChild(em_info);
        divcontenu.appendChild(section_info);
}

/* Affiche le contenu de la page Vidéo + maj le menu */
function InitVideo(){
    InitMenu();
    for(var i = 0; i< document.getElementsByClassName("p_titre_menu").length; i++){
        if(document.getElementsByClassName("p_titre_menu")[i].innerText =="Voyage Virtuel Video"){
            document.getElementsByClassName("p_titre_menu")[i].parentElement.classList.add("active");
        }
    }
    var divcontenu = document.getElementsByClassName("contenu")[0];
        divcontenu.innerHTML = "";
        var h1 = document.createElement("h1");
        h1.innerText = "Voyage Virtuel Vidéo";
        divcontenu.appendChild(h1);
        var article1 = document.createElement("article");
            var video1 = document.createElement("video");
            video1.setAttribute("width","100%");
            video1.setAttribute("autoplay","true");
                var source1 = document.createElement("source");
                source1.setAttribute("src","media/canada.mp4");
                source1.setAttribute("type","video/mp4");
                video1.appendChild(source1);
            article1.appendChild(video1);    
        divcontenu.appendChild(article1);

        var article2 = document.createElement("article");
            var video2 = document.createElement("video");
            video2.setAttribute("width","100%");
            video2.setAttribute("autoplay","true");
                var source2 = document.createElement("source");
                source2.setAttribute("src","media/argentine.mp4");
                source2.setAttribute("type","video/mp4");
                video2.appendChild(source2);
            article2.appendChild(video2);    
        divcontenu.appendChild(article2);

        var article3 = document.createElement("article");
            var video3 = document.createElement("video");
            video3.setAttribute("width","100%");
            video3.setAttribute("autoplay","true");
                var source3 = document.createElement("source");
                source3.setAttribute("src","media/venise.mp4");
                source3.setAttribute("type","video/mp4");
                video3.appendChild(source3);
            article3.appendChild(video3);    
        divcontenu.appendChild(article3);
}

/* Affiche le contenu de la page Audio + maj le menu */
function InitAudio(){
    InitMenu();
    for(var i = 0; i< document.getElementsByClassName("p_titre_menu").length; i++){
        if(document.getElementsByClassName("p_titre_menu")[i].innerText =="Voyage Virtuel Audio"){
            document.getElementsByClassName("p_titre_menu")[i].parentElement.classList.add("active");
        }
    }
    var divcontenu = document.getElementsByClassName("contenu")[0];
        divcontenu.innerHTML = "";
        var h1 = document.createElement("h1");
        h1.innerText = "Voyage Virtuel Audio";
        divcontenu.appendChild(h1);
        var article1 = document.createElement("article");
            var titre1 = document.createElement("h3");
            titre1.innerText = "Séjour en Mésopotamie";
            article1.appendChild(titre1);
            var audio1 = document.createElement("audio");
            audio1.setAttribute("controls","");
            audio1.setAttribute("src","media/mesopotamie.mp3");
            article1.appendChild(audio1);
        divcontenu.appendChild(article1);

        var article2 = document.createElement("article");
            var titre2 = document.createElement("h3");
            titre2.innerText = "Voyage au centre de la Terre";
            article2.appendChild(titre2);
            var audio2 = document.createElement("audio");
            audio2.setAttribute("controls","");
            audio2.setAttribute("src","media/terre.mp3");
            article2.appendChild(audio2);
        divcontenu.appendChild(article2);

        var article3 = document.createElement("article");
            var titre3 = document.createElement("h3");
            titre3.innerText = "Escapée lunaire";
            article3.appendChild(titre3);
            var audio3 = document.createElement("audio");
            audio3.setAttribute("controls","");
            audio3.setAttribute("src","media/lune.mp3");
            article3.appendChild(audio3);
        divcontenu.appendChild(article3);

        var article4 = document.createElement("article");
            var titre4 = document.createElement("h3");
            titre4.innerText = "Traversée du Désert";
            article4.appendChild(titre4);
            var audio4 = document.createElement("audio");
            audio4.setAttribute("controls","");
            audio4.setAttribute("src","media/desert.mp3");
            article4.appendChild(audio4);
        divcontenu.appendChild(article4);
}

/* Affiche le contenu de la page Mes Infos + maj le menu */
function InitMesInfos(){
    InitMenu();
    document.getElementsByClassName("dropdown")[0].classList.add("active");

    var divcontenu = document.getElementsByClassName("contenu")[0];
        divcontenu.innerHTML = "";
        var h1 = document.createElement("h1");
        h1.innerText = "Mon espace Personnel";
        divcontenu.appendChild(h1);
        var section = document.createElement("section");
            var ul = document.createElement("ul");
            ul.classList.add("perso");
                var li_connexion = document.createElement("li");
                    li_connexion.innerText = "Connexion";
                ul.appendChild(li_connexion);

                var li_infos = document.createElement("li");
                    var ul_info = document.createElement("ul");
                    ul_info.classList.add("infos_perso");
                        var li_nom = document.createElement("li");
                        li_nom.setAttribute("id","nom_prenom");
                        li_nom.innerText = "Nom Prénom";
                        ul_info.appendChild(li_nom);

                        var li_tel = document.createElement("li");
                        li_tel.setAttribute("id","tel");
                        li_tel.innerText = "Tél. : 06 12 13 14 15";
                        ul_info.appendChild(li_tel);

                        var li_mail = document.createElement("li");
                        li_mail.setAttribute("id","mail");
                        li_mail.innerText = "@ : mail@lemail.com";
                        ul_info.appendChild(li_mail)
                    li_infos.appendChild(ul_info);
                ul.appendChild(li_infos);

                var li_mess = document.createElement("li");
                li_mess.innerText = "Messagerie";
                ul.appendChild(li_mess);
                var li_hist = document.createElement("li");
                li_hist.innerText = "Historique";
                ul.appendChild(li_hist);
            section.appendChild(ul);
        divcontenu.appendChild(section);
}

/* Affiche le contenu de la page Contact + maj le menu */
function InitContact(){
    InitMenu();
    for(var i = 0; i< document.getElementsByClassName("p_titre_menu").length; i++){
        if(document.getElementsByClassName("p_titre_menu")[i].innerText =="Contact"){
            document.getElementsByClassName("p_titre_menu")[i].parentElement.classList.add("active");
        }
    }
    var divcontenu = document.getElementsByClassName("contenu")[0];
    divcontenu.innerHTML = "";
    var form_contact = document.createElement("form");
    form_contact.setAttribute("id","form_contact");
        var h1 = document.createElement("h1");
        h1.innerText = "Contact";
        form_contact.appendChild(h1);

        var p = document.createElement("p");
        p.setAttribute("id","p_form");
        p.innerText = "Une remarque ? Une suggestion ? N'hésitez-pas à nous écrire.";
        form_contact.appendChild(p);

        var label_nom = document.createElement("label");
        label_nom.setAttribute("for","nom");
        label_nom.innerHTML ="Votre nom : <em class=\"red\">*</em>";
        form_contact.appendChild(label_nom);

        var input_nom = document.createElement("input");
        input_nom.setAttribute("type","text");
        input_nom.setAttribute("name","nom");
        input_nom.setAttribute("id","nom");
        input_nom.setAttribute("required","true");
        form_contact.appendChild(input_nom);

        var label_email = document.createElement("label");
        label_email.setAttribute("type","text");
        label_email.innerHTML = "Votre e-mail : <em class=\"red\">*</em>";
        form_contact.appendChild(label_email);

        var input_email = document.createElement("input");
        input_email.setAttribute("type","text");
        input_email.setAttribute("name","email");
        input_email.setAttribute("id","email");
        input_email.setAttribute("required","true");
        form_contact.appendChild(input_email);

        var label_objet = document.createElement("label");
        label_objet.setAttribute("for","objet");
        label_objet.innerText = "Objet";
        form_contact.appendChild(label_objet);

        var input_objet = document.createElement("input");
        input_objet.setAttribute("type","text");
        input_objet.setAttribute("name","objet");
        input_objet.setAttribute("id","objet");
        form_contact.appendChild(input_objet);

        var label_message = document.createElement("label");
        label_message.setAttribute("for","message");
        label_message.innerText = "Votre message :";
        form_contact.appendChild(label_message);

        var text_area = document.createElement("textarea");
        text_area.setAttribute("name","message");
        text_area.setAttribute("id","message");
        text_area.setAttribute("cols","30");
        text_area.setAttribute("rows","10");
        text_area.innerText = "Votre message...";
        form_contact.appendChild(text_area);

        var button_contact = document.createElement("button");
        button_contact.setAttribute("onclick","Contacter()");
        button_contact.innerText = "Envoyer";
        form_contact.appendChild(button_contact);
    divcontenu.appendChild(form_contact);
}

/* Affiche le tableau de destination |page "Destination" */
function InitTab(){
    var long = destinations['destination'].length;
    //ajouts des destinations à la page
    var bloc_dest = document.getElementById("destinations");
    if(bloc_dest == null){
        return;
    }
    bloc_dest.innerHTML = "";
    if(bloc_dest != null ){
        for(var i = 0; i< long; i++){
            var tr = document.createElement("tr");
            var td_Image = document.createElement("td");
                td_Image.setAttribute("style","width: 25%;");
                var img_Image = document.createElement("img");
                var img = destinations['destination'][i].image;
                img_Image.setAttribute("style","width: inherit; margin-left: auto; margin-right: auto; display: flex;");
                img_Image.setAttribute("src", img);
                img_Image.setAttribute("width","25%");
                td_Image.appendChild(img_Image);

            var td_Pays = document.createElement("td");
            td_Pays.innerText = destinations['destination'][i].pays;

            var td_circuit = document.createElement("td");
            td_circuit.innerText = destinations['destination'][i]. description;

            var td_tarif = document.createElement("td");
            td_tarif.innerText = destinations['destination'][i].prix + "€";

            var td_reserver = document.createElement("td");
            var a_reserver = document.createElement("a");
            a_reserver.innerText = "Réserver";
            td_reserver.appendChild(a_reserver);
            
            var td_admin = document.createElement("td");
                td_admin.classList.add("hidden");
                td_admin.classList.add("admin_mode");
                td_admin.innerText = "Modifier";
                td_admin.setAttribute("onclick","InitFormModifier("+JSON.stringify(destinations['destination'][i])+")");
            
            //ajouts des td au tr
            tr.appendChild(td_Image);
            tr.appendChild(td_Pays);
            tr.appendChild(td_circuit);
            tr.appendChild(td_tarif);
            tr.appendChild(td_reserver);
            tr.appendChild(td_admin);
            //ajout du tr au tbody d'id = destinations
            bloc_dest.appendChild(tr); 
        }
    }
}

/*
    Affiche le formulaire pour modifier une destination du tableau de destination | page "Destination"
*/
function InitFormModifier(elem){
    console.log(elem);
    if(document.getElementById("admin_mode_modif") != null){
        var admin_modif_form = document.getElementById("admin_mode_modif");
        admin_modif_form.innerHTML = "";
    }else{
        var admin_modif_form = document.createElement("div");
        admin_modif_form.classList.add("admin_mode_modif");
        admin_modif_form.setAttribute("id","admin_mode_modif");
    }
        admin_modif_form.classList.remove("hidden");
        console.log("remove hidden form modif");
        var titre = document.createElement("h2");
        titre.innerText = "Modifier la destination : "+elem.pays;
        admin_modif_form.appendChild(titre);
        var erreur = document.createElement("p");
        erreur.setAttribute("id","modif_erreur");
        admin_modif_form.appendChild(erreur);
        var bouton_supprimer = document.createElement("button");
        bouton_supprimer.setAttribute("onclick","Supprimer("+JSON.stringify(elem)+")");
        bouton_supprimer.setAttribute("style","display: flex; margin-left: auto; margin-right: auto; margin-top: 10px;");
        bouton_supprimer.innerText = "Supprimer";
        admin_modif_form.appendChild(bouton_supprimer);
        var input_modif_prix = document.createElement("input");
        input_modif_prix.setAttribute("type","number");
        input_modif_prix.setAttribute("id","admin_modif_prix");
        input_modif_prix.setAttribute("placeholder","Nouveau Prix");
        input_modif_prix.setAttribute("style","display: flex; margin-left: auto; margin-right: auto; margin-top: 10px;");
        admin_modif_form.appendChild(input_modif_prix);
        var input_modif_desc = document.createElement("input");
        input_modif_desc.setAttribute("type","text");
        input_modif_desc.setAttribute("placeholder","Description");
        input_modif_desc.setAttribute("id","admin_modif_description");
        input_modif_desc.setAttribute("style","display: flex; margin-left: auto; margin-right: auto; margin-top: 10px;");
        admin_modif_form.appendChild(input_modif_desc);
        var button_modifier = document.createElement("button");
        button_modifier.innerText = "Modifier";
        button_modifier.setAttribute("onclick","Modifier("+JSON.stringify(elem)+")");
        button_modifier.setAttribute("style","display: flex; margin-left: auto; margin-right: auto; margin-top: 10px;");
        admin_modif_form.appendChild(button_modifier);
        document.getElementsByClassName("contenu")[0].insertBefore(admin_modif_form, document.getElementsByTagName("table")[0].nextElementSibling);
    }

/*Contacte pas vraiment le propriétaire du site mais fais l'illusion pour faire joli */
function Contacter(){
    InitContact();
    var divcontenu = document.getElementsByClassName("contenu")[0];
    var p = document.createElement("p");
    p.classList.add("centered");
    p.classList.add("red");
    p.innerText = "Votre message a été envoyé";
    document.getElementById("form_contact").insertBefore(p, document.getElementById("p_form"));
}


/*Methodes admin */

/*Affiche les fonctionnalités admin | page "Destination" */
function AdminMode(){
    console.log("admin");
    for(var i = 0; i < document.getElementsByClassName("admin_mode").length; i++){
        if(document.getElementsByClassName("admin_mode")[i].className.includes("hidden")){
            document.getElementsByClassName("admin_mode")[i].classList.remove("hidden");
        }else{
            document.getElementsByClassName("admin_mode")[i].classList.add("hidden");
        }
        
    }
}

/*Affiche le formulaire d'ajout de destination | page "Destination" */
function AdminAjoutForm(){
    for(var i = 0; i< document.getElementsByClassName("admin_mode_ajout").length; i++){
        if(document.getElementsByClassName("admin_mode_ajout")[i].className.includes("hidden")){
            document.getElementsByClassName("admin_mode_ajout")[i].classList.remove("hidden");
            
        }else{
            document.getElementsByClassName("admin_mode_ajout")[i].classList.add("hidden");
        }
    }
    
}

/* Ajoute une destination au tableau de destinations | page "Destination" */
function AdminAjout(){
    //lecture image : 
    const files = document.getElementById("admin_add_image").files;
    if (!files || files.length==0)
        return;
        const file = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            var pays = document.getElementById("admin_add_pays").value;
            var description = document.getElementById("admin_add_description").value;
            var prix = document.getElementById("admin_add_prix").value;
            var image = reader.result;      
            console.log(image);
            console.log("erreur"+document.getElementById("erreur").innerText);
            if(pays == null || "" || description == null || description == "" || prix == null || prix == "" || image == null){
                console.log(document.getElementById("erreur").innerText);
                document.getElementById("erreur").innerText = "Veuillez remplir tout les champs";
            }
            var Dest = {
                image: image,
                pays: pays,
                description: description,
                prix: prix
            }
            var long = destinations['destination'].length;
            destinations['destination'][long]= Dest;
            console.log(destinations);
            InitTab();
            if(document.getElementById("erreur").innerText != null){
                document.getElementsByClassName("admin_mode_ajout")[0].classList.add("hidden");
                for(var i = 0; i< document.getElementsByClassName("admin_mode").length; i++){
                    document.getElementsByClassName("admin_mode")[i].classList.remove("hidden");
                }
            }
    }; 
}

/* Prends en parametre l'objet selectionné de la liste et renvoie void
    il met a jour l'objet avec les nouvelles valeurs | page "Destination"
*/
function Modifier(obj){
    var indexOfObject;
    for(var i = 0; i< destinations['destination'].length; i++){
        if(destinations['destination'][i]['pays'] == obj['pays']){
            indexOfObject = i;
        }
    }
    if(document.getElementById("admin_modif_prix").value){
        console.log("ancien prix modifier:"+destinations['destination'][indexOfObject]['prix']);
        console.log("nvo prix modifier : "+document.getElementById("admin_modif_prix").value);
        destinations['destination'][indexOfObject]['prix'] = document.getElementById("admin_modif_prix").value;
    }
    if(document.getElementById("admin_modif_description").value){
        destinations['destination'][indexOfObject]['description'] = document.getElementById("admin_modif_description").value;
    }
    InitTab();
    for(var i = 0; i< document.getElementsByClassName("admin_mode").length; i++){
        document.getElementsByClassName("admin_mode")[i].classList.remove("hidden");
    }
    document.getElementById('admin_mode_modif').classList.add("hidden");
}

function Supprimer(obj){
    var indexOfObject = destinations['destination'].findIndex(obj => {
        return obj.pays === obj['pays'];
    });
    destinations['destination'].splice(indexOfObject, 1);
    InitTab();
    for(var i = 0; i< document.getElementsByClassName("admin_mode").length; i++){
        document.getElementsByClassName("admin_mode")[i].classList.remove("hidden");
    }
    document.getElementById('admin_mode_modif').classList.add("hidden");
}
