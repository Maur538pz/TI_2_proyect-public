import {useRef, useEffect} from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

export const Geometry = () => {
    const mountRef = useRef(null)
    

    useEffect(()=>{
        const currentRef = mountRef.current
        const {clientWidth: width, clientHeight: height} =  currentRef
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(25, width/height, 0.01, 1000)
        scene.add(camera)

        camera.position.z=6
        camera.position.x=6
        camera.position.y=4


        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(width, height)
        currentRef.appendChild(renderer.domElement)

        const orbitControls = new OrbitControls(camera, renderer.domElement)
        orbitControls.enableDamping = true

        const resize = () => {
            renderer.setSize(currentRef.clientWidth,currentRef.clientHeight)
            camera.aspect= currentRef.clientWidth/currentRef.clientHeight
            camera.updateProjectionMatrix()
        }
        window.addEventListener("resize",resize)




        camera.lookAt(new THREE.Vector3(0,0,0))

        const animation  = () => {
            orbitControls.update() //para que haga caso a la opcion de enableDamping
            renderer.render(scene,camera)
            requestAnimationFrame(animation)
        }
        animation()

        //muestra los ejes princpales como ayuda
        const axesHelper = new THREE.AxesHelper(2)
        scene.add(axesHelper)

        //grilla para ayuda tambien
        const size = 10 //el tamaño de la grilla
        const divisions = 10 //cuantas divisiones tendrta
        const gridHelper = new THREE.GridHelper(size,divisions)//creamos la grilla
        scene.add(gridHelper)


        //BOXGEOMETRY   
        /*
        const geometry= new THREE.BoxGeometry(1, 1, 1,2,2,2)
        const material= new THREE.MeshBasicMaterial({color:0x0f2c64, wireframe:true})
        const cube = new  THREE.Mesh(geometry,material)
        cube.position.set(0,1,0)    
        scene.add(cube)*/

        //BUFFERGEOMETRY  mejora la performance

        //VERTEX
        //te permite crear una geomatria a aprtir de vertices

        //PARTICLES
        const count = 1000
        const particlesPositions = new Float32Array(count * 3)
        for (let i = 0 ; i < count * 3; i++){
            particlesPositions[i]=Math.random() * (-5 - 5 + 1)+5
        }

        const particlesAttribute = new THREE.BufferAttribute(particlesPositions,3)
        const particlesGeometry = new THREE.BufferGeometry()
        particlesGeometry.setAttribute("position",particlesAttribute)

        const particlesMaterial = new THREE.PointsMaterial({color: 0xff0000})
        const particles = new THREE.Points(particlesGeometry,particlesMaterial)
        scene.add(particles)
        








        return ()=>{
            window.removeEventListener("resize",resize)
            currentRef.removeChild(renderer.domElement)
        }
    },[])
    return (
        <div ref={mountRef} className='render'></div>
    )
}