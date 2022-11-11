import * as THREE from 'three'
import Backdrop from './Backdrop'
import Experience from '../Experience'
import Galaxy from './Galaxy'

export default class Universe {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.debugFolder = this.debug.ui.addFolder('Galaxy')

        const parameters = {
            count: 100000,
            size: .01,
            radius: 5,
            branches: 3,
            curvature: 1,
            randomness: .2,
            concentration: 3,
            innerColor: 0xff6030,
            outerColor: 0x1b3984,
            blackHole: true,
            branchWaves: true,
            starShape: 4,
            backdropStarsCount: 10000
        }

        this.resources.on('ready', () => {
            this.backdrop = new Backdrop(parameters.backdropStarsCount)
            this.galaxy = new Galaxy(parameters)
        })

        this.debugFolder.add(parameters, 'count', 100, 1000000, 100)//.onFinishChange(generateGalaxy)
        this.debugFolder.add(parameters, 'size', .001, .1, .001)//.onFinishChange(generateGalaxy)
        this.debugFolder.add(parameters, 'radius', .01, 20, .01)//.onFinishChange(generateGalaxy)
        this.debugFolder.add(parameters, 'branches', 2, 20, 1)//.onFinishChange(generateGalaxy)
        this.debugFolder.add(parameters, 'curvature', -5, 5, .01)//.onFinishChange(generateGalaxy)
        this.debugFolder.add(parameters, 'randomness', 0, 2, .01)//.onFinishChange(generateGalaxy)
        this.debugFolder.add(parameters, 'concentration', 1, 10, .1)//.onFinishChange(generateGalaxy)
        this.debugFolder.addColor(parameters, 'innerColor')//.onFinishChange(generateGalaxy)
        this.debugFolder.addColor(parameters, 'outerColor')//.onFinishChange(generateGalaxy)
        this.debugFolder.add(parameters, 'blackHole')//.onFinishChange(generateGalaxy)
        this.debugFolder.add(parameters, 'branchWaves')//.onFinishChange(generateGalaxy)
        this.debugFolder.add(parameters, 'starShape', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])//.onFinishChange(generateGalaxy)
    }
}