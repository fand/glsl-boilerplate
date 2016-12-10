window.onload = function () {
    // canvasエレメントを取得
    var c = document.getElementById('canvas');
    c.width = 500;
    c.height = 300;

    // webglコンテキストを取得
    var gl = c.getContext('webgl') || c.getContext('experimental-webgl');

    // canvasを黒でクリア(初期化)する
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vs = createShaderFromElementId(gl, 'vs');
    const fs = createShaderFromElementId(gl, 'fs');
    const program = createProgram(gl, vs, fs);

    registerVbo(gl, program, 'position', 3, [
         0.0, 1.0, 0.0,
         1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0
    ]);

    registerVbo(gl, program, 'color', 4, [
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0
    ]);

    const mvpMatrix1 = createMvp(
        [1.5, 0, 0],
        [[0.0, 1.0, 3.0], [0, 0, 0], [0, 1, 0]],
        [90, c.width / c.height, 0.1, 100]
    );
    const mvpMatrix2 = createMvp(
        [-1.5, 0, 0],
        [[0.0, 1.0, 3.0], [0, 0, 0], [0, 1, 0]],
        [90, c.width / c.height, 0.1, 100]
    );

    const uniLocation = gl.getUniformLocation(program, 'mvpMatrix');

    gl.uniformMatrix4fv(uniLocation, false, mvpMatrix1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.uniformMatrix4fv(uniLocation, false, mvpMatrix2);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.flush();
};

function registerVbo (gl, program, name, stride, data) {
    const attLocation = gl.getAttribLocation(program, name);
    const vbo = createVbo(gl, data);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.enableVertexAttribArray(attLocation);
    gl.vertexAttribPointer(attLocation, stride, gl.FLOAT, false, 0, 0);
}

function createMvp (translate, v, p) {
    const m = new matIV();

    // 各種行列の生成と初期化
    let mMatrix = m.identity(m.create());   // モデル変換行列
    let vMatrix = m.identity(m.create());   // ビュー変換行列
    let pMatrix = m.identity(m.create());   // プロジェクション変換行列
    let mvpMatrix = m.identity(m.create()); // 最終座標変換行列

    m.translate(mMatrix, translate, mMatrix);
    m.lookAt(...v, vMatrix);
    m.perspective(...p, pMatrix);

    // 各行列を掛け合わせる順序を示す一例
    m.multiply(pMatrix, vMatrix, mvpMatrix); // p に v を掛ける
    m.multiply(mvpMatrix, mMatrix, mvpMatrix); // さらに m を掛ける

    return mvpMatrix;
}

/**
 * @param {Object} gl   - gl context
 * @param {string} type - gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
 * @param {string} src  - シェーダのソースコード
 */
function createShader (gl, type, src) {
    if (type !== gl.VERTEX_SHADER && type !== gl.FRAGMENT_SHADER) {
        throw new TypeError(`Invalid shader type: "${type}"`);
    }

    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    // シェーダが正しくコンパイルされたかチェック
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        throw new Error('Failed to compile shader');
    }

    return shader;
}

function createShaderFromElementId (gl, id) {
    // HTMLからscriptタグへの参照を取得
    const scriptElement = document.getElementById(id);
    if (!scriptElement) {
        throw new Error(`Element "#${id}" not found`);
    }

    const mimeToType = {
        'x-shader/x-vertex'   : gl.VERTEX_SHADER,
        'x-shader/x-fragment' : gl.FRAGMENT_SHADER,
    };
    const type = mimeToType[scriptElement.type];
    if (!type) {
        throw new TypeError(`Invalid mimeType: "${scriptElement.type}"`);
    }

    return createShader(gl, type, scriptElement.text);
}

/**
 * @param {shader} vs - vertical shader
 * @param {shader} fs - fragment shader
 */
function createProgram (gl, vs, fs) {
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    gl.linkProgram(program);

    // シェーダのリンクが正しく行なわれたかチェック
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(`Failed to link shaders: ${gl.getProgramInfoLog(program)}`);
    }

    gl.useProgram(program);
    return program;
}

function createVbo (gl, data) {
    var vbo = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);  // バインド
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);  // バインド解除

    return vbo;
}
