
// Variables globales
var camera, scene, renderer, mesh;

//        Gestion du temps
var horloge, alpha;



// Fonction d'initalisation
function init() {
//            Lancement de l'horloge
    horloge = new THREE.Clock();
    horloge.start();

//        Plusieurs types de camera, la on utilise perspectivecamera
//        Pour le premier élément:
//        Point de vue en degrés (A VERIFIER)
//        Pour le second element:
//        You almost always want to use the width of the element divided by the height, or you'll get the same result as
//        when you play old movies on a widescreen TV - the image looks squished.

    // Le premier paramètre représente le champs de vision fov
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100 );
    camera.position.z = 4;
    scene = new THREE.Scene();

//        Texture de la boxe
    var texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
    var material = new THREE.MeshBasicMaterial( { map: texture } );

    //        Dimension de la box
    var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );

//            Maillage de l'objet (forme et texture)
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );


    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    //
    window.addEventListener( 'resize', onWindowResize, false );

    //boucle, update régulier de l'afficahge à l'écran
    requestAnimationFrame(animate);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

//    Mouvement/Animation du cube
function animate() {
    alpha = horloge.getDelta();
    mesh.rotation.x += 0.01*alpha*60;
    mesh.rotation.y += 0.01*alpha*60;
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}

// Lancement
$(document).ready(init);
// $(init) ;
