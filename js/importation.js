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
    // une horloge svp

    // Le container qui contiendra notre vue
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    // Gestion de la camera, vous savez faire
    camera =
    camera.position.z = 10;

    // Gestion des controles sur la camera
    controls = new THREE.TrackballControls( camera );

    // Creation de la scene
    scene =

    // Ajout d'une lumière ambiante, sait-on jamais, le material de l'objet importé peu en avoir besoin pour ne pas rester dans le noir
    // ou un spot qui regarde le cntre de la scène, voir l'attribut target et peut nécessiter un updateMatrixWorld
    scene.add( ?? );


    // Gestion du renderer, perdez pas de temps sur un copier/coller, c'est fait
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    // Gestion des controles sur la cube
    var dragControls = new THREE.DragControls( objects, camera, renderer.domElement );
    dragControls.addEventListener( 'dragstart', function ( event ) { controls.enabled = false; } );
    dragControls.addEventListener( 'dragend', function ( event ) { controls.enabled = true; } );

    // ajuste la taille de la fenetre
    window.addEventListener( 'resize', onWindowResize, false );


    //voilà, le coeur du problème
    var loaderFichiers = new THREE.OBJLoader2(); // objloader2 dérive de LoaderSupport
    var sChemin = "3d_files/" ;

    // Avant d'attaquer les deux fonctions qui suivent, allez directement après, ligne 95, pour comprendre ce qui se passe

    //fonction appelée lors du chargement d'un fichier via objLoader2.load(....)
    var callbackOnLoad = function ( event ) {
        // event.detail.loaderRootNode est notre Mesh en local
        hImport = ??
        scene.add( hImport );
        //c'est mieux si on peut le controler
        objects.push(hImport);

        // Un peu gros je vous conseille de réduire sa taille à 2%
        var nEchelle =
        hImport.scale.set(nEchelle, nEchelle, nEchelle);

        //une manière pas très propre de veiller à ce que votre boucle de màj n'agisse sur votre objet QUE s'il est chargé
        bFileLoaded = true;
    };

    //fonction appelée après le chargement du fichier mtl
    var chargementMateriel = function(materials)
    {
        loaderFichiers.setModelName( "Arc170" );

        // les materials de l'objet, oui il peut y en avoir plusieurs
        // https://threejs.org/docs/#examples/loaders/LoaderSupport.setMaterials
        loaderFichiers. ??

        // https://threejs.org/docs/#examples/loaders/OBJLoader2.setDisregardNormals,
        // vous testerez avec true et false pour voir la différence
        loaderFichiers. ??

        //toujours dérivé de loadersupport, mettez useIdices à true pour des questions de performance
        loaderFichiers. ??

        //très pratique , avec Ctrl+Maj+I sur votre navigateur, onglet console vous saurez pourquoi ça ne marche pas
        loaderFichiers.getLogger().setDebug( true );
        // voir la doc d'objLoader2 sur load, Info : sChemin+NomDuFichier.obj
        loaderFichiers.load( ??? );
    };

    //Dans l'ordre on charge le fichier des materials de l'objet ".mtl"
    //Une fois les materials chargés on chargera le fichier de l'objet ".obj"
    // Info : sChemin+NomDuFichier.mtl
    // pas de doc... voir le pdf
    loaderFichiers.loadMtl( ?? ,  ?? , null, ?? );

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
