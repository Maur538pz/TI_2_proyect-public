import { useRef, useEffect} from 'react'
import * as THREE from 'three'
import { MapControls } from 'three/examples/jsm/controls/MapControls'
//import { gsap } from 'gsap'

//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
//import './style.css'




export const Vista45 = () => {
    const mountRef = useRef(null)

    useEffect(()=>{
        const currentRef = mountRef.current
        const {clientWidth: width, clientHeight: height} = currentRef

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75,width/ height,0.1,1000)
        camera.position.y=5
        scene.add(camera)

        camera.lookAt(0,0,0)

        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(width,height)

        const axes = new THREE.AxesHelper(3)
        scene.add(axes)

        currentRef.appendChild(renderer.domElement)

        const mapControl = new MapControls(camera,renderer.domElement)
        mapControl.enableRotate= false


        //--------------objetos
        const geoCubo = new THREE.BoxGeometry(1,1,1)
        const matCubo = new THREE.MeshBasicMaterial({color:0xCA2121})
        const cubo1 = new THREE.Mesh(geoCubo,matCubo)
        scene.add(cubo1)
        cubo1.position.set(2,0,2)

        const geoCubo2 = new THREE.BoxGeometry(1,1,1)
        const matCubo2 = new THREE.MeshBasicMaterial({color:0xDAC565})
        const cubo12 = new THREE.Mesh(geoCubo2,matCubo2)
        scene.add(cubo12)
        cubo12.position.set(2,0,-2)

        const geoCubo3 = new THREE.BoxGeometry(1,1,1)
        const matCubo3 = new THREE.MeshBasicMaterial({color:0x24CA31})
        const cubo13 = new THREE.Mesh(geoCubo3,matCubo3)
        scene.add(cubo13)
        cubo13.position.set(-2,0,2)


        const geoCubo4 = new THREE.BoxGeometry(1,1,1)
        const matCubo4 = new THREE.MeshBasicMaterial({color:0x212ECA})
        const cubo14 = new THREE.Mesh(geoCubo4,matCubo4)
        scene.add(cubo14)
        cubo14.position.set(-2,0,-2)


        const cuboPos = cubo1.position
        
        camera.position.set(cuboPos.x-2,5,cuboPos.z+2)
        mapControl.target.set(cuboPos.x,0,cuboPos.z)
        mapControl.update()

        const sceneAnimation = () => {
            mapControl.update()
            requestAnimationFrame(sceneAnimation)
            renderer.render(scene,camera)
        }
        sceneAnimation()

        return ()=> {
            currentRef.removeChild(renderer.domElement)
        }
    },[])
    return (
        <div ref={mountRef} className='render'>
            
        </div>
        
    )

}



