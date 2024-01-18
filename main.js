import {initBuffers} from "./initBuffers.js";
import {drawScene} from "./drawScene.js";

let cubeRotation = 0.0;
let deltaTime = 0;
main();


function main(){
    const canvas = document.getElementById("glcanvas");
    const gl = canvas.getContext("webgl");
    canvas.height = 800;
    canvas.width = 640;

    console.log(gl);

    const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    
    uniform mat4 uProjectionMatrix;
    uniform mat4 uModelViewMatrix;
    
    varying lowp vec4 vColor;
    
    void main(void){
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vColor = aVertexColor;
    }
`;
    const fgSource = `
    varying lowp vec4 vColor;
    
    void main(void){
        gl_FragColor = vColor;
    }
`;


    if(gl === null){
        alert("Your browser seems like doesn't support WebGL");
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const shaderProgram = initShaderProgram(gl, vsSource, fgSource);

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition:gl.getAttribLocation(shaderProgram, "aVertexPosition"),
            vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };

    const buffers = initBuffers(gl);
    console.log(buffers);

    let then = 0;

    function render(now) {
        now*= 0.001;
        deltaTime = now - then;
        then = now;

        drawScene(gl,programInfo,buffers,cubeRotation);
        cubeRotation += deltaTime;

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

function initShaderProgram(gl, vsSource, fgSource){
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fgSource);

    //Build Shader Program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
        alert(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
        return null;
    }
    return shaderProgram;

}
function loadShader(gl, type, source){
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        alert(`A error occurs while compiling WebGL shader: ${gl.getShaderInfoLog(shader)}`);
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}