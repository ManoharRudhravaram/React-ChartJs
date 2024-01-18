import React, { useRef, useState } from 'react'
import NewModal from './NewModal'
import NewDisaplay from './NewDisaplay'
import BarChart from './BarChart'
import PieChart from './PieChart'

function NewPage() {
    let [toggle, setToggle] = useState({ modal: false, form: false })
    let [data, setData] = useState({ title: '', amount: '', date: '' })
    let [errObj, setErrObj] = useState(null)
    let [arr, setArr] = useState([])
    const [focusedInput, setFocusedInput] = useState(null);
    let objKeys = Object.keys(data)
    let objValues = Object.values(data)
    
    let mainData = arr.reduce((acc, data) => {
        let date = new Date(data.date)
        let year = date.getFullYear()
        let month = date.toLocaleString('default', { month: 'long' })
        let key = `${year}_${month}`
        if (acc[key]) {
            acc[key].amount += parseInt(data.amount)
        }
        else {
            acc[key] = {
                month, year, amount: parseInt(data.amount)
            }
        }
        return acc
    }, [])

    const chartData = {
        labels: Object.keys(mainData).map((e) => {
            return e
        }),
        datasets: [
            {
                label: 'Amount',
                data: Object.values(mainData).map((e) => {
                    return e.amount
                }),
                backgroundColor: ['rgba(75,192,12,1)', "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"],
                barThickness: 100
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };

    const ChartData = {
        data: {
            labels: Object.keys(mainData),
            datasets: [{
                backgroundColor: [
                    "#b91d47",
                    "#00aba9",
                    "#2b5797",
                    "#e8c3b9",
                    "#1e7145"
                ],
                data: Object.values(mainData).map((e) => e.amount)
            }]
        },
        options: {
            title: {
                display: true,
                text: "Amount"
            }
        }
    }


    function commonHandler(e) {
        let { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    function submitHandle(e) {
        e.preventDefault()
        let set = Validation(data)
        if (Object.keys(set).length == 0) {
            setArr([...arr, {...data,id:Math.random()}])
            setErrObj({})
            setData({ title: '', amount: '', date: '' })
        }
        else {
            setErrObj(set)
            setToggle({ ...toggle, modal: true })
        }
    }

    function Validation(name) {
        let validData = { ...name };
        let arr = Object.values(validData).every((value) => {
            return value === ''
        })
        let count = 0;
        let msg = {}
        while (count < objKeys.length) {
            if (arr) {
                msg[objKeys[count]] = `all fields are required`
                count++
                break;
            }
            if (name[objKeys[count]] == "" || [objKeys[count]] == name) {
                msg[objKeys[count]] = ` ${[objKeys[count]] == name ? name : objKeys[count]} is required`
            }
            else if (objValues[count] == '') {
                msg[objKeys[count]] = `all fields are required`
            }
            count++;
        }
        return msg;
    }

    function handleBlur(e) {
        let { name, value } = e.target;
        if (value === '') {
            let blurObj = Validation(name)
            setErrObj(blurObj)
            setFocusedInput(name);
        }
        else {
            setFocusedInput(null);
        }
    }

    function discard(e) {
        e.preventDefault()
        setData({ title: '', amount: '', date: '' })
    }

    function delHandler(id){
        let updated=arr.filter((item)=>{
            return item.id!==id
        })
        setArr(updated)
    }
    
    return (
        <>
            <div className=' flex justify-evenly items-center m-2 flex-col'>
                <button className=' bg-purple-400 text-white p-1.5 rounded-sm m-2' onClick={() => { setToggle({ ...toggle, form: !toggle.form }) }}>{toggle.form ? 'Hide' : 'Show'}</button>
                {
                    toggle.form ? <form className=' h-[40vh] w-[40%] flex flex-col justify-evenly items-center rounded-xl bg-slate-300' onSubmit={submitHandle}>
                        <input type="text" className={`border h-10 rounded-lg ${focusedInput === 'title' ? 'border-red-500' : ''}`} placeholder='enter title' name='title' onChange={commonHandler} onBlur={handleBlur} value={data.title} />
                        <input type="number" className={`border h-10 rounded-lg ${focusedInput === 'amount' ? 'border-red-500' : ''}`} placeholder='enter amount' name='amount' onChange={commonHandler} onBlur={handleBlur} value={data.amount} />
                        <input type="date" className={`border h-10 rounded-lg ${focusedInput === 'date' ? 'border-red-500' : ''}`} name='date' onChange={commonHandler} onBlur={handleBlur} value={data.date} />
                        <div>
                            <button className=' bg-gray-600 p-2 m-1 rounded-sm text-white' >Add</button>
                            <button className=' bg-red-500  p-2 m-1 rounded-sm text-white' onClick={discard}>Discard</button>
                        </div>
                    </form> : <h1></h1>
                }
            </div>
            <div className=' flex items-center justify-evenly'>
                <BarChart chartData={chartData} options={options}/>
                {/* <PieChart ChartData={ChartData} /> */}
            </div>
            {
                toggle.modal ? <NewModal errObj={errObj} toggle={toggle} setToggle={setToggle} /> : <NewDisaplay arr={arr} delHandler={delHandler}/>
            }
        </>
    )
}

export default NewPage