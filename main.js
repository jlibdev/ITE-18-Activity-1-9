import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight // Corrected here
};

const camera = new THREE.PerspectiveCamera(
    75, sizes.width / sizes.height
);
camera.position.z = 3;
scene.add(camera);

const count = 50

const geometry = new THREE.BufferGeometry()

// const positionsArray = new Float32Array([
//     0,0,0,
//     0,1,0,
//     0,0,0,

//     0,0,0,
//     1/2, Math.sqrt(3)/2,0,
//     0,0,0,

//     0,0,0,
//     Math.sqrt(2)/2,Math.sqrt(2)/2,0,
//     0,0,0,

//     0,0,0,
//     Math.sqrt(3)/2,1/2,0,
//     0,0,0,

//     0,0,0,
//     1,0,0,
//     0,0,0,


// ])

const positionsArray = new Float32Array(count*3*3)

for (let i = 0 ; i < count*3*3 ; i++){
    positionsArray[i] = (Math.random() - 0.5) * 4
     
}


console.log(positionsArray)

const positionsAttribute = new THREE.BufferAttribute(positionsArray,3)

geometry.setAttribute('position', positionsAttribute)

const cGeometry = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({color: 0xeb6b34, wireframe: true})
)
scene.add(cGeometry);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});


renderer.setSize(sizes.width, sizes.height);

window.addEventListener('resize', ()=>{
    // Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', ()=>{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullscreenElement){
        if (canvas.requestFullscreen){
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen()
        }
    }
    else{
        if(document.exitFullscreen){
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})
const controls = new OrbitControls(camera, canvas)

const tick = () =>{
    controls.update()
    renderer.render( scene , camera );
    window.requestAnimationFrame(tick)
}

tick()
