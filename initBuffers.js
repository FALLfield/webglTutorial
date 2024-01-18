function initBuffers(gl) {
    const positionBuffer = initPositionBuffer(gl);

    const colorBuffer = initColorBuffers(gl);

    const indexBuffer = initIndexBuffer(gl);
    console.log(indexBuffer);

    return {
        position: positionBuffer,
        color: colorBuffer,
        indices: indexBuffer,
    };
}

function initPositionBuffer(gl){
    //Create a buffer for the square's positions
    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [
        // Front face
        -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,

        // Back face
        -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,

        // Top face
        -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,

        // Right face
        1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,

        // Left face
        -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    return positionBuffer;

}

function initColorBuffers(gl){
    const faceColors = [
        [1.0, 1.0, 1.0, 1.0],//white: Front Face
        [1.0, 0.0, 0.0, 1.0],//Red: Back Face
        [0.0, 1.0, 0.0, 1.0],//Green: Top Face
        [0.0, 0.0, 1.0, 1.0],//blue: Bottom Face
        [1.0, 1.0, 0.0, 1.0],//Yellow: Right Face
        [1.0, 0.0, 1.0, 1.0],//Purple: Left Face
    ];

    let colors = [];
    for( let i = 0 ; i < faceColors.length, i++;){
        const c = faceColors[i];
        //Repeat each color four times for the four vertexes of the face
        colors = colors.concat(c, c, c, c);
    }

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    return colorBuffer;
}

function initIndexBuffer(gl) {
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    const indices = [
        0, 1, 2, 0, 2, 3,//Front
        4, 5, 6, 4, 6, 7,//Back
        8, 9, 10, 8, 10, 11,//Top
        12, 13, 14, 12, 14, 15,//Bottom
        16, 17, 18, 16, 18, 19,//Right
        20, 21, 22, 20, 22, 23,//Left
    ];

    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices),
        gl.STATIC_DRAW,
    );

    return indexBuffer;
}

export {initBuffers};