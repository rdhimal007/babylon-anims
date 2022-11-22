var canvas = document.getElementById("renderCanvas");
var meshlist = [];
var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false }); };
var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    var newsphere = createSphere(0, 1, 0, 2);
    newsphere.material = hexMat('#ff0000');


    // create the object 
    var obj3 = createBox(2,1,2,2,2);
    obj3.material = hexMat('#e07a5f');

    var obj4 = createBox(1,0,0,1,22,2);
    obj4.material = hexMat('#f0ff16');
    
    var obj5 = createSphere(0,-4,0,3);
    obj5.material = hexMat('#75ff7e');

    var shark = new meshModel('./shark.glb', 0.9);

    // create animation
    var obj1 = {subj: newsphere.position, prop: 'y', val:5};
    var obj1_1 = {subj: newsphere.material, prop: 'al', val:0};

    var obj2_1 = {subj: obj3.rotation, prop: 'z', val:Math.PI/5};
    var obj2_2 = {subj: obj3.material, prop: 'al', val:0};

    var obj3_1 = {subj: obj4.rotation, prop: 'z', val:Math.PI/2};
    var obj3_2 = {subj: obj4.material, prop: 'al', val:0};

    var obj4_1 = {subj: obj5.rotation, prop: 'z', val:Math.PI/7};
    var obj4_2 = {subj: obj5.material, prop: 'al', val:0};

    var obj_7 = {subj: shark.position, prop: 'x', val: 7};
    // make array of animation object
    let arrayAnime = [obj1,obj1_1, obj2_1, obj2_2, obj3_1, obj3_2,  obj4_1, obj4_2,obj_7];

    // call and make animation
    animate(arrayAnime, scene, 2, true);

    // Our built-in 'ground' shape.
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    return scene;
};
window.initFunction = async function () {
    var asyncEngineCreation = async function () {
        try {
            return createDefaultEngine();
        } catch (e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return createDefaultEngine();
        }
    }

    window.engine = await asyncEngineCreation();
    if (!engine) throw 'engine should not be null.';
    startRenderLoop(engine, canvas);
    window.scene = createScene();
};
initFunction().then(() => {
    sceneToRender = scene
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});


