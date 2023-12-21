import {useRef, useEffect} from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

export const Map = () => {
    const mountRef = useRef(null)

    useEffect(()=>{
        const currentRef = mountRef.current
        const { clientWidth: width, clientHeight: height} = currentRef

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75,width/height, 0.1, 1000)
        scene.add(camera)
        scene.background= new THREE.Color(0x303030)
        camera.position.x=3



        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(width,height)
        currentRef.appendChild(renderer.domElement)

        const orbitControls = new OrbitControls(camera,renderer.domElement)
        orbitControls.enableDamping=true

        

        const animation = () =>{
            orbitControls.update()
            renderer.render(scene,camera)
            requestAnimationFrame(animation)
        }
        animation()


        const axesHelper = new THREE.AxesHelper(3)
        scene.add(axesHelper)


        //textura
        const textureLoader = new THREE.TextureLoader()
        const ladrillo= textureLoader.load('./public/texture/base.jpg')
        const normal = textureLoader.load('./public/texture/normal.jpg')

        const cubeGeomatry = new THREE.BoxGeometry(1,1,1)
        const cubeMaterial = new THREE.MeshStandardMaterial()
        cubeMaterial.map=ladrillo
        cubeMaterial.normalMap=normal


        const log1 = () =>{
            console.log('raaa')
        }

        
        const cube = new THREE.Mesh(cubeGeomatry,cubeMaterial)
    
        scene.add(cube)
        window.addEventListener('click',log1)

        const ambientalLight = new THREE.AmbientLight(0xffffff,1)
        scene.add(ambientalLight)






        return ()=>{
            currentRef.removeChild(renderer.domElement)
            window.removeEventListener('click',log1)
        }
    },[])
    return (
        <div ref={mountRef} className='render'></div>
    )
}