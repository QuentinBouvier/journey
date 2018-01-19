/**
 * All the properties to build a camera
 * 
 * @member { number } fov
 * @member { number } aspect
 * @member { number } near
 * @member { number } far
 * @member { number } x
 * @member { number } y
 * @member { number } z
 * 
 * @export
 * @interface camOpt
 */
export interface camOpt {
    fov, aspect, near, far: number;
    x, y, z: number;
}

/**
 * The three coordinates of the space (Light Vector3)
 * 
 * @member { number } x
 * @member { number } y
 * @member { number } z
 * 
 * @export
 * @interface coord
 */
export interface coord {
    x, y, z: number;
}

/**
 * Interface for renderer options constructor.
 */
export interface rndOpt {
    options: {[key:string]:any};
    width, height: number;
}