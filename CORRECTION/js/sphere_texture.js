
// Variables globales
var scene, camera, renderer, texture, geometry, material, sphere;
//    Gestion du temps
var horloge, alpha;



// Fonction d'initialisation
function init(){
    // Horloge
    horloge = new THREE.Clock();
    horloge.start();

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    texture = new THREE.TextureLoader().load( 'textures/cracked_earth_texture_196488.jpg' );
    geometry = new THREE.SphereBufferGeometry( 1, 32, 32 );
    material = new THREE.MeshBasicMaterial( { map: texture } );
    sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
    camera.position.z = 7;

    // Determine la taille de la fenetre
    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

// Fonction d'animation
function animate(){
    alpha = horloge.getDelta();
    sphere.rotation.y += 0.01*alpha*60;
    renderer.render(scene, camera);
    // Demande au navigateur de faire d'effectuer une fonction spécifique de maj de l'animation (ici la fonction animate)
    // A appeler dès que l'image est prête
    requestAnimationFrame( animate );
}

$(document).ready(function()
{
    init();
    requestAnimationFrame(animate);
});
