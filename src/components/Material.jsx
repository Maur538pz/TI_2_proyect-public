import{ useRef, useEffect} from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import './style.css'


export const Material = () =>{
    const mountRef = useRef(null)

    useEffect(()=>{
        const currentRef = mountRef.current
        const {clientWidth: width, clientHeight: height}= currentRef

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, width/height, 0.01, 1000)
        scene.add(camera)
        scene.background = new THREE.Color(0xeeeeee)
/*
        camera.position.z=6
        camera.position.x=6
        camera.position.y=4
*/

        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(width,height)
        currentRef.appendChild(renderer.domElement)

        const orbitControls = new OrbitControls(camera,renderer.domElement)
        orbitControls.enableDamping=true

        //camera.lookAt(new THREE.Vector3(0,0,0))
        camera.position.x=30
        

        const animation = () => {
            orbitControls.update()
            renderer.render(scene,camera)
            requestAnimationFrame(animation)
        }
        animation()

        //SPHERE
        const sphereGeometry = new THREE.SphereGeometry(3,15,15)
        const sphereMaterial = new THREE.MeshNormalMaterial({flatShading:true})
        const sphere  = new THREE.Mesh(sphereGeometry,sphereMaterial)
        scene.add(sphere)


        const axesHelper = new THREE.AxesHelper(20)
        scene.add(axesHelper)


        //CARGAR TEXTURAS
        const textureLoader= new THREE.TextureLoader()
        const matcap = textureLoader.load('./public/matcaps/1.jpg')

        //CUBETEXTURELOADER
        const cubeTextureLoader = new THREE.CubeTextureLoader()
        const evm = cubeTextureLoader.load([
            './public/matcaps/cubeTexture/nx.png',
            './public/matcaps/cubeTexture/ny.png',
            './public/matcaps/cubeTexture/nz.png',
            './public/matcaps/cubeTexture/px.png',
            './public/matcaps/cubeTexture/py.png',
            './public/matcaps/cubeTexture/pz.png',
        ])


        //TORUS
        const torusGeometry = new THREE.TorusGeometry(5,2,15,30)
        const torusMaterial = new THREE.MeshMatcapMaterial({matcap:matcap})
        const torus = new THREE.Mesh(torusGeometry,torusMaterial)
        torus.position.z=-12
        scene.add(torus)


        //creamos una instancia de material
        const materialInstance = new THREE.MeshStandardMaterial()
        materialInstance.color.set('#4D1DAB')
        //hacer el material mas metalico
        //mas cercano a 1 es mas metalico
        materialInstance.metalness=0.8

        //hacer el material mas aspero,rugoso
        //mas cercano a 0 mas liso
        materialInstance.roughness=0.2

        //envolver el material parta que refleje la luz correctamente
        materialInstance.envMap = evm

        //CUBO
        const cubeGeomatry = new THREE.BoxGeometry(4,6,4)
        const cube = new THREE.Mesh(cubeGeomatry,materialInstance)
        cube.position.z=12
        scene.add(cube)

        //agregamos luz ambiental 
        const ambientalLight = new THREE.AmbientLight(0xffffff,1)
        scene.add(ambientalLight)

        //PUNTO DE LUZ
        const pointLight = new THREE.PointLight(0xffffff,2)
        pointLight.position.set(5,5,5)
        scene.add(pointLight)

        return ()=>{
            currentRef.removeChild(renderer.domElement)
        }
    },[])
    return (
        <div ref={mountRef} className='render'></div>
    )
}