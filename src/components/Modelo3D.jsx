import { useRef, useEffect} from 'react'
import * as THREE from 'three'
import { MapControls } from 'three/examples/jsm/controls/MapControls'
import { gsap } from 'gsap'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import './style.css'

export const Modelo3D = ({setSite, setView}) =>{
    const mountRef = useRef(null)
    //const [selected, setSelected] = useState('')



    useEffect(()=>{
        console.log('pepepepe')
        const currentRef = mountRef.current
        const {clientWidth: width, clientHeight: height} = currentRef

        const scene = new THREE.Scene()


        const camera = new THREE.PerspectiveCamera(25, width/height, 0.1, 1000)
        const defaultPosCamera = [0,45,0]
        
        camera.position.set(...defaultPosCamera)
        camera.lookAt(new THREE.Vector3(0,0,0))
        scene.add(camera)

        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(width,height)
        currentRef.appendChild(renderer.domElement)

        const mapControls = new MapControls(camera,renderer.domElement)
        mapControls.enableRotate= false

        //MOUSE COORS------------------------------------
        const mouseCoors = new THREE.Vector2(-100,-100)
        function onPointerMove( event ) {
            mouseCoors.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouseCoors.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        
        }
        //window.addEventListener('mousemove',(e)=>onPointerMove(e))
        window.addEventListener('mousemove',onPointerMove)

        //mouse CLICK----------------------------------

        let currentPosGlobal = null

        let currentMesh = null
        const adc = 10

        let selected =''
        const mouseClick = (e) => {
            /*
            if(e.button!==1){
                return
            }
            */
            if(e.button===1){
                
                setView(false)
                setSite('')
                if(currentMesh){
                    selected=currentMesh.object.name
                    setView(true)
                    setSite(selected)
                    gsap.to(camera.position,{
                        x:currentPosGlobal.x,
                        y:10,
                        z:(currentPosGlobal.z)+adc,
                        duration:2
                    })

                    gsap.to(mapControls.target,{
                        x:currentPosGlobal.x,
                        y:0,
                        z:currentPosGlobal.z,
                        duration:2
                    })
                    mapControls.update()
    

                }
            }
            else if(e.button===2){
                selected=''
                setSite('')
                setView(false)
                gsap.to(camera.position,{
                    x:0,
                    y:45,
                    z:0,
                    duration:2
                })
                gsap.to(mapControls.target,{
                    x:0,
                    y:0,
                    z:0,
                    duration:2
                })
                mapControls.update()
            }
            
        }

        window.addEventListener('mousedown',mouseClick)

        //resize
        const resize = () => {
            renderer.setSize(currentRef.clientWidth,currentRef.clientHeight)
            camera.aspect= currentRef.clientWidth/currentRef.clientHeight
            camera.updateProjectionMatrix()
        }
        window.addEventListener("resize",resize)



        const groupCollitions = []
        const groupMesh = new THREE.Group()
        const funAdd = () => {
            groupMesh.traverse((child)=>{
                if(child instanceof THREE.Mesh){
                    let materialMesh = new THREE.MeshStandardMaterial()
                    child.material=materialMesh
                    groupCollitions.push(child)
                }
                
            })
        }
        
    
        //CARGAR MNODELOS 3D EXPORTADOS 
        const gltfLoader = new GLTFLoader()
        gltfLoader.load('/models/peru.gltf',
        (gltf)=>{
            //console.log(gltf)
            gltf.scene.scale.set(8,8,8)
            groupMesh.add(gltf.scene)
            scene.add(groupMesh)
            funAdd()
            camera.lookAt(groupMesh.position)
        },undefined,
        function (error){
            console.log(error)
        }
        )

        const cubeGeometry = new THREE.BoxGeometry(1,1,1)
        

        //cubo1
        const materialc1=new THREE.MeshBasicMaterial()
        const cube1 = new THREE.Mesh(cubeGeometry,materialc1)
        cube1.name='cubo1'
        cube1.position.set(0,0,0)
        //scene.add(cube1)
        camera.lookAt(cube1.position)


        //luz ambiental
        const lightAmbiental = new THREE.AmbientLight(0x404040,10)
        scene.add(lightAmbiental)

        const axesHelper = new THREE.AxesHelper(10)
        scene.add(axesHelper)

        //RAYCASTER
        const raycaster = new THREE.Raycaster()

        //let plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const geometryPlane = new THREE.PlaneGeometry(45,45)
        const materialPlane = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide} )
        const plane = new THREE.Mesh(geometryPlane,materialPlane)
        plane.rotation.x=-Math.PI/2
        scene.add(plane)


        const sceneAnimation = () =>{
            //colisiones
            raycaster.setFromCamera(mouseCoors,camera)
            
            const raycastercollitions = raycaster.intersectObjects(groupCollitions)

            for(const original of groupCollitions){
                if(original.name!==selected){
                    //console.log(original.name)
                    gsap.to(original.material.color,{
                        r:1,
                        g:1,
                        b:1,
                        duration:2,
                        overwrite:true
                    })
                }
            }

            if(raycastercollitions.length){
                gsap.to(raycastercollitions[0].object.material.color,{
                    r:1,
                    g:0,
                    b:0,
                    duration:1,
                    overwrite:true
                })
            }

            //click
            if(raycastercollitions.length){
                currentMesh=raycastercollitions[0]
            }
            else{
                currentMesh=null
            }

            //cordenadas globales
 
            const temPosGlobal=raycaster.intersectObject(plane)
            if(temPosGlobal.length){
                currentPosGlobal=temPosGlobal[0].point
            }
            



            //orbitControls.update()
            mapControls.update()
            renderer.render(scene,camera)
            requestAnimationFrame(sceneAnimation)
        }

        sceneAnimation()

        return () =>{
            currentRef.removeChild(renderer.domElement)
            window.removeEventListener('mousemove',onPointerMove)
            window.removeEventListener('mousedown',mouseClick)
            window.removeEventListener("resize",resize)
        }


    },[setSite,setView])

    
    return (
        <div ref={mountRef} className='render'></div>
    )
}
