import React, { useState } from 'react';
import './calculator.css'
export default function Calculator(props) {
    const [result, setResult] = useState('');

    const appendToResult = (value) => {
        setResult((prevResult) => prevResult + value);
    };

    const evaluateExpression = () => {
        try {
            setResult(eval(result));
        } catch (error) {
            setResult('Error');
        }
    };

    const clearResult = () => {
        setResult('');
    };
    if(props.mode==='dark'){
        document.body.style.backgroundColor='#134074'
    }
    else{
        document.body.style.backgroundColor='#1e88e5'
    }

    return (
        <div>
            <div className="body">
                <div id="con">
                    <h1 style={{ color: 'white' }}>Calculator</h1>
                    <input type="text" value={result} onChange={(e) => setResult(e.target.value)} placeholder="0" style={{ textAlign: 'end' }} className='input'/>
                    <div>
                        <button  className='butt' onClick={() => appendToResult('1')}>1</button>
                        <button  className='butt' onClick={() => appendToResult('2')}>2</button>
                        <button  className='butt' onClick={() => appendToResult('3')}>3</button>
                        <button  className='butt' onClick={() => appendToResult('%')}>%</button>
                    </div>
                    <div>
                        <button  className='butt' onClick={() => appendToResult('4')}>4</button>
                        <button  className='butt' onClick={() => appendToResult('5')}>5</button>
                        <button  className='butt' onClick={() => appendToResult('6')}>6</button>
                        <button  className='butt' onClick={() => appendToResult('/')}>/</button>
                    </div>
                    <div>
                        <button  className='butt' onClick={() => appendToResult('7')}>7</button>
                        <button  className='butt' onClick={() => appendToResult('8')}>8</button>
                        <button  className='butt' onClick={() => appendToResult('9')}>9</button>
                        <button  className='butt' onClick={() => appendToResult('+')}>+</button>
                    </div>
                    <div>
                        <button  className='butt' onClick={() => appendToResult('0')}>0</button>
                        <button  className='butt' onClick={() => appendToResult('*')}>*</button>
                        <button  className='butt' onClick={() => appendToResult('-')}>-</button>
                        <button  className='butt' onClick={clearResult}>clear</button>
                    </div>
                    <div>
                    <button  className='butt' onClick={evaluateExpression}>=</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
