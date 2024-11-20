import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();


const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () =>
    {
    console.log('loading started')
    }
    loadingManager.onLoad = () =>
    {
    console.log('loading finished')
    }
    loadingManager.onProgress = () =>
    {
    console.log('loading progressing')
    }
    loadingManager.onError = () =>
    {
    console.log('loading error')
    }

const textureLoader = new THREE.TextureLoader(loadingManager)

const colorTexture = textureLoader.load('/textures/Stone_Floor/basecolor.png')
colorTexture.center.x = 0.5
colorTexture.center.y = 0.5
colorTexture.repeat.y = 2
colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.magFilter = THREE.NearestFilter
// const heightTexture = textureLoader.load('public/textures/Stone_Floor/Stylized_Stone_Floor_010_height.png')
// const normalTexture = textureLoader.load('/textures/door/normal.jpg')
// const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
// const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const camera = new THREE.PerspectiveCamera(
    75, sizes.width / sizes.height
);
camera.position.z = 3;
scene.add(camera);

const geometry = new THREE.BoxGeometry(1, 2, 1)
const material = new THREE.MeshBasicMaterial({ map: colorTexture})

const mesh = new THREE.Mesh(
    geometry,
    material
)
scene.add(mesh);



const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});


renderer.setSize(sizes.width, sizes.height);



// EVENT LISTENERS
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
