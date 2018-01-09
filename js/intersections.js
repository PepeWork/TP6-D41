var container;
var camera, controls, scene, renderer;
var horloge ;

var material1;
var material2 ;

var nLARGEUR_TERRAIN = 17;
var nLONGUEUR_TERRAIN= 24;
var nLARGEUR_BOITE = 2;
var nVitesseMax = 17;

// Terrain
var hBoiteBas, hBoiteGauche, hBoiteDroite, hBoiteHaut;
var mBoiteBas, mBoiteGauche, mBoiteDroite, mBoiteHaut;

// Boite de jeu / barre à déplacer
var hBoiteJeu, mBoiteJeu;

// balle
var hSphereMouvante, mSphereMouvante;
var hPlanSouris ;



// Fonction d'initialisation
function init() {
    horloge = new THREE.Clock();
    horloge.start();


    // Ajout d'un container pour la vue webgl
    container = document.createElement( 'div' );
    container.id = "cont_vue" ;
    document.body.appendChild( container );

    // créez la caméra ici
    camera = ??
    // placez là en x0 y0 z14
    camera. ??

    // Gestion des controles sur la camera
    controls = new THREE.TrackballControls( camera );

    // Créez la scene
    scene = ??

    // créez et ajoutez une lumière ambiante, couleur quelconque, intensité faible, 10% par exemple
    scene.add( ?? );

//   Ajout d'un spot de lumière
    var spotlight = ??
    // placez le en y20 et z16
    spotlight. ??
    // l'angle d'ouverture est en radian, on veut un petit angle, 18° par exemple
    spotlight. ??
    //ajout de la lumière à la scène
    scene.add( ?? );

    // ---------- Creation du terrain
    // déclaration de la géométrie commune à nos objets
    // on veut une boite standard 1 mètre cube
	var geometry_boite =  ??
    // texture : 'textures/cracked_earth_texture_196488.jpg'
    var texture = ??
    // on veut un material avec la texture créée plus tôt mais de type MeshPhongMaterial pour qu'il reçoive les lumières de la scène
    material1 = ??

    
    //déclaration des objets de la scène, des THREE.Mesh héritant d'Object3D
    hBoiteBas = ??
	hBoiteBas.scale.set(nLARGEUR_TERRAIN, nLARGEUR_BOITE, nLARGEUR_BOITE);
    hBoiteHaut = ??
	hBoiteHaut.scale.set(nLARGEUR_TERRAIN, nLARGEUR_BOITE, nLARGEUR_BOITE);
    hBoiteGauche = ??
	hBoiteGauche.scale.set(nLARGEUR_BOITE, nLONGUEUR_TERRAIN, nLARGEUR_BOITE);
    hBoiteDroite = ??
	hBoiteDroite.scale.set(nLARGEUR_BOITE, nLONGUEUR_TERRAIN, nLARGEUR_BOITE);
    // ---------- Fin de création du terrain

    // ajout d'une petite boite, une barre
    hBoiteJeu = ??
	hBoiteJeu.scale.set(4, 0.2, 2);

    // plan pour déterminer les coordonnées d'un clic de souris
    // on va créer une boite particulière elle devra être transparente MAIS garder son attribut visible true
	hPlanSouris = new THREE.Mesh(geometry_boite);
	hPlanSouris.scale.set(nLARGEUR_TERRAIN*1.2,nLONGUEUR_TERRAIN*1.1, 2 ) ;
    hPlanSouris.position.y = nLONGUEUR_TERRAIN/2 ;

    // on voit plus rien, quelqu'un a mis une grosse boite au milieu de l'écran
    hPlanSouris. ??
    hPlanSouris. ??

    //la balle
	var geometry2 = ??
    hSphereMouvante = new THREE.Mesh( ? );
    //maintenant que notre sphère est créée on va changer l'orientation du spotlight pour éclairer cette balle, voir attribut target


	//ajout des objets à la scène, murs barre balle et plan pour la souris
    scene.add( ? )
    ...

    //version math des objets
        // la sphère a un "collider" Box3 au lieu de Sphere car la fonction de détection de collisions de Three.js est défectueuse avec les sphères
    mSphereMouvante = ??
    mBoiteBas = ??
    mBoiteHaut = ??
    mBoiteGauche = ??
    mBoiteDroite = ??
    mBoiteJeu = ??

    // Gestion du renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild( renderer.domElement );
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

    // répercusion des dimensions et positions des Mesh sur les mBox3 correspondant
    mSphereMouvante.??
    mBoiteBas.??
    mBoiteHaut.??
    mBoiteGauche.??
    mBoiteDroite.??
    mBoiteJeu.??



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

    //exemple
    // if(hBoiteMouvante.position.y < -5 )
    //     nDirection = 1 ; // on va dans un sens
    // if (hBoiteMouvante.position.y > 7 )
    //     nDirection = -1; // on va dans l'autre sens


    //déplacement sur x et y de la balle dans la scène, distance parcourue = vitesse * temps écoulé
    // utilisé vDirection nVitesse et nDelta
    hSphereMouvante. ??
    hSphereMouvante. ??

    //déplacement fait, on vérifie les collisions
        //d'abord on met à jour les coords des objets mouvants avec leur version mathématique
    mSphereMouvante. ??
    mBoiteJeu. ??

    //détection des collisions selon les murs
    var bCollisionBas = ??
    var bCollisionHaut = ??
    var bCollisionGauche = ??
    var bCollisionDroite = ??

    // Collision avec la boite de jeu
    var bCollisionJeu = ??

    // Comment la balle change de direction en fonction des collisions

    if .......


    // Si collision avec la barre le changement de direction sera différent selon la position relative entre la balle et la barre
    // balle au dessus, à gauche à droite, en dessous? au moment de la collision
    // aussi appelez la fonction acceleration à chaque collision avec la barre pour augmenter la vitesse
    if (bCollisionJeu)
		if .......

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
    // voir https://threejs.org/docs/#api/core/Raycaster.setFromCamera
    raycast. ??
    // voir intersects de raycast
    var intersection = ??

    // si intersection
    if ??
    {
        // on peut simplement remplacer la coordonnée en x de la barre par celle de ce point de l'espace
    }
}


function stopMovingBar(data)
{

}

$(document).ready(function()
{
    init();
    requestAnimationFrame(animate);


    $("#cont_vue")
        .mousedown(startMovingBar)
        .mouseup(stopMovingBar)
    ;
});


