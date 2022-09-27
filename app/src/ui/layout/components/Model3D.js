import { render } from '@testing-library/react'
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
        scene.background = new THREE.Color("lightblue")
        const camera = new THREE.PerspectiveCamera(25, width / height, 0.01, 100)
        scene.add(camera)
        camera.position.z = 6;
        camera.position.x = 6;
        camera.position.y = 6;
        

        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(width, height)
        currentRef.appendChild(renderer.domElement)

        const constrols = new OrbitControls(camera, renderer.domElement)
        constrols.enableDamping= true

        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshPhongMaterial({color: "lightgreen"})
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)
        camera.lookAt(cube.position)

        const ambientLight = new THREE.AmbientLight( 0x404040, 1 ); 
        scene.add( ambientLight );

        const light = new THREE.PointLight( "gray", 1 );
        light.position.set( 1, 1, 1 );
        scene.add( light );
        
        const clock = new THREE.Clock()
        renderer.render(scene,camera)

        const animate = () => {
          const elapsedtime = clock.getElapsedTime()
          cube.rotation.y = elapsedtime
          cube.rotation.x = elapsedtime
          cube.position.y = Math.sin(elapsedtime)
         
          constrols.update()
          renderer.render(scene,camera)
          requestAnimationFrame(animate)
        }

        const resize = () => {
          const updateWidth = currentRef.clientWidth
          const updateHeight = currentRef.clientHeight
          renderer.setSize(updateWidth, updateHeight)
          camera.aspect = updateWidth / updateHeight
          camera.updateProjectionMatrix()
        }
        window.addEventListener('resize', resize )
        animate()

        return() => {
            currentRef.removeChild(renderer.domElement)
            window.addEventListener('resize', resize)
        }
    },[])

  return (
    <div ref={mountRef} style = {{width: '100%', height: '100vh'}}>
        
    </div>
  )
}

export default Model3D