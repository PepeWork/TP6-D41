
// Variables globales
var camera, scene, renderer, mesh;

//        Gestion du temps
var horloge, alpha;



// Fonction d'initalisation
function init() {
    // Lancement de l'horloge
    horloge = new THREE.Clock();
    horloge.start();

//        Plusieurs types de camera, la on utilise perspectivecamera
    // https://threejs.org/docs/#api/cameras/PerspectiveCamera
    camera = new THREE.PerspectiveCamera( ?? );
    //la caméra est un peu proche non? je vous conseille de la reculer
    // info : elle regarde dans la même direction que l'axe Z
    camera. ??

    // création d'une scène, il faut bien mettre notre cube quelque part
    scene = new THREE.Scene();

    // Texture de la boxe
    var texture = new THREE. ??  // fichier 'textures/crate.gif'
    var material = new THREE. ??

    // définition du modèle géométrique de la boite
    var geometry = new THREE. ??

    // objet Mesh (forme et texture) dérivé d'un object3D
    mesh = new THREE. ??

    //ajout de l'objet à la scène
    scene.add( mesh );


    SphereEtLumiere();


    UnObjetDeplacable();


    //rendu de la scène dans la vue webgl
    renderer = new THREE.WebGLRenderer();
    //voir les attributs js de window.  tels que devicePixelRatio, innerWidth, innerHeight
    renderer.setPixelRatio( ?? );
    renderer.setSize( ?? );
    //intégration de la vue dans le document html
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

    //fin de l'initialisation on lance la fonction animate qui tournera en boucle pour rafraichir l'image à l'écran
    //en utilisant requestAnimationFrame on optimise le fonctionnement de la boucle en évitant que le code s'exécute si l'onglet n'est pas actif
    requestAnimationFrame(animate);
}

function onWindowResize() {
    // si je dis affichage 16/9ème ou 4/3 ça doit sans doute vous parler, camera.aspect se charge de conserver un affichage sans déformation ici malgré une vue de taille variable
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

var nAngleRotation = 0.6 ;

//    Mouvement/Animation du cube
function animate() {
    //delta c'est le temps écoulé depuis la dernière frame
    delta = horloge. ?? ;
    // je veux faire tourner le cube sur lui-même sur 2 axes quelconques, delta et nAngleRotation sont vos alliés
    mesh.???? +=  ??  // Axe A
    mesh.???? +=  ??  // Axe B

    //mise à jour de la vue
    renderer.render( scene, camera );
    //appel de animate, notre boucle interminable, voyez https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame
    requestAnimationFrame( animate );
}



function SphereEtLumiere()
{
    //géométrie d'une sphère

    //material compatible lumière

    //l'objet Mesh

    // ajout de l'objet à la scène

    //positionnement de la sphère

    //retournez dans la fonction init pour changer la position de la caméra si vous ne voyez pas bien la sphère

    //que la lumière soit (ambientlight à créer)

    //et la lumière fut (on l'ajoute à la scène)

}

function UnObjetDeplacable()
{
    // suivez les indications dans le pdf
    // Gestion des contrôles sur le cube et la sphère (prend UNE LISTE D'OBJETS EN PARAMETRES) avec dragControls


}


// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
// Lancement
$(document).ready(init);

/* alternatives :
$(init);

$(document).ready(function () {
    init();
});
*/