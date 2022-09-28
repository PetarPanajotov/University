import Plotly from 'plotly.js-dist';
import { abs, atan2, complex, cos, pi, sin } from 'mathjs';

function input() {
    let firstNum = document.getElementById('Us');
    let secondNum = document.getElementById('Ur');
    let thirdNum = document.getElementById('X');
    let fourthNum = document.getElementById('R');
    document.getElementById('button').addEventListener("click", function () {
        let Us = Number(firstNum.value);
        let Ur = Number(secondNum.value);
        let X = Number(thirdNum.value);
        let R = Number(fourthNum.value);
        console.log(Us)
        graph(Us, Ur, R, X)
    })
}
function generateTheta() {
    let theta = []
    for (let i = 0; i<= 360; i+=5) {
        theta.push(i)
    }
    return theta;
}
function toRad(ang) {
    return ang/180*pi
}
function graph(Us, Ur, X, R) {
    let P = [];
    let Q = [];
    let theta = generateTheta()
    for (let ang of theta) {
        let tempUs = complex(Us*cos(toRad(ang)), Us*sin(toRad(ang)) )
        let tempUr = complex(Ur, 0 );
        let tempZ = complex(R + X)
        let [p, q] = powerAngle(tempUs, tempUr, tempZ)
        P.push(p)
        Q.push(q)
        debugger;
    }
    let toPlot = document.getElementById('myDiv')
    let data = [{
        x: theta,
        y: Q,
        type: 'scatter',
        name: "Q"
        },
        {
        x: theta,
        y: P,
        type: "scatter",
        name: "P"
        }];
    let layout = {
        title: "Power-Angle equation",
        xaxis: {
            title: "Angle [deg]",
            showgrid: true,
            colorgrid: "yellow"
        },
        yaxis: {
            title: "Power[pu]",
            showgrid: true,
            colorgrid: "gray"
        },
    }
    Plotly.newPlot(toPlot,data, layout)
}
function powerAngle(Us, Ur, Z) {
    let Y = complex(1/Z);
    let alpha = pi/2 + atan2(Y.im, Y.re);
    let angs = atan2(Us.re, Us.im)
    let angr = atan2(Ur.re, Ur.im);

    let P = abs(Us)**2*abs(Y.re+Y.im)*sin(alpha) + abs(Us)*abs(Ur)*abs(Y.re+Y.im)*sin( angs - angr - alpha )
    let Q = abs(Us)**2*abs(Y.re+Y.im)*cos(alpha) - abs(Us)*abs(Ur)*abs(Y.re+Y.im)*cos( angs - angr - alpha );
    return [P,Q];

}
input();

