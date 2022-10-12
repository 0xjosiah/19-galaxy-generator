import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Test cube
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)

/**
 * Galaxy
 */
const parameters = {
    count: 100000,
    size: .01,
    radius: 5,
    branches: 3,

}

let geometry;
let material;
let points;

const generateGalaxy = () => {
    const { count, size, radius, branches, } = parameters

    if(points) {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    /**
     * Geometry
     */
    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {

        const i3 = i * 3

        const randoRadius = Math.random() * radius
        const branchAngle = (i % branches) / branches * Math.PI * 2

        positions[i3 + 0] = Math.cos(branchAngle) * randoRadius
        positions[i3 + 1] = 0
        positions[i3 + 2] = Math.sin(branchAngle) * randoRadius
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    /**
     * Material
     */
    material = new THREE.PointsMaterial({
        size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    })

    /**
     * Points
     */
    points = new THREE.Points( geometry, material )
    scene.add(points)
}

generateGalaxy()

// const addDebug = () => {
//     for(let key in parameters) {
//         gui.add(parameters, `${key}`, parameters[key] / 10, parameters[key] * 10, parameters[key]).onFinishChange(generateGalaxy)
//     }
// }

// addDebug()
gui.add(parameters, 'count', 100, 1000000, 100).onFinishChange(generateGalaxy)
gui.add(parameters, 'size', .001, .1, .001).onFinishChange(generateGalaxy)
gui.add(parameters, 'radius', .01, 20, .01).onFinishChange(generateGalaxy)
gui.add(parameters, 'branches', 2, 20, 1).onFinishChange(generateGalaxy)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()