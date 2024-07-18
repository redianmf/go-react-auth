import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  MTLLoader,
  OBJLoader,
  OrbitControls,
} from "three/examples/jsm/Addons.js";

interface IRingScene {
  setLoadingPercentage: (value: number) => void;
}

const RingScene: React.FC<IRingScene> = ({ setLoadingPercentage }) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const loadManager = new THREE.LoadingManager();

  loadManager.onProgress = (_, loaded, total) => {
    const loadPercentage: number = (loaded / total) * 100;
    setLoadingPercentage(parseFloat(loadPercentage.toFixed(0)));
  };

  const initCamera = () => {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      800000
    );
    camera.position.set(5, -1, 0);

    return camera;
  };

  const initRenderer = () => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;

    return renderer;
  };

  const initOrbitControls = (
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer
  ) => {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = -0.3;
    controls.enableDamping = true;

    return controls;
  };

  const addLight = (scene: THREE.Scene) => {
    const light = new THREE.AmbientLight(0x7c7c7c, 100);
    scene.add(light);

    const pointLight = new THREE.PointLight(0xffffff, 1000);
    pointLight.position.set(2.5, 7.5, 15);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3.0);
    directionalLight.position.set(0.32, 0.39, 0.7);
    scene.add(directionalLight);
  };

  const loadTexture = () => {
    const path = "./environment/";
    const urls = ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"];

    const texture = new THREE.CubeTextureLoader(loadManager)
      .setPath(path)
      .load(urls);
    return texture;
  };

  const loadEnvironment = () => {
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    const texture = new THREE.TextureLoader(loadManager).load("./lake.jpg");
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  };

  const loadRingModel = (scene: THREE.Scene, texture: THREE.CubeTexture) => {
    const mtlLoader = new MTLLoader(loadManager);
    mtlLoader.load(
      "./the-one-ring.mtl",
      (materials) => {
        materials.preload();
        const loader = new OBJLoader(loadManager);
        loader.setMaterials(materials);

        loader.load(
          "./the-one-ring.obj",
          function (object) {
            object.traverse(function (child) {
              if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshPhongMaterial({
                  ...child.material,
                  envMap: texture,
                });
              }
            });
            object.rotation.x = 3;
            object.rotation.y = 1;
            object.scale.set(3, 3, 3);

            scene.add(object);
          },
          undefined,
          function (error) {
            console.log("An error happened", error);
          }
        );
      },
      undefined,
      (error) => {
        console.log("An error happened", error);
      }
    );
  };

  const render = (
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera
  ) => {
    renderer.render(scene, camera);
  };

  const initThree = () => {
    // Create scene
    const scene = new THREE.Scene();
    addLight(scene);

    // Init instance
    const camera = initCamera();
    const renderer = initRenderer();
    const controls = initOrbitControls(camera, renderer);

    // Load texture
    const texture = loadTexture();
    const environment = loadEnvironment();

    // Load model
    loadRingModel(scene, texture);
    scene.add(environment);

    refContainer.current &&
      refContainer?.current?.appendChild(renderer.domElement);

    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render(renderer, scene, camera);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      render(renderer, scene, camera);
    };

    animate();
  };

  useEffect(() => {
    initThree();
  }, []);

  return <div className="fixed" ref={refContainer}></div>;
};

export default RingScene;
