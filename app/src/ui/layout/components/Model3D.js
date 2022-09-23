import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

function Model3D() {
    const mountRef = useRef(null)

    useEffect(() =>{
        const currentRef = mountRef.current;
        const {clientWidth: width, clientHeight: height} = currentRef;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(25, width / height, 0.01, 1000)
        scene.add(camera)
        camera.position.z = 6;
        camera.position.x = 6;
        camera.position.y = 6;
        

        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(width, height)
        currentRef.appendChild(renderer.domElement)

        const constrols = new OrbitControls(camera, renderer.domElement)

        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({color: "red"})
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)
        camera.lookAt(cube.position)
        renderer.render(scene, camera)

        const animate = () => {
            renderer.render(scene,camera)
            requestAnimationFrame(animate)
        }
        animate()

        return() => {
            currentRef.removeChild(renderer.domElement)
        }
    },[])

  return (
    <div ref={mountRef} style = {{width: '100%', height: '100vh'}}>
        
    </div>
  )
}

export default Model3D