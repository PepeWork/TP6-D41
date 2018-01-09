var container;
var camera, controls, scene, renderer;
var horloge ;
//boite déplacable
// var hBoiteMouvante ;
var material2 ;
var material1;

// Terrain
var hBoiteBas, hBoiteGauche, hBoiteDroite, hBoiteHaut;
var mBoiteBas, mBoiteGauche, mBoiteDroite, mBoiteHaut;

// Boite de jeu
var hBoiteJeu, mBoiteJeu;

var nLARGEUR_TERRAIN = 17;
var nLONGUEUR_TERRAIN= 25;
var nLARGEUR_BOITE = 2;
var nVitesseMax = 17;

var hSphereMouvante, mSphereMouvante;
var hPlanSouris ;

var spotlight ;

// Fonction d'initialisation
function init() {
    horloge = new THREE.Clock();
    horloge.start();


    // Ajout d'un container qui contiendra notre objet draggable
    container = document.createElement( 'div' );
    container.id = "cont_vue" ;
    document.body.appendChild( container );

    // Gestion de la camera
    camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 100 );
    camera.position.z = 14;
    // camera.position.y = nLONGUEUR_TERRAIN / 2;

    // Gestion des controles sur la camera
    controls = new THREE.TrackballControls( camera );

    // Creation de la scene
    scene = new THREE.Scene();

//   Ajout d'une lumière ambiante
    scene.add( new THREE.AmbientLight(0xFBD300, 0.1) );

//   Ajout d'un spot de lumière
    spotlight = new THREE.SpotLight( 0xffffff, 1.5 );
    spotlight.position.set( 0, 20, 16 );
    spotlight.angle = Math.PI/10;
    // light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 50, 1, 200, 10000 ) );
    // light.shadow.mapSize.width = 1024;
    // light.shadow.mapSize.height = 1024;
    scene.add( spotlight );

    // Creation des composantes de l'objet

    // Creation du terrain
    //var geometry_boite = new THREE.BoxGeometry(nLARGEUR_TERRAIN, 2, 2);
	var geometry_boite = new THREE.BoxGeometry(1, 1, 1);
    //var geometry_boite2 = new THREE.BoxGeometry(2, nLONGUEUR_TERRAIN,2);
    //var geometry_boite_jeu = new THREE.BoxGeometry(4,0.2,2);
    var texture = new THREE.TextureLoader().load( 'textures/cracked_earth_texture_196488.jpg' );
    material1 = new THREE.MeshPhongMaterial( { map: texture } );

    
    //déclaration des objets de la scène, des THREE.Mesh héritant de Object3D
    hBoiteBas = new THREE.Mesh(geometry_boite, material1);
	hBoiteBas.scale.set(nLARGEUR_TERRAIN, nLARGEUR_BOITE, nLARGEUR_BOITE);
    hBoiteHaut = new THREE.Mesh(geometry_boite, material1);
	hBoiteHaut.scale.set(nLARGEUR_TERRAIN, nLARGEUR_BOITE, nLARGEUR_BOITE);
    hBoiteGauche = new THREE.Mesh(geometry_boite, material1);
	hBoiteGauche.scale.set(nLARGEUR_BOITE, nLONGUEUR_TERRAIN, nLARGEUR_BOITE);
    hBoiteDroite = new THREE.Mesh(geometry_boite, material1);
	hBoiteDroite.scale.set(nLARGEUR_BOITE, nLONGUEUR_TERRAIN, nLARGEUR_BOITE);
    hBoiteJeu = new THREE.Mesh(geometry_boite, material1);
	hBoiteJeu.scale.set(4, 0.2, 2);

	hPlanSouris = new THREE.Mesh(geometry_boite);
	hPlanSouris.scale.set(nLARGEUR_TERRAIN*1.2,nLONGUEUR_TERRAIN*1.1, 2 ) ;
	hPlanSouris.position.y = nLONGUEUR_TERRAIN/2 ;
    // hPlanSouris.visible = false;
    hPlanSouris.material.transparent = true;
    hPlanSouris.material.opacity = 0 ;


	var geometry2 = new THREE.SphereBufferGeometry( 1, 16, 16 );
    //material2 = new THREE.MeshBasicMaterial( { map: texture } );
    hSphereMouvante = new THREE.Mesh( geometry2, material1 );
	
	//ajout des objets à la scène
    // scene.add( hBoiteMouvante );
    scene.add( hSphereMouvante );
    scene.add(hBoiteBas);
    scene.add(hBoiteHaut);
    scene.add(hBoiteGauche);
    scene.add(hBoiteDroite);
    scene.add(hBoiteJeu);
    scene.add(hPlanSouris);

    //version math des objets
    mSphereMouvante = new THREE.Box3(); // la sphère a un "collider" Box3 au lieu de Sphere car la fonction de détection de collisions de Three.js est défectueuse avec les sphères
    mBoiteBas = new THREE.Box3();
    mBoiteHaut = new THREE.Box3();
    mBoiteGauche = new THREE.Box3();
    mBoiteDroite = new THREE.Box3();
    mBoiteJeu = new THREE.Box3();

    // Gestion du renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild( renderer.domElement );

    // Gestion des controle sur le cube
    // var dragControls = new THREE.DragControls( hBoiteStatique1, camera, renderer.domElement );
    // dragControls.addEventListener( 'dragstart', function ( event ) { controls.enabled = false; } );
    // dragControls.addEventListener( 'dragend', function ( event ) { controls.enabled = true; } );

    // Determine la taille de la fenetre
    window.addEventListener( 'resize', onWindowResize, false );


    //placement initial boite mouvante
    hSphereMouvante.position.set(0,5,0);
    hBoiteBas.position.set(0,-nLARGEUR_BOITE/2,0);
    //+1/-1 pour la largeur des boites
    hBoiteHaut.position.set(0, nLONGUEUR_TERRAIN +nLARGEUR_BOITE/2,0);
    hBoiteGauche.position.set(-nLARGEUR_TERRAIN/2 -nLARGEUR_BOITE/2, nLONGUEUR_TERRAIN/2,0);
    hBoiteDroite.position.set(nLARGEUR_TERRAIN/2 + nLARGEUR_BOITE/2, nLONGUEUR_TERRAIN/2,0);
    hBoiteJeu.position.set(0,4,0);

    mSphereMouvante.setFromObject(hSphereMouvante);
    mBoiteBas.setFromObject(hBoiteBas);
    mBoiteHaut.setFromObject(hBoiteHaut);
    mBoiteGauche.setFromObject(hBoiteGauche);
    mBoiteDroite.setFromObject(hBoiteDroite);
    mBoiteJeu.setFromObject(hBoiteJeu);

    spotlight.target = hSphereMouvante;

}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

