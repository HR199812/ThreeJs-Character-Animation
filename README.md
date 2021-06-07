# ThreeJs-Character-Animation

Animating a 3D fbx extension character using ThreeJS.
This code is written using a FBX extension of the character that is animated. 
We can also use a GLTF extensino to do the same.

Here's the code snippet that will help you to load a GLTF model in the code.


let gtlfModelLoader = new GLTFLoader();
let gtlfModel;
gtlfModelLoader.load('GLTF-file-path-inside-project', (gltf) => {

    gtlfModel = gltf.scene.children[0];
    gtlfModel.scale.set(55, 40, 40);
    gtlfModel.position.set(550, -175, 750);
    scene.add(gtlfModel);
});
