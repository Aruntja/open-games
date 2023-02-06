import { Container, Text } from 'pixi.js';
import gsap from 'gsap';
import { i18n } from '../utils/i18n';
import { Cauldron } from '../ui/Cauldron';
import { PixiLogo } from '../ui/PixiLogo';
import { SmokeCloud } from '../ui/SmokeCloud';
import { app } from '../main';

/** Screen shown while loading assets */
export class LoadScreen extends Container {
    public static assetBundles = ['preload'];
    private cauldron: Cauldron;
    private pixiLogo: PixiLogo;
    private cloud: SmokeCloud;
    private message: Text;

    constructor() {
        super();

        this.cauldron = new Cauldron();
        this.addChild(this.cauldron);

        this.message = new Text(i18n.loadingMessage, {
            fill: 0x5c5c5c,
            fontFamily: 'Verdana',
            align: 'center',
        });
        this.message.anchor.set(0.5);
        this.addChild(this.message);

        this.pixiLogo = new PixiLogo();
        this.addChild(this.pixiLogo);

        this.cloud = new SmokeCloud();
        this.cloud.height = 100;
        this.addChild(this.cloud);
    }

    /** Resize the screen, fired whenever window size changes  */
    public resize(width: number, height: number) {
        this.cauldron.x = width * 0.5;
        this.cauldron.y = height * 0.5;
        this.message.x = width * 0.5;
        this.message.y = height * 0.75;
        this.pixiLogo.x = width * 0.5;
        this.pixiLogo.y = height - 50;
        this.cloud.y = 0;
        this.cloud.width = width;
    }

    /** Show screen with animations */
    public async show() {
        gsap.killTweensOf(this.message);
        this.message.alpha = 1;
    }

    /** Hide screen with animations */
    public async hide() {
        this.message.text = i18n.loadingDone;
        gsap.killTweensOf(this.message);
        gsap.to(this.message, {
            alpha: 0,
            duration: 0.3,
            ease: 'linear',
            delay: 0.5,
        });
        gsap.killTweensOf(this.cloud);
        await gsap.to(this.cloud, {
            height: app.renderer.height,
            duration: 1,
            ease: 'quad.in',
            delay: 0.5,
        });
    }
}