var nVitesse = 12 * 0.6 ;
var vDirection = new THREE.Vector2(-1,-1) ;

// Fonction animation
function animate() {
    var nDelta = horloge.getDelta();

    // if(hBoiteMouvante.position.y < -5 )
    // {
    //     nDirection = 1 ; // on remonte
    // }
    //
    // if (hBoiteMouvante.position.y > 7 ) {
    //     nDirection = -1;
    // }

    resetBalleSortie();

    hSphereMouvante.position.y += nDelta * ( vDirection.y * nVitesse) ;
    hSphereMouvante.position.x += nDelta * ( vDirection.x * nVitesse) ;

    //déplacement fait, on vérifie les collisions
        //d'abord on met à jour les coords des objets mouvants
    mSphereMouvante.setFromObject(hSphereMouvante);
    mBoiteJeu.setFromObject(hBoiteJeu);

    var bCollisionBas = mSphereMouvante.intersectsBox(mBoiteBas) ;
    var bCollisionHaut = mSphereMouvante.intersectsBox(mBoiteHaut)  ;
    var bCollisionGauche = mSphereMouvante.intersectsBox(mBoiteGauche);
    var bCollisionDroite = mSphereMouvante.intersectsBox(mBoiteDroite);

    // Collision avec la boite de jeu
    var bCollisionJeu = mSphereMouvante.intersectsBox(mBoiteJeu);

    if (bCollisionBas) {
        vDirection.y = 1;
        acceleration();
        //reset balle
    }
    else if (bCollisionHaut){
        vDirection.y = -1 ;
        acceleration();
    }

    if (bCollisionGauche){
        vDirection.x = 1;
        acceleration();
    }
    else if (bCollisionDroite){
        vDirection.x = -1;
        acceleration();
}
    // Si collision avec la barre
    if (bCollisionJeu)
		if (hSphereMouvante.position.y >= (hBoiteJeu.position.y)) // si balle au dessus de la barre
            vDirection.y = 1;
		else if (vDirection.y == -1) // sinon, balle en dessous et si descendante, on inverse direction gauche droite
            vDirection.x = -vDirection.x;
		else if (vDirection.y == 1) // sinon, en dessous en train de remonter alors la balle rebondit vers le bas
            vDirection.y = -vDirection.y;

    render();
    requestAnimationFrame( animate );
}
function render() {
    controls.update();
    renderer.render( scene, camera );
}

function acceleration(){
    if (nVitesse<nVitesseMax)
        nVitesse += 1;
}

$(document).ready(function()
{
    init();
    requestAnimationFrame(animate);


    $( "#cont_vue" )
        .mousedown(startMovingBar)
        .mouseup(stopMovingBar)
    ;
});


function startMovingBar(data)
{
    //récupération position de la souris/doigt
    // alert("X " + data.pageX + " | " + data.pageY );

    var rect = container.getBoundingClientRect();
    var souris = new THREE.Vector2(0,0);

    souris.x = ( ( data.clientX - rect.left ) / rect.width ) * 2 - 1;
    souris.y = - ( ( data.clientY - rect.top ) / rect.height ) * 2 + 1;
    // alert (souris.x + " " +souris.y);

    var raycast = new THREE.Raycaster() ;
    raycast.setFromCamera(souris, camera);
    var intersection = raycast.intersectObject(hPlanSouris, false);
    if (intersection.length > 0)
    {
        nSourisX = intersection[0].point.x ;
        if (nSourisX < hBoiteJeu.position.x ) //clic à gauche de la barre
        {
            hBoiteJeu.position.x = nSourisX;
        }else
        {
            hBoiteJeu.position.x = nSourisX;
        }
    }
}


function stopMovingBar(data)
{

}

function resetBalleSortie()
{
    if (hSphereMouvante.position.x < -(nLARGEUR_TERRAIN/2)-5 || hSphereMouvante.position.x > (nLARGEUR_TERRAIN/2)+5
    || hSphereMouvante.position.y < -5 || hSphereMouvante.position.y > nLONGUEUR_TERRAIN+5 )
        hSphereMouvante.position.set(0,7,0);
}
