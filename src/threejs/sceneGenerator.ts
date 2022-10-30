import {
  Scene,
  DirectionalLight,
  PerspectiveCamera,
  TextureLoader,
  WebGLRenderer,
  LoadingManager,
  PlaneGeometry,
  Vector2,
  ShaderMaterial,
  Mesh
} from 'three';

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

import { isClient } from '@/utils/browser';
import { tick, sizes } from './threeUtils';

const cursor = {
  x: 0,
  y: 0
}

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { GUI } from 'dat.gui'

// Debug
// const gui = new GUI()

let planeGeo: PlaneGeometry | null = null;
let renderer: WebGLRenderer | null = null
let material: ShaderMaterial | null = null

let scene: Scene | null = null;
const manager = new LoadingManager()
const textureLoader = new TextureLoader(manager);

//Loaders
export function configureScene(element: HTMLElement) {
  console.log('STARTED')

  textureLoader.load('/typescript.svg')
  
    
  if (scene) scene = null
  scene = new Scene()
  
  //Loading Manager
  manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    
    //displayProgressOnScreen()
  };
  
  manager.onLoad = function ( ) {
    console.log('Loading complete!');
    //hideProgress()
    render(element)
  };
  
  manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

    //updateProgressOnScreen()
  };
  
  manager.onError = function ( url ) {
    console.log('There was an error loading ' + url);
    //displayErrorOrFallback()
  };
}




function render(element: HTMLElement) {
  // Canvas
  const canvas = element;
  if (!scene) return;


  const uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new Vector2(screen.width, screen.height) },
    u_mouse: { type: "v2", value: new Vector2(cursor.x, cursor.y) }
};
  

  // Geometries
  if (!planeGeo) planeGeo = new PlaneGeometry(1, 1, 1, 1)
  

  // Materials

  if(!material) material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader
  })


  // Mesh
  const plane = new Mesh(planeGeo, material)
  scene.add(plane);

  // Lights
  const mainLight = new DirectionalLight(0xffffff, 1);


  scene.add(mainLight);

  /**
   * Camera
   */
  // Base camera
  const camera = new PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    50
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 2;
  scene.add(camera);

  // Controls
  // const controls = new OrbitControls(camera, canvas)
  // controls.enableDamping = true

  /**
   * Renderer
   */

  if (!renderer) renderer = new WebGLRenderer({
    canvas: canvas,
    // alpha: true,
    antialias: true
  });

  renderer.setSize(sizes.width, sizes.height);
  if (isClient) {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  console.log("New Renderer")

  /**
   * Events & Animations
   */

   if (isClient) {
    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer?.setSize(sizes.width, sizes.height);
      renderer?.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    });
     
     window.addEventListener('mousemove', (event) => {
       cursor.x = Math.cos((event.clientX/window.innerWidth) * Math.PI)
       cursor.y = Math.cos(event.clientY / window.innerHeight * Math.PI)
     })

     renderer.render(scene, camera);
  }

  tick((elapsedTime: number) => {
    uniforms.u_time.value = elapsedTime;
    if (scene && renderer) {
      renderer.render(scene, camera);
    }
  });
}
