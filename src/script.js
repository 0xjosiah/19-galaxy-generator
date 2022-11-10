import './style.css'
import Experience from './Experience/Experience'

const experience = new Experience(document.querySelector('canvas.webgl'))





// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'lil-gui'

// /**
//  * Base
//  */
// // Debug
// const gui = new dat.GUI()

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()


// /**
//  * Textures
//  */
// const textureLoader = new THREE.TextureLoader()
// const stars = textureLoader.load('./textures/particles/4.png')
// const spaceDust = textureLoader.load('./textures/particles/12.png')

// /**
//  * Black hole
//  */
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 64, 64),
//     new THREE.MeshStandardMaterial()
// )

// /**
//  * Galaxy
//  */
// const parameters = {
//     count: 100000,
//     size: .01,
//     radius: 5,
//     branches: 3,
//     curvature: 1,
//     randomness: .2,
//     concentration: 3,
//     innerColor: 0xff6030,
//     outerColor: 0x1b3984,
//     blackHole: false,
//     branchWaves: false,
// }

// let geometry;
// let material;
// let points;

// const generateGalaxy = () => {
//     const { count, size, radius, branches, curvature, randomness, concentration, innerColor, outerColor, blackHole, branchWaves, } = parameters

//     if(points) {
//         geometry.dispose()
//         material.dispose()
//         scene.remove(points)
//     }

//     if(blackHole) scene.add(sphere)
//     else scene.remove(sphere)

//     /**
//      * Geometry
//      */
//     geometry = new THREE.BufferGeometry()
//     const positions = new Float32Array(count * 3)
//     const colors = new Float32Array(count * 3)

//     const colorInside = new THREE.Color(innerColor)
//     const colorOutside = new THREE.Color(outerColor)
    
//     for (let i = 0; i < count; i++) {

//         const i3 = i * 3
        
//         // Positions
//         // const randomRadius = Math.random() * radius // original, makes star concentration uniform along branch length
//         // const randomRadius = radius + Math.pow(Math.random(), concentration) // this creates stars chasing effect
//         const radiusMultiplier = radius + Math.pow(Math.random(), concentration)
//         const randomRadius = Math.pow(Math.random(), concentration) * radiusMultiplier // this concentrates stars toward center of branches, adding addt'l math.pow helps prevent cross formation in center
//         const curvatureAngle = randomRadius * curvature
//         const branchAngle = (i % branches) / branches * Math.PI * 2

//         const randomX = Math.pow(Math.random(), concentration) * (Math.random() < .5 ? 1 : -1) * randomness * randomRadius// * Math.cos(randomRadius)
//         const randomY = Math.pow(Math.random(), concentration) * (Math.random() < .5 ? 1 : -1) * randomness * randomRadius// * Math.cos(randomRadius)
//         const randomZ = Math.pow(Math.random(), concentration) * (Math.random() < .5 ? 1 : -1) * randomness * randomRadius// * Math.cos(randomRadius)

//         // mess with these to make really cool effects
//         const alternating = branchAngle < Math.PI ? 1 : -1
//         const xPos = Math.cos(branchAngle + curvatureAngle) * randomRadius
//         const yPos = Math.sin(randomRadius) * Math.cos(randomRadius) * alternating
//         const zPos = Math.sin(branchAngle + curvatureAngle) * randomRadius

//         positions[i3 + 0] = xPos + randomX
//         positions[i3 + 1] = branchWaves ? yPos + randomY : randomY
//         positions[i3 + 2] = zPos + randomZ

//         // Colors
//         const mixedColor = colorInside.clone().lerp(colorOutside, randomRadius / radius)
//         colors[i3 + 0] = mixedColor.r
//         colors[i3 + 1] = mixedColor.g
//         colors[i3 + 2] = mixedColor.b
//     }

//     geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
//     geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

//     /**
//      * Material
//      */
//     material = new THREE.PointsMaterial({
//         size,
//         sizeAttenuation: true,
//         depthWrite: false,
//         // transparent: true,
//         alphaMap: stars,
//         blending: THREE.AdditiveBlending,
//         vertexColors: true,
//     })

//     /**
//      * Points
//      */
//     points = new THREE.Points( geometry, material )
//     scene.add(points)
// }

// generateGalaxy()

// gui.add(parameters, 'count', 100, 1000000, 100).onFinishChange(generateGalaxy)
// gui.add(parameters, 'size', .001, .1, .001).onFinishChange(generateGalaxy)
// gui.add(parameters, 'radius', .01, 20, .01).onFinishChange(generateGalaxy)
// gui.add(parameters, 'branches', 2, 20, 1).onFinishChange(generateGalaxy)
// gui.add(parameters, 'curvature', -5, 5, .01).onFinishChange(generateGalaxy)
// gui.add(parameters, 'randomness', 0, 2, .01).onFinishChange(generateGalaxy)
// gui.add(parameters, 'concentration', 1, 10, .1).onFinishChange(generateGalaxy)
// gui.addColor(parameters, 'innerColor').onFinishChange(generateGalaxy)
// gui.addColor(parameters, 'outerColor').onFinishChange(generateGalaxy)
// gui.add(parameters, 'blackHole').onFinishChange(generateGalaxy)
// gui.add(parameters, 'branchWaves').onFinishChange(generateGalaxy)

// /**
//  * Backdrop
//  */
// const generateBackdrop = () => {
//     let count = 30000

//     const geometry = new THREE.BufferGeometry()
//     const positions = new Float32Array(count * 3)
//     const colors = new Float32Array(count * 3)

//     for (let i = 0; i < count; i++) {

//         const i3 = i * 3
        
//         // Positions
//         positions[i3 + 0] = (Math.random() - .5) * 75
//         positions[i3 + 1] = (Math.random() - .5) * 75
//         positions[i3 + 2] = (Math.random() - .5) * 75

//         // Colors
//         colors[i3 + 0] = Math.random()
//         colors[i3 + 1] = Math.random()
//         colors[i3 + 2] = Math.random()
//     }

//     geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
//     geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

//     /**
//      * Material
//      */
//     const material = new THREE.PointsMaterial({
//         size: .04,
//         sizeAttenuation: true,
//         depthWrite: false,
//         // transparent: true,
//         alphaMap: spaceDust,
//         blending: THREE.AdditiveBlending,
//         vertexColors: true,
//         // color: 0xffffff
//     })

//     /**
//      * Points
//      */
//     const points = new THREE.Points( geometry, material )
//     scene.add(points)
// }

// generateBackdrop()

// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = 3
// camera.position.y = 3
// camera.position.z = 3
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true
// controls.maxDistance = 75

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//     // Update controls
//     controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()