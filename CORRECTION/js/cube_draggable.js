var container;
var camera, controls, scene, renderer;
var objects = [];


// Fonction d'initialisation
function init() {
    // Ajout d'un container qui contiendra notre objet draggable
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    // Gestion de la camera
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100 );
    camera.position.z = 7;

    // Gestion des controles sur la camera
    controls = new THREE.TrackballControls( camera );

    // Creation de la scene
    scene = new THREE.Scene();

//   Ajout d'une lumière ambiante
    scene.add( new THREE.AmbientLight( 0x505050 ) );

//   Ajout d'un spot de lumière
    var light = new THREE.SpotLight( 0xffffff, 1.5 );
    light.position.set( 0, 500, 2000 );
    light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 50, 1, 200, 10000 ) );
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    scene.add( light );

// Creation de l'objet
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var texture = new THREE.TextureLoader().load( 'textures/cracked_earth_texture_196488.jpg' );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    objects.push(mesh);


    // Gestion du renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;


    container.appendChild( renderer.domElement );

    // Gestion des controle sur la cube (prend UNE LISTE D'OBJETS EN PARAMETRES)
    var dragControls = new THREE.DragControls( objects, camera, renderer.domElement );
    dragControls.addEventListener( 'dragstart', function ( event ) { controls.enabled = false; } );
    dragControls.addEventListener( 'dragend', function ( event ) { controls.enabled = true; } );

    // Determine la taille de la fenetre
    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

// Fonction animation
function animate() {
    render();
    requestAnimationFrame( animate );
}
function render() {
    controls.update();
    renderer.render( scene, camera );
}


$(document).ready(function()
{
    init();
    requestAnimationFrame(animate);
});
