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

        this.parameters = {
            count: 100000,
            size: .01,
            radius: 5,
            branches: 3,
            curvature: 1,
            randomness: .2,
            concentration: 3,
            innerColor: 0xff6030,
            outerColor: 0x1b3984,
            isBlackHole: false,
            branchWaves: true,
            starShape: 4,
            backdropStarsCount: 10000
        }

        this.resources.on('ready', () => {
            this.backdrop = new Backdrop(10000)
            this.galaxy = new Galaxy(this.parameters)
        })

        this.debugFolder.add(this.parameters, 'count', 100, 1000000, 100).onFinishChange(() => {
            this.galaxy = this.galaxy.updateGalaxy(this.parameters)
        })
        this.debugFolder.add(this.parameters, 'size', .001, .1, .001).onFinishChange(() => {
            this.galaxy = this.galaxy.updateGalaxy(this.parameters)
        })
        this.debugFolder.add(this.parameters, 'radius', .01, 20, .01).onFinishChange(() => {
            this.galaxy = this.galaxy.updateGalaxy(this.parameters)
        })
        this.debugFolder.add(this.parameters, 'branches', 2, 20, 1).onFinishChange(() => {
            this.galaxy = this.galaxy.updateGalaxy(this.parameters)
        })
        this.debugFolder.add(this.parameters, 'curvature', -5, 5, .01).onFinishChange(() => {
            this.galaxy = this.galaxy.updateGalaxy(this.parameters)
        })
        this.debugFolder.add(this.parameters, 'randomness', 0, 2, .01).onFinishChange(() => {
            this.galaxy = this.galaxy.updateGalaxy(this.parameters)
        })
        this.debugFolder.add(this.parameters, 'concentration', 1, 10, .1).onFinishChange(() => {
            this.galaxy = this.galaxy.updateGalaxy(this.parameters)
        })
        this.debugFolder.addColor(this.parameters, 'innerColor').onFinishChange(() => {
            this.galaxy = this.galaxy.updateGalaxy(this.parameters)
        })
        this.debugFolder.addColor(this.parameters, 'outerColor').onFinishChange(() => {
            this.galaxy = this.galaxy.updateGalaxy(this.parameters)
        })
        this.debugFolder.add(this.parameters, 'isBlackHole').onFinishChange(() => {
            this.galaxy = this.galaxy.updateGalaxy(this.parameters)
        })
        this.debugFolder.add(this.parameters, 'branchWaves').onFinishChange(() => {
            this.galaxy = this.galaxy.updateGalaxy(this.parameters)
        })
        this.debugFolder.add(this.parameters, 'starShape', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]).onFinishChange(() => {
            this.galaxy = this.galaxy.updateGalaxy(this.parameters)
        })
    }

    // generateGalaxy() {
    //     this.galaxy = new Galaxy()
    // }
}