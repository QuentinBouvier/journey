/// <reference path="../typings/index.d.ts" />

export class FloatingText
{
    private _name: string;
    private _text: string;
    private _position: THREE.Vector3;
    private _mesh: THREE.Mesh;
    private _font: THREE.Font;
    private _loaded: boolean;
    private _loadEvent: CustomEvent;
    
    constructor(name: string, text: string, position: THREE.Vector3)
    {
        this._name = name;
        this._loadEvent = new CustomEvent('fontloaded', { detail: this });
        this._loaded = false;
        this._text = text;
        this._position = position;

        var fontLoader = new THREE.FontLoader();
        var textGeometry;

        // asynchronous font loader
        fontLoader.load('/TsTuto/src/res/Lato_Thin_Regular.json', (response) => {
            this._font = response;
            this._loaded = true
        });

        this._pushText();
    }

    public mesh = () =>
    {
        return this._mesh;
    }

    public loaded = () =>
    {
        return this._loaded;
    }

    private _pushText = () =>
    {
        var loading = requestAnimationFrame(() => this._pushText());

        if (this._loaded === true)
        {
            cancelAnimationFrame(loading);

            var textGeometry = new THREE.TextGeometry(this._text, 
            {
                font: this._font,
                size: 65,
                height: 0.05,
                curveSegments: 10
            });
                
            var textMaterial = new THREE.MeshBasicMaterial({color: 0xF9FAF2});

            this._mesh = new THREE.Mesh(textGeometry, textMaterial);

            this._mesh.position.set(this._position.x, this._position.y, this._position.z);
            
            document.dispatchEvent(this._loadEvent);
        }
    }

    public name = () =>
    {
        return this._name;
    }

    public position = () =>
    {
        return this._position;
    }
}