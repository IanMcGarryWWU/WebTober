import React, {Component} from "react";
import './Blade.css';
// npm i three
import * as THREE from "three";
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class Blade extends Component{
    componentDidMount(){
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight
        //ADD SCENE
        this.scene = new THREE.Scene()
        // this.scene.background = new THREE.Color( 0xf0f0f0 ); // UPDATED
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(75,width / height,0.1,1000)
        this.camera.position.z = -10
        this.light = new THREE.AmbientLight( 0x404040 ); // soft white light
        this.scene.add( this.light );
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true})
        this.renderer.setClearColor( 0x000000, 0 );
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)

        let offset = 2

        const geometry = new THREE.CylinderGeometry( 0.3, 0.12, 2, 32 );
        const  material = new THREE.MeshNormalMaterial( {color: 0xffff00} );
        const cylinder = new THREE.Mesh( geometry, material );
        cylinder.position.set(0, -4 + offset, 0)
        this.scene.add( cylinder );

        let geometryGuard = new THREE.BoxGeometry( 2, 0.4, 0.7);
        let materialGuard = new THREE.MeshNormalMaterial( {color: 0x00ff00} );
        let guard = new THREE.Mesh( geometryGuard, materialGuard );
        guard.position.set(0,  -3 + offset, 0)
        this.scene.add( guard );


        let pyramidgeom = new THREE.CylinderGeometry(0, 0.7, 6, 4, 1)
        let pyr_material = new THREE.MeshNormalMaterial();
        this.pyramid = new THREE.Mesh(pyramidgeom, pyr_material);
        this.pyramid.position.set(0, 0 + offset, 0.4)
        this.scene.add(this.pyramid);

        this.camera.lookAt(0, 0, 0)

        this.start()
    }

    componentWillUnmount(){
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    animate = () => {
        this.pyramid.rotation.y += 0.025
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }

    render(){
        return(
            <div
                style={{ width: '100vw', height: '100vh' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}

export default Blade

