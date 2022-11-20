//Classes
class User{
    constructor(nom, email, pass, type){
        this.nom = nom;
        this.email = email;
        this.pass = pass;
        this.type = type; // soit admin soit visiteur
    }
}

class Destination{
  constructor(image, pays, circuit, tarif) {
    this.image = image;
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
    InitMenu();
    InitAccueil();
}

/* Affiche le menu */
function InitMenu(){
        //création du menu
        var menu_accueil = new Menu("Accueil", "", "InitAccueil()");
        var menu_perso = new Menu("Espace Perso", "perso.html");
            perso_connexion = new SousMenu("Connexion","","InitConnexion()");
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

        //choix de ma part de ne pas afficher ces deux pages car pas très interressantes + trop long pour ce que c'est
        // var menu_audio = new Menu("Voyage Virtuel Audio","","InitAudio()");
        // var menu_video = new Menu("Voyage Virtuel Video","","InitVideo()");
        var menu_contact = new Menu("Contact", "", "InitContact()");
        var menus = [];
        menus.push(menu_accueil);
        menus.push(menu_perso);
        menus.push(menu_destinations);
        // menus.push(menu_audio);
        // menus.push(menu_video);
        menus.push(menu_contact);
    
        //affichage du menu
        var div_menu = document.getElementsByClassName("menu")[0];
        div_menu.classList.add("sidebar_menu");
        div_menu.innerHTML = ""; 
            var nav_bar = document.createElement("nav");
            nav_bar.classList.add("col");
            nav_bar.classList.add("navbar");
            nav_bar.classList.add("navbar-expand-md");
            nav_bar.classList.add("navbar-dark");
            nav_bar.classList.add("bg-fonce");
            nav_bar.classList.add("fixed-top");
            nav_bar.classList.add("p-0");
            nav_bar.classList.add("pl-3");
                var a_title = document.createElement("a");
                a_title.classList.add("navbar-brand");
                a_title.classList.add("text-white");
                a_title.innerText = "Travel Discount";
                nav_bar.appendChild(a_title);

                var button_navbar = document.createElement("button");
                button_navbar.classList.add("navbar-toggler");
                button_navbar.setAttribute("type","button");
                button_navbar.setAttribute("data-toggle","collapse");
                button_navbar.setAttribute("data-target","#navbarsExampleDefault");
                button_navbar.setAttribute("aria-controls","navbarsExampleDefault");
                button_navbar.setAttribute("aria-expanded","false");
                button_navbar.setAttribute("aria-label","Toggle navigation");
                    var span_button = document.createElement("span");
                    span_button.classList.add("navbar-toggler-icon");
                    button_navbar.appendChild(span_button);
                nav_bar.appendChild(button_navbar);

                var div_nav = document.createElement("div");
                div_nav.classList.add("collapse");
                div_nav.classList.add("navbar-collapse");
                div_nav.setAttribute("id","navbarsExampleDefault");
                    var ul_nav = document.createElement("ul");
                    ul_nav.classList.add("navbar-nav");
                        /* Boucle sur le nb d'elem du menu */
                        for(var i = 0; i< menus.length; i++){
                            var li_nav = document.createElement("li");
                            li_nav.classList.add("nav-item");
                            if(menus[i].sous_menus != undefined){//s'il y a un sous menu, on va le créer aussi
                                li_nav.setAttribute("id","navbarDropdown");
                                li_nav.setAttribute("role","button");
                                li_nav.setAttribute("data-toggle","dropdown");
                                li_nav.setAttribute("aria-haspopup","true");
                                li_nav.setAttribute("aria-expanded","false");
                                    var a_ss_menu = document.createElement("a");
                                    a_ss_menu.classList.add("nav-link");
                                    a_ss_menu.innerText = menus[i].nom;
                                    li_nav.appendChild(a_ss_menu);

                                    var div_ss_menu = document.createElement("div");
                                    div_ss_menu.classList.add("dropdown-menu");
                                    div_ss_menu.setAttribute("aria-labelledby","navbarDropdown");
                                        for(var y = 0; y < menus[i].sous_menus.length; y++){
                                            //<p class="dropdown-item" onclick="InitMesInfos()">Connexion</p>
                                            if(menus[i].sous_menus[y].onclick != undefined){
                                                var p_ss = document.createElement("p");
                                                p_ss.classList.add("dropdown-item");
                                                p_ss.setAttribute("onclick",menus[i].sous_menus[y].onclick);
                                                p_ss.innerText = menus[i].sous_menus[y].nom;
                                                div_ss_menu.appendChild(p_ss);
                                            }else{
                                                var a_ss = document.createElement("a");
                                                a_ss.setAttribute("onclick",menus[i].sous_menus[y].onclick);
                                                a_ss.setAttribute("href",menus[i].sous_menus[y].lien);
                                                a_ss.innerText = menus[i].sous_menus[y].nom;
                                                div_ss_menu.appendChild(a_ss);
                                            }
                                        }
                                    li_nav.appendChild(div_ss_menu);
                            }else{//pas de sous menu
                                var a_menu = document.createElement("a");
                                a_menu.classList.add("nav-link");
                                a_menu.setAttribute("onclick",menus[i].onclick);
                                a_menu.innerText = menus[i].nom;
                                li_nav.appendChild(a_menu);
                            }
                            ul_nav.appendChild(li_nav);
                        }
                        
                    div_nav.appendChild(ul_nav);
                nav_bar.appendChild(div_nav);
            div_menu.appendChild(nav_bar);
}

/* Affiche le contenu de la page Destination + maj le menu */
function InitDestination(){
    InitMenu();
    for(var i= 0; i< document.getElementsByClassName("nav-link").length; i++){
        if(document.getElementsByClassName("nav-link")[i].innerText == "Destinations"){
            document.getElementsByClassName("nav-link")[i].classList.add("active");
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

        //bouton ajout
        var btn_ajout = document.createElement("button");
        btn_ajout.setAttribute("id","btn_admin_ajout");
        btn_ajout.setAttribute("onclick","AdminAjoutForm()");
        btn_ajout.classList.add("admin_mode");
        btn_ajout.classList.add("hidden");
        btn_ajout.innerText = "Ajouter une destination";
        div_contenu.appendChild(btn_ajout);
        //titre
        var h1 = document.createElement("h1");
        h1.innerText = "Destinations";
        h1.classList.add("text-main");
        h1.classList.add("text-center");
        div_contenu.appendChild(h1);

        var div_container = document.createElement("div");
        div_container.classList.add("w-75");
        div_container.classList.add("d-flex");
        div_container.classList.add("mx-auto");
            

            var div_row = document.createElement("div");
            div_row.classList.add("row");
            div_row.classList.add("jumbo-father");
            for(var i = 0; i< destinations['destination'].length; i++){
                var div_jumbo = document.createElement("div");
                div_jumbo.classList.add("mt-4");
                div_jumbo.classList.add("p-5");
                div_jumbo.classList.add("m-2");
                div_jumbo.classList.add("bg-fond");
                div_jumbo.classList.add("text-main");
                div_jumbo.classList.add("rounded");
                div_jumbo.classList.add("jumbo");
                    var titre = document.createElement("h1");
                    titre.innerText = destinations['destination'][i]['pays'];
                    div_jumbo.appendChild(titre);
                    var div_flex = document.createElement("div");
                    div_flex.classList.add("d-flex");
                    div_flex.classList.add("justify-content-between");
                        var p_desc = document.createElement("p");
                        p_desc.innerText = destinations['destination'][i]['description'];
                        div_flex.appendChild(p_desc);
                        var p_prix = document.createElement("p");
                        p_prix.innerText = destinations['destination'][i]['prix']+"€";
                        div_flex.appendChild(p_prix);
                    div_jumbo.appendChild(div_flex);
                    var img = document.createElement("img");
                    img.setAttribute("src",destinations['destination'][i]['image']);
                    img.setAttribute("width","100%");
                    div_jumbo.appendChild(img);

                    var btn_reserver = document.createElement('button');
                    btn_reserver.classList.add("d-flex");
                    btn_reserver.classList.add("mx-auto");
                    btn_reserver.classList.add("mt-2");
                    btn_reserver.classList.add("button");
                    btn_reserver.innerText = "Réserver";
                    div_jumbo.appendChild(btn_reserver);

                    var btn_modifier = document.createElement('button');
                    btn_modifier.classList.add("mt-2");
                    btn_modifier.classList.add("admin_mode");
                    btn_modifier.classList.add("button");
                    btn_modifier.innerText = "Modifier";
                    btn_modifier.classList.add("hidden");
                    btn_modifier.setAttribute("onclick","InitFormModifier("+JSON.stringify(destinations['destination'][i])+")");
                    div_jumbo.appendChild(btn_modifier);
                div_row.appendChild(div_jumbo);
            }

            div_container.appendChild(div_row);
        div_contenu.appendChild(div_container);
        //div pop up ajout
        var divajout = document.createElement("div");
        divajout.classList.add("position-fixed");
        divajout.classList.add("start-50");
        divajout.classList.add("top-50");
        divajout.classList.add("admin_mode_ajout");
        divajout.classList.add("w-50");
        divajout.classList.add("text-clair");
        divajout.classList.add("bg-fonce");
        divajout.classList.add("hidden");
        divajout.classList.add("p-2");
        divajout.setAttribute("id","admin_ajout_form");
            var h2 = document.createElement("h2");
            h2.classList.add("text-center");
            h2.innerText = "Ajouter une destination";
            divajout.appendChild(h2);
            var perreur = document.createElement("p");
            perreur.setAttribute("id","erreur");
            divajout.appendChild(perreur);

            var divinputajout = document.createElement("div");
            divinputajout.classList.add("admin_input_ajout");
            divinputajout.classList.add("row");
                var inputpays = document.createElement("input");
                inputpays.setAttribute("id","admin_add_pays");
                inputpays.setAttribute("type","text");
                inputpays.setAttribute("placeholder","Pays");
                inputpays.classList.add("w-75");
                inputpays.classList.add("d-flex");
                inputpays.classList.add("mx-auto");
                divinputajout.appendChild(inputpays);

                var inputdescajout = document.createElement("input");
                inputdescajout.setAttribute("id","admin_add_description");
                inputdescajout.setAttribute("type","text");
                inputdescajout.setAttribute("placeholder","Description");
                inputdescajout.classList.add("w-75");
                inputdescajout.classList.add("d-flex");
                inputdescajout.classList.add("mx-auto");
                divinputajout.appendChild(inputdescajout);

                var inputprixajout = document.createElement("input");
                inputprixajout.setAttribute("id","admin_add_prix");
                inputprixajout.setAttribute("type","number");
                inputprixajout.setAttribute("placeholder","Prix");
                inputprixajout.classList.add("w-75");
                inputprixajout.classList.add("d-flex");
                inputprixajout.classList.add("mx-auto");
                divinputajout.appendChild(inputprixajout);

                var divimg = document.createElement("div");
                divimg.classList.add("d-flex");
                divimg.classList.add("w-75");
                divimg.classList.add("mx-auto");
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
            button_ajout.classList.add("d-flex");   
            button_ajout.classList.add("mx-auto");
            divajout.appendChild(button_ajout);
        div_contenu.appendChild(divajout);
}

/* Affiche le contenu de la page Accueil + maj le menu */
function InitAccueil(){
    InitMenu();
    for(var i= 0; i< document.getElementsByClassName("nav-link").length; i++){
        if(document.getElementsByClassName("nav-link")[i].innerText == "Accueil"){
            document.getElementsByClassName("nav-link")[i].classList.add("active");
        }
    }
    var divcontenu = document.getElementsByClassName("contenu")[0];
        divcontenu.innerHTML = "";
        var h1 = document.createElement("h1");
        h1.innerText = "Travel Discount";
        h1.classList.add("text-main");
        h1.classList.add("text-center");
        divcontenu.appendChild(h1);
        var section_desc = document.createElement("section");
        section_desc.classList.add("bg-fond");
        section_desc.classList.add("text-main");
        section_desc.classList.add("m-3");
        section_desc.classList.add("p-2");
        section_desc.setAttribute("id","description_generale");
            var h2_desc = document.createElement("h2");
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
        section_info.classList.add("bg-fond");
        section_info.classList.add("text-main");
        section_info.classList.add("m-3");
        section_info.classList.add("p-2");
        section_info.setAttribute("id","infos_pratiques");
        var h2_info = document.createElement("h2");
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

/* Affiche le contenu de la page Mes Infos + maj le menu */
function InitMesInfos(){
    InitMenu();
    for(var i= 0; i< document.getElementsByClassName("nav-link").length; i++){
        if(document.getElementsByClassName("nav-link")[i].innerText == "Espace Perso"){
            document.getElementsByClassName("nav-link")[i].classList.add("active");
        }
    }
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
    for(var i= 0; i< document.getElementsByClassName("nav-link").length; i++){
        if(document.getElementsByClassName("nav-link")[i].innerText == "Contact"){
            document.getElementsByClassName("nav-link")[i].classList.add("active");
        }
    }
    
    var divcontenu = document.getElementsByClassName("contenu")[0];
    divcontenu.innerHTML ="";
        var div_contact_form = document.createElement("div");
        div_contact_form.classList.add("contact_form");
            var div_container = document.createElement("div");
            div_container.classList.add("container");
                div_row = document.createElement("div");
                div_row.classList.add("row");
                    div_offset = document.createElement("div");
                    div_offset.classList.add("col-lg-10");
                    div_offset.classList.add("offset-lg-1");
                        div_contact_form_container = document.createElement("div");
                        div_contact_form_container.classList.add("contact_form_container");
                            var div_form_title = document.createElement("div");
                            div_form_title.classList.add("contact_form_title");
                            div_form_title.classList.add("text-main");
                            div_form_title.innerText = "Contact";
                            div_contact_form_container.appendChild(div_form_title);

                            var p_form = document.createElement("p");
                            p_form.setAttribute("id","p_form");
                            p_form.innerText = "Une remarque ? Une suggestion ? N'hésitez-pas à nous écrire.";
                            div_contact_form_container.appendChild(p_form);

                            var form = document.createElement("form");
                            form.setAttribute("id","contact_form");
                                var div_in_form = document.createElement("div");
                                div_in_form.classList.add("contact_form_inputs");
                                div_in_form.classList.add("d-flex");
                                div_in_form.classList.add("flex-md-row");
                                div_in_form.classList.add("flex-column");
                                div_in_form.classList.add("justify-content-between");
                                div_in_form.classList.add("align-items-between");
                                    var input_name = document.createElement("input");
                                    input_name.setAttribute("type","text");
                                    input_name.setAttribute("id","contact_form_name");
                                    input_name.classList.add("contact_form_name");
                                    input_name.classList.add("input_field");
                                    input_name.setAttribute("placeholder","Votre nom");
                                    input_name.setAttribute("required","required");
                                    input_name.setAttribute("data-error","Votre nom est obligatoire.");
                                    div_in_form.appendChild(input_name);

                                    var input_email = document.createElement("input");
                                    input_email.setAttribute("type","text");
                                    input_email.setAttribute("id","contact_form_email");
                                    input_email.classList.add("contact_form_email");
                                    input_email.classList.add("input_field");
                                    input_email.setAttribute("placeholder","Votre email");
                                    input_email.setAttribute("required","required");
                                    input_email.setAttribute("data-error","Votre email est obligatoire.");
                                    div_in_form.appendChild(input_email);

                                    var input_phone = document.createElement("input");
                                    input_phone.setAttribute("type","text");
                                    input_phone.setAttribute("id","contact_form_email");
                                    input_phone.classList.add("contact_form_email");
                                    input_phone.classList.add("input_field");
                                    input_phone.setAttribute("placeholder","Votre Téléphone");
                                    div_in_form.appendChild(input_phone);
                                form.appendChild(div_in_form);
                                var div_objet = document.createElement("div");
                                div_objet.classList.add("contact_form_objet");
                                div_objet.classList.add("mb-3");
                                    var input_obj = document.createElement("input");
                                    input_obj.setAttribute("type","text");
                                    input_obj.classList.add("input_field");
                                    input_obj.setAttribute("placeholder","Objet");
                                    div_objet.appendChild(input_obj);
                                form.appendChild(div_objet);

                                var div_text = document.createElement("div");
                                div_text.classList.add("contact_form_text");
                                    var textarea = document.createElement("textarea");
                                    textarea.setAttribute("id","contact_form_message");
                                    textarea.classList.add("text_field");
                                    textarea.classList.add("contact_form_message");
                                    textarea.setAttribute("name","message");
                                    textarea.setAttribute("rows","4");
                                    textarea.setAttribute("placeholder","Message");
                                    textarea.setAttribute("required","required");
                                    textarea.setAttribute("data-error","S'il vous plaît écrivez nous un message.");
                                    div_text.appendChild(textarea);
                                form.appendChild(div_text);
                                var div_button = document.createElement("div");
                                div_button.classList.add("contact_form_button");
                                    var button_contact = document.createElement("button");
                                    button_contact.setAttribute("type","submit");
                                    button_contact.classList.add("button");
                                    button_contact.classList.add("contact_submit_button");
                                    button_contact.setAttribute("onclick","Contacter()");
                                    button_contact.innerText = "Envoyer";
                                    div_button.appendChild(button_contact);
                                form.appendChild(div_button);
                            div_contact_form_container.appendChild(form);
                        div_offset.appendChild(div_contact_form_container);
                    div_row.appendChild(div_offset);
                div_container.appendChild(div_row);
            div_contact_form.appendChild(div_container);
        divcontenu.appendChild(div_contact_form);
}

/* 
    Affiche le formulaire de connexion
*/
function InitConnexion(){
    var divcontenu = document.getElementsByClassName("contenu")[0];
    if(document.getElementById("pop-up-creation-compte") != null){
        document.getElementById("pop-up-creation-compte").classList.add("hidden");
    }
    if(document.getElementById("pop-up-connexion") == null){
        //creation de la popup
        //div pop up ajout
        var divajout = document.createElement("div");
        divajout.classList.add("position-fixed");
        divajout.classList.add("start-50");
        divajout.classList.add("top-50");
        divajout.setAttribute("id","pop-up-connexion");
        divajout.classList.add("w-50");
        divajout.classList.add("text-clair");
        divajout.classList.add("bg-fonce");
        divajout.classList.add("p-2");
        ///divajout.setAttribute("id","admin_ajout_form");
            var h2 = document.createElement("h2");
            h2.classList.add("text-center");
            h2.innerText = "Se Connecter";
            divajout.appendChild(h2);
            var perreur = document.createElement("p");
            perreur.setAttribute("id","erreur");
            divajout.appendChild(perreur);
            
            var form_conn = document.createElement("form");
            form_conn.setAttribute("ACTION","connexion.php");
            form_conn.setAttribute("method","post");

            var divinputajout = document.createElement("div");
            divinputajout.classList.add("admin_input_ajout");
            divinputajout.classList.add("row");
                var inputemail = document.createElement("input");
                inputemail.setAttribute("id","connexion_email");
                inputemail.setAttribute("type","text");
                inputemail.setAttribute("placeholder","Votre email");
                inputemail.setAttribute("value","email");
                inputemail.classList.add("w-75");
                inputemail.classList.add("d-flex");
                inputemail.classList.add("mx-auto");
                divinputajout.appendChild(inputemail);

                var inputpassword = document.createElement("input");
                inputpassword.setAttribute("id","connexion_password");
                inputpassword.setAttribute("type","password");
                inputpassword.setAttribute("placeholder","Votre mot de passe");
                inputpassword.setAttribute("value","password");
                inputpassword.classList.add("w-75");
                inputpassword.classList.add("d-flex");
                inputpassword.classList.add("mx-auto");
                divinputajout.appendChild(inputpassword);

            form_conn.appendChild(divinputajout);

            var btn_creer_compte = document.createElement("button");
            btn_creer_compte.classList.add("d-flex");
            btn_creer_compte.classList.add("mx-auto");
            btn_creer_compte.classList.add("m-2");
            btn_creer_compte.setAttribute("onclick","CreerCompte()");
            btn_creer_compte.innerText = "Créer un compte";
            form_conn.appendChild(btn_creer_compte);

            var button_connexion = document.createElement("button");
            button_connexion.setAttribute("onclick","Connexion()");
            button_connexion.setAttribute("type","submit")
            button_connexion.setAttribute("value","Se Connecter");
            button_connexion.innerText = "Se connecter";
            button_connexion.classList.add("m-2");
            button_connexion.classList.add("d-flex");   
            button_connexion.classList.add("mx-auto");
            form_conn.appendChild(button_connexion);
            
            divajout.appendChild(form_conn);

            var button_fermer = document.createElement("button");
            button_fermer.setAttribute("onclick","FermerConnexion()");
            button_fermer.innerText = "Annuler";
            button_fermer.classList.add("m-2");
            button_fermer.classList.add("d-flex");   
            button_fermer.classList.add("mx-auto");
            divajout.appendChild(button_fermer);

        divcontenu.appendChild(divajout);
    }else{
        //affichage
        document.getElementById("pop-up-connexion").classList.remove("hidden");
    }
    
}

/*
    Permet de se connecter
*/
function Connexion(){

}

/* 
    Ferme la pop up de connexion
*/
function FermerConnexion(){
    document.getElementById("pop-up-connexion").classList.add("hidden");
}

/* Affiche la pop-up creer compte*/
function CreerCompte(){
    var divcontenu = document.getElementsByClassName("contenu")[0];
    var popupco = document.getElementById("pop-up-connexion");
    popupco.classList.add("hidden");
    if(document.getElementById("pop-up-creation-compte") == null){
        //Creation de la popup
        //div pop up ajout
        var divajout = document.createElement("div");
        //divajout.classList.add("hidden");
        divajout.classList.add("position-fixed");
        divajout.classList.add("start-50");
        divajout.classList.add("top-50");
        divajout.classList.add("admin_mode_ajout");
        divajout.classList.add("w-50");
        divajout.classList.add("text-clair");
        divajout.classList.add("bg-fonce");
        divajout.classList.add("p-2");
        divajout.setAttribute("id","pop-up-creation-compte");
            var h2 = document.createElement("h2");
            h2.classList.add("text-center");
            h2.innerText = "Créer un compte";
            divajout.appendChild(h2);
            var perreur = document.createElement("p");
            perreur.setAttribute("id","erreur");
            divajout.appendChild(perreur);

            var divinputajout = document.createElement("div");
            divinputajout.classList.add("admin_input_ajout");
            divinputajout.classList.add("row");
                var input_nom = document.createElement("input");
                input_nom.setAttribute("id","connexion_creer_nom");
                input_nom.setAttribute("type","text");
                input_nom.setAttribute("placeholder","Votre nom");
                input_nom.classList.add("w-75");
                input_nom.classList.add("d-flex");
                input_nom.classList.add("mx-auto");
                divinputajout.appendChild(input_nom);

                var inputemail = document.createElement("input");
                inputemail.setAttribute("id","connexion_creer_email");
                inputemail.setAttribute("type","email");
                inputemail.setAttribute("placeholder","Votre email");
                inputemail.classList.add("w-75");
                inputemail.classList.add("d-flex");
                inputemail.classList.add("mx-auto");
                divinputajout.appendChild(inputemail);

                var inputpassword = document.createElement("input");
                inputpassword.setAttribute("id","connexion_creer_password");
                inputpassword.setAttribute("type","password");
                inputpassword.setAttribute("placeholder","Votre mot de passe");
                inputpassword.classList.add("w-75");
                inputpassword.classList.add("d-flex");
                inputpassword.classList.add("mx-auto");
                divinputajout.appendChild(inputpassword);

            divajout.appendChild(divinputajout);

            var btn_creer_compte = document.createElement("button");
            btn_creer_compte.classList.add("d-flex");
            btn_creer_compte.classList.add("mx-auto");
            btn_creer_compte.classList.add("m-2");
            btn_creer_compte.setAttribute("onclick","CreerCompte()");
            btn_creer_compte.innerText = "Créer un compte";
            divajout.appendChild(btn_creer_compte);

            var button_retour = document.createElement("button");
            button_retour.setAttribute("onclick","InitConnexion()");
            button_retour.innerText = "Annuler";
            button_retour.classList.add("m-2");
            button_retour.classList.add("d-flex");   
            button_retour.classList.add("mx-auto");
            divajout.appendChild(button_retour);
        divcontenu.appendChild(divajout);
    }else{
        document.getElementById("pop-up-creation-compte").classList.remove("hidden");
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
        admin_modif_form.classList.add("position-fixed");
        admin_modif_form.classList.add('start-50');
        admin_modif_form.classList.add('top-50');
        admin_modif_form.classList.add("w-50");
        admin_modif_form.classList.add("text-clair");
        admin_modif_form.classList.add("bg-fonce");
        admin_modif_form.classList.add("p-2");
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
        document.getElementsByClassName("contenu")[0].insertBefore(admin_modif_form, document.getElementsByClassName("jumbo-father")[0].nextElementSibling);
    }

/*Contacte pas vraiment le propriétaire du site mais fais l'illusion pour faire joli */
function Contacter(){
    InitContact();
    //var divcontenu = document.getElementsByClassName("contenu")[0];
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
            InitDestination();
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
    InitDestination();
    for(var i = 0; i< document.getElementsByClassName("admin_mode").length; i++){
        document.getElementsByClassName("admin_mode")[i].classList.remove("hidden");
    }
    if(document.getElementById('admin_mode_modif') != null){
        document.getElementById('admin_mode_modif').classList.add("hidden");
    }
    
}

function Supprimer(obj){
    var indexOfObject = destinations['destination'].findIndex(obj => {
        return obj.pays === obj['pays'];
    });
    destinations['destination'].splice(indexOfObject, 1);
    InitDestination();
    for(var i = 0; i< document.getElementsByClassName("admin_mode").length; i++){
        document.getElementsByClassName("admin_mode")[i].classList.remove("hidden");
    }
    if(document.getElementById('admin_mode_modif') != null){
        document.getElementById('admin_mode_modif').classList.add("hidden");
    }
}
