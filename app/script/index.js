(function () {

    document.addEventListener('DOMContentLoaded', () => {

        bth   = document.querySelector('#run__function');

        // x^2 + 3x + 2 - example

        console.log(bth);

        bth.addEventListener('click', () => {

            let a = document.querySelector('#fun1').value,
                b = document.querySelector('#fun2').value,
                c = document.querySelector('#fun3').value;

            a = parseInt(a);
            b = parseInt(b);
            c = parseInt(c);

            answer(a, b, c);

        });

        const answer = (a, b, c) => {

            // Дискриминант и точки
            const D = Math.pow(b, 2) - 4 * a * c;

            let strD = `${b}^2 - 4 * ${a} * ${c} = ${D}`

            let X1, X2;

            let blockD = document.querySelector('.decision__wrapper');
            blockD.innerHTML = '<div class="decision"><ul></ul></div>';

            if (D > 0) {
                X1 = (-b + Math.sqrt(D)) / (2 * a);
                let strX1 = `X1 = (-${b} - sqrt(${D})) / (2 * ${a}) = ${X1}`;
                X2 = (-b - Math.sqrt(D)) / (2 * a);
                let strX2 = `X2 = (-${b} + sqrt(${D})) / (2 * ${a}) = ${X2}`;

                document.querySelector('.decision > ul').innerHTML = `
                    <li class="disk">
                        <span class="title">Дискриминант:</span>
                        <span class="exp1">${strD}</span>
                    </li>
                    <li class="kor">
                        <span class="title">Корни:</span>
                        <span class="exp1">${strX1}</span>
                        <span class="exp2">${strX2}</span>
                    </li>
                `;
            } else if (D === 0) {
                X1 = (-b - D) / (2 * a);
                let strX1 = `(-${b} - sqrt(${D})) / (2 * ${a}) = ${X1}`;
                document.querySelector('.decision > ul').innerHTML = `
                    <li class="disk">
                        <span class="title">Дискриминант:</span>
                        <span class="exp1">${strD}</span>
                    </li>
                    <li class="kor">
                        <span class="title">Корни:</span>
                        <span class="exp1">${strX1}</span>
                    </li>
                `;
            } else {
                document.querySelector('.decision > ul').innerHTML = `
                    <li class="disk">
                        <span class="title">Дискриминант:</span>
                        <span class="exp1">${strD}</span>
                    </li>
                    <li class="kor">
                        <span class="title">Корней нет!</span>
                    </li>
                `;
            }

            strD = `D = (${b})^2 - 4 * ${a} * ${c} = ${D}`;


            let blockP = document.querySelector('.properties__wrapper');
            blockP.innerHTML = `<div class="properties">
                <div class="graph">
                    <span class="title">График:</span>
                    <canvas width=300 height=300></canvas>
                </div>
                <div class="properties__more">
                    <ul>
                        <li class="DY">
                            <span class="title">Область определения:</span>
                            <span class="exp1">D(y)R</span>
                        </li>
                    </ul>
                </div>
            </div>`;

            // Точки пересечения X
            if ((X1 && !X2) || (X1 && X2)) {

                if (X1 && !X2) {
                    document.querySelector('.properties__more > ul').innerHTML += `
                        <li class="perechX">
                            <span class="title">Пересечения с Ох:</span>
                            <span class="exp1">Х = ${X1}</span>
                        </li>
                    `;
                } 
                
                if (X1 && X2) {
                    document.querySelector('.properties__more > ul').innerHTML += `
                        <li class="perechX">
                            <span class="title">Пересечения с Ох:</span>
                            <span class="exp1">Х1 = ${X1}</span>
                            <span class="exp2">Х2 = ${X2}</span>
                        </li>
                    `;
                }
                
            } else {
                document.querySelector('.properties__more > ul').innerHTML += `
                        <li class="perechX">
                            <span class="title">Пересечений с Ох нет!</span>
                        </li>
                    `;
            }

            // Точки пересечения Y
            Y1 = a * Math.pow(0, 2) + b * 0 + c

            document.querySelector('.properties__more > ul').innerHTML += `
                <li class="perechY">
                    <span class="title">Пересечения с Оy:</span>
                    <span class="exp1">Y = ${Y1}</span>
                </li>
            `;

            // График
            graph(a, b, c);

        };

        const error = () => {
            return;
        };

        const graph = (a, b, c) => {
            let y     = x => Math.pow(x, 2) + b * x + c,
                //let fdas = `${a * Math.pow(x, 2)} ${b * x} ${c}` ;  Math.pow(x, 2) + 3 * x - 2;
                scale = 25,
                step  = 1,
                cnvs  = document.querySelector('canvas'),
                ctx   = cnvs.getContext('2d');
            
            ctx.lineWidth = 0.5;
            
            for (let i = step * scale; i < cnvs.width; i += step * scale) { //вертикальные
                wrap('#888d9d', [[i, 0], [i, cnvs.height]]);
            }
            
            for (let i = step * scale; i < cnvs.height; i += step * scale) { //Горизонтальные
                wrap('#888d9d', [[0, i], [cnvs.width, i]]);
            }
            
            ctx.lineWidth = 2;
            let pts = [];

            for (let x = -cnvs.width / 2; x < cnvs.width / 2; x += 5) {
                pts.push([cnvs.width / 2 + x, cnvs.height / 2 - y(x / scale) * scale]);
            }

            wrap('hsl(267deg 90% 65%)', pts);
            
            //Ось X 
            wrap('red', [[0, cnvs.height / 2], [cnvs.width, cnvs.height / 2]]);
            
            // ось Y
            wrap('green', [[cnvs.width / 2, 0], [cnvs.width / 2, cnvs.height]]);
            
            
        };

        const wrap = (color, pts) => {
            let cnvs = document.querySelector('canvas');
            let ctx = cnvs.getContext('2d');
            ctx.strokeStyle = color;
            ctx.beginPath();
            pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p));
            ctx.stroke();
        }

    });

})(window, document);