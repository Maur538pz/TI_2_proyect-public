import { useRef, useEffect} from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap'
import './style.css'

export const Raycaster = ({setView}) => {
    const mountRef = useRef(null)



    useEffect(()=>{
        const currentRef = mountRef.current
        const {clientWidth: width, clientHeight: height} = currentRef

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(25, width/height, 0.1, 1000)
        camera.position.x=10
        

        scene.add(camera)

        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(width,height)
        currentRef.appendChild(renderer.domElement)


        //MOUSE COORS------------------------------------
        const mouseCoors = new THREE.Vector2(-100,-100)
        function onPointerMove( event ) {
            mouseCoors.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouseCoors.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        
        }
        //window.addEventListener('mousemove',(e)=>onPointerMove(e))
        window.addEventListener('mousemove',onPointerMove)

        //mouse CLICK----------------------------------
        let currentMesh = null
        const mouseClick = () => {
            if(currentMesh){
                
                setView(prev=>!prev)
                
                gsap.to(camera.position,{
                    x:11,
                    y:5,
                    z:15,
                    duration:2,
                })
            
                let position = currentMesh.object.position
                gsap.to(orbitControls.target,{
                    x:position.x,
                    y:position.y,
                    z:position.z-8,
                    duration:2})
                console.log(position.x-5,position.y,position.z)
                orbitControls.update()
                

            }
            
        }

        window.addEventListener('click',mouseClick)


        //resize
        const resize = () => {
            renderer.setSize(currentRef.clientWidth,currentRef.clientHeight)
            camera.aspect= currentRef.clientWidth/currentRef.clientHeight
            camera.updateProjectionMatrix()
        }
        window.addEventListener("resize",resize)
        


        const orbitControls = new OrbitControls(camera,renderer.domElement)
        orbitControls.enableDamping=true

        const axesHelper=  new THREE.AxesHelper(14)
        scene.add(axesHelper)


        //---------CUBOS--------------------
        const cubeGeometry = new THREE.BoxGeometry(1,1,1)
        

        //cubo1
        const materialc1=new THREE.MeshBasicMaterial()
        const cube1 = new THREE.Mesh(cubeGeometry,materialc1)
        cube1.name='cubo1'
        cube1.position.set(0,0,0)
        scene.add(cube1)

        //cubo2
        const materialc2=new THREE.MeshBasicMaterial()
        const cube2 = new THREE.Mesh(cubeGeometry,materialc2)
        cube2.name='cubo2'
        cube2.position.set(0,0,2)
        scene.add(cube2)

        //cubo3
        const materialc3=new THREE.MeshBasicMaterial()
        const cube3 = new THREE.Mesh(cubeGeometry,materialc3)
        cube3.name='cubo3'
        cube3.position.set(0,0,-2)
        scene.add(cube3)

        //raycaster
        const raycaster =new THREE.Raycaster()

        const collitions = [cube1,cube2,cube3]
        //objetos con los cuales se detectara la colision



        const animationScene = () => {
            //raycaster update
            raycaster.setFromCamera(mouseCoors,camera)

            //INTERSECTCS
            const raycastercollisions = raycaster.intersectObjects(collitions)
            for(const original of collitions){
                gsap.to(original.material.color,{
                    r:1,
                    g:1,
                    b:1,
                    overwrite:true,
                    duration:1,
                })
            }

            for(const collition of raycastercollisions){
                gsap.to(collition.object.material.color,{
                    r:1,
                    g:0,
                    b:0,
                    overwrite:true,
                    duration:0.3,
                })
            }

            if(raycastercollisions.length){
                currentMesh=raycastercollisions[0]
            }
            else{
                currentMesh=null
            }


            orbitControls.update()
            renderer.render(scene,camera)
            requestAnimationFrame(animationScene)
        }
        animationScene()

        return ()=>{
            currentRef.removeChild(renderer.domElement)
            //window.removeEventListener('mousemove',(e)=>onPointerMove(e))
            window.removeEventListener('mousemove',onPointerMove)
            window.removeEventListener("resize",resize)
            
        }

    },[])
    return (
        <div ref={mountRef} className='render'></div>
    )
}