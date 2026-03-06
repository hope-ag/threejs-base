import GUI from 'lil-gui';
import { REVISION } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { uv, vec4 } from 'three/tsl';
import {
  AmbientLight,
  DoubleSide,
  LoadingManager,
  Mesh,
  MeshBasicNodeMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  // RenderPipeline,
  Scene,
  WebGPURenderer
} from 'three/webgpu';

export interface RendererOptions {
  node: HTMLElement;
  autoPlay?: true;
}

export default class Three {
  private scene: Scene;
  private renderer: WebGPURenderer;
  private container: HTMLElement;
  private camera: PerspectiveCamera;
  private geommetry!: PlaneGeometry;
  private ambientLight!: AmbientLight;
  private controls: OrbitControls;
  private gltfLoader: GLTFLoader;
  private dracoLoader: DRACOLoader;
  private material!: MeshBasicNodeMaterial;
  // private postProcessing!: RenderPipeline;
  private mesh!: Mesh;
  private gui: GUI;
  private isPlaying = false;

  private height = 1;
  private width = 1;

  private settings = {
    progress: 0
  };

  constructor(options: RendererOptions) {
    this.scene = new Scene();
    this.container = options.node;
    this.height = this.container.offsetHeight;
    this.width = this.container.offsetWidth;
    this.isPlaying = options.autoPlay ?? true;

    this.renderer = new WebGPURenderer({
      alpha: true,
      antialias: true
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xffffff, 0); // alpla
    this.container.append(this.renderer.domElement);

    this.camera = new PerspectiveCamera(70, this.width / this.height, 0.01, 1000);
    this.camera.position.set(0, 0, 2);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`;
    this.dracoLoader = new DRACOLoader(new LoadingManager());
    this.dracoLoader.setDecoderPath(`${THREE_PATH}/examples/jsm/libs/draco/gltf/`);

    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.setDRACOLoader(this.dracoLoader);

    this.gui = new GUI();

    this.init();
  }

  private async init() {
    await this.renderer.init();
    this.setLights();
    this.addObjects();
    this.handleResize();
    this.render();
    this.setupResizeHandler();
    this.setUpSettings();
  }

  private setUpSettings() {
    this.gui.add(this.settings, 'progress', 0, 1, 0.01);
  }

  private handleResize() {
    this.height = this.container.offsetHeight;
    this.width = this.container.offsetWidth;
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  private addObjects() {
    this.material = new MeshBasicNodeMaterial({
      wireframe: true,
      side: DoubleSide
    });

    // TSL equivalent of: gl_FragColor = vec4(vUv, 0.0, 1.0)
    this.material.colorNode = vec4(uv(), 0.0, 1.0);

    this.geommetry = new PlaneGeometry(1, 1, 128, 128);
    this.mesh = new Mesh(this.geommetry, this.material);
    this.scene.add(this.mesh);
  }

  private setupResizeHandler() {
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  private setLights() {
    this.ambientLight = new AmbientLight(0xffffff);
    this.scene.add(this.ambientLight);
  }

  private render() {
    if (!this.isPlaying) return;

    this.renderer.setAnimationLoop((time) => {
      this.mesh.rotation.x = (0.2 * time) / 1000;
      this.mesh.rotation.y = (0.1 * time) / 1000;
      this.renderer.render(this.scene, this.camera);
    });
  }

  play() {
    this.isPlaying = true;
    this.render();
  }

  pause() {
    this.isPlaying = false;
    this.renderer.setAnimationLoop(null);
  }
}
