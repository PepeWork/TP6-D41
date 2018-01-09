var container;
var camera, controls, scene, renderer;
var horloge ;
var objects = [] ;
//objet importé dans la scène
var hImport ;
var bFileLoaded = false;


// Bouton permettant le retour à l'écran d'accueil
$(document).ready(function () {
    $('#button_cube_texture').click(function () {
        $("body").load("index.html");
    })
});



// Fonction d'initialisation
function init() {
    horloge = new THREE.Clock();
    horloge.start();


    // Ajout d'un container qui contiendra notre objet draggable
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    // Gestion de la camera
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 10;

    // Gestion des controles sur la camera
    controls = new THREE.TrackballControls( camera );

    // Creation de la scene
    scene = new THREE.Scene();

//   Ajout d'une lumière ambiante
    scene.add( new THREE.AmbientLight( 0x505050 ,  2) );

//   Ajout d'un spot de lumière
    var light = new THREE.SpotLight( 0xffffff, 1.5 );
    light.position.set( 0, 50, 200 );
    // light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 50, 1, 200, 10000 ) );
    // light.shadow.mapSize.width = 1024;
    // light.shadow.mapSize.height = 1024;
    scene.add( light );

// Creation de l'objet
    var geometry = new THREE.BoxGeometry( 4, 4, 4 );
	var gBoiteMouvante = new THREE.BoxGeometry(6,1,4.5);
    var texture = new THREE.TextureLoader().load( 'textures/cracked_earth_texture_196488.jpg' );
    material1 = new THREE.MeshBasicMaterial( { map: texture } );
    material2 = new THREE.MeshBasicMaterial( {wireframe:true} );



//
//     var loader = new THREE.OBJLoader();
//
// // load a resource
//     loader.load(
//         // resource URL
//         "3d files/Pokeball_Obj.obj",
//         // called when resource is loaded
//         function ( object ) {
//
//             scene.add( object );
//             object.scale.set(0.05,0.05, 0.05);
//         },
//         // called when loading is in progresses
//         function ( xhr ) {
//
//             console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
//
//
//         },
//         // called when loading has errors
//         function ( error ) {
//
//             console.log( 'An error happened' );
//             alert('marche pas');
//
//         }
//     );


    // Gestion du renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild( renderer.domElement );

    // Gestion des controle sur la cube
    var dragControls = new THREE.DragControls( objects, camera, renderer.domElement );
    dragControls.addEventListener( 'dragstart', function ( event ) { controls.enabled = false; } );
    dragControls.addEventListener( 'dragend', function ( event ) { controls.enabled = true; } );

    // Determine la taille de la fenetre
    window.addEventListener( 'resize', onWindowResize, false );


    var loaderFichiers = new THREE.OBJLoader2();
    var sChemin = "3d_files/" ;

    var callbackOnLoad = function ( event ) {
        hImport = event.detail.loaderRootNode.clone() ;
        scene.add( hImport );
        objects.push(hImport);
        hImport.scale.set(0.02,0.02, 0.02);
        // light.target = hImport;
        bFileLoaded = true;
        // requestAnimationFrame(animate);
    };

    var chargementMateriel = function(materials)
    {
        loaderFichiers.setModelName( "Arc170" );
        loaderFichiers.setMaterials( materials );
        // loaderFichiers.setUseIndices( true );
        loaderFichiers.setDisregardNormals( false );
        loaderFichiers.getLogger().setDebug( true );
        loaderFichiers.load( sChemin+"Arc170.obj", callbackOnLoad, null, null, null, false );
    };


    loaderFichiers.loadMtl(sChemin+"Arc170.mtl", "vaisseau.mtl", null, chargementMateriel);

}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

var nVitesse = 0.4;

// Fonction animation
function animate() {
    var nDelta = horloge.getDelta();

    if (bFileLoaded)
        hImport.rotation.y += nVitesse*nDelta ;

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
