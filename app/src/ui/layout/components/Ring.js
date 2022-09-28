import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader"
import { useState } from "react";


const Ring = () => {
  const mountRef = useRef(null);
  const controls = useRef(null)
  const [color, setColor] = useState(false)

  useEffect(() => {
    //Data from the canvas
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;

    //Scene, camera, renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("white")

    const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 100);
    scene.add(camera);
    camera.position.set(5, 5, 5);
    camera.lookAt(new THREE.Vector3());

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    //OrbitControls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;

    //Resize canvas
    const resize = () => {
      renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
      camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);

     //loader
     const dracoLoader = new DRACOLoader();
     dracoLoader.setDecoderPath("./draco/")

    //group
     const ring = new THREE.Group()

     const gltfLoader = new GLTFLoader();
     gltfLoader.setDRACOLoader(dracoLoader)
     gltfLoader.load('./model/ring/dracoRing.gltf', (gltf) =>{
        while(gltf.scene.children.length){
          console.log(gltf.scene.children[0].name)
            gltf.scene.children[0].material.envMap = evp;
            gltf.scene.children[0].scale.set(0.08, 0.08, 0.08)
            gltf.scene.children[0].position.y = -0.5
            ring.add(gltf.scene.children[0])
        }
         scene.add(ring)
     })

     //change metal color
     const changeMetalColor = (color) =>{
      for (let i = 0; i<ring.children.length; i++){
        if (ring.children[i].name.includes('ring')){
          if(color){

            ring.children[i].material.color.set("gold")
          }else{
            ring.children[i].material.color.set("white")

          }
        }
      }
     }

     controls.current= {changeMetalColor}


     const clock = new THREE.Clock()


    //Animate the scene
    const animate = () => {
        const elapsedtime = clock.getElapsedTime()
      ring.rotation.y = elapsedtime/6
    //   ring.rotation.x = elapsedtime/10
      orbitControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const cubeTextureloader = new THREE.CubeTextureLoader();
    const evp = cubeTextureloader.load([
      "./envMap/px.jpg",
      "./envMap/nx.jpg",
      "./envMap/py.jpg",
      "./envMap/ny.jpg",
      "./envMap/pz.jpg",
      "./envMap/nz.jpg",
    ]);

    const ambientalLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(6, 6, 6);
    scene.add(pointLight);

    return () => {
      window.removeEventListener("resize", resize);
      currentRef.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    controls.current.changeMetalColor(color)
  },[color])

  return (
    <>
      <div
        className='Contenedor3D'
        ref={mountRef}
        style={{ width: "100%", height: "90vh" }}>
      </div>
      <button onClick={() => setColor(!color)}>Cambiar Color</button>
    </>
  );
};

export default Ring;

