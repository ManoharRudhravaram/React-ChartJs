import React, { useState } from 'react'

function NewDisaplay({ arr ,delHandler}) {
    const [filter, setFilter] = useState();
    const [toggle,setToggle]=useState(true)
    function filterData(e) {
        let found = arr.filter((data) => {
            let date=new Date(data.date).getFullYear()
            if (date == e.target.value) {
                setToggle(false)
                return data;
            }
           else if(e.target.value=='all'){
            setToggle(true)
            return data;
           }
        })
        setFilter(found)
    }
    
    return (
        <>
            <div className=' w-full flex flex-col items-center justify-evenly'>
            <select className=' border-t-2 border-b-2 w-52 m-2 border-black' onChange={(e) => filterData(e)}>
                {
                    ['all', ...new Set(arr.map(item => new Date(item.date).getFullYear()))].map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))
                }
            </select>
                {
                    toggle ? arr.map((item, i) => {
                        let month = new Date(item.date).getMonth();
                        let arr = ['January', 'February', 'March', "April", 'May', "June", 'July', "August", "September", 'October', 'November', "December"];
                        return <div key={i} className='flex items-center justify-around border-2 m-1 bg-gray-300 p-1 text-white w-full'>
                            <div className=' text-white bg-gray-700 w-40 rounded-lg flex items-center justify-evenly flex-col'>
                                <h3>{new Date(item.date).getDate()}</h3>
                                <h2>{arr[month]}</h2>
                                <h3>{new Date(item.date).getFullYear()}</h3>
                            </div>
                            <div >
                                <h2 className=' text-black text-2xl'>
                                    {item.title}
                                </h2>
                            </div>
                            <div className=' bg-blue-600 px-4 py-2 rounded-lg'>
                                <h2 className=' text-xl'>
                                    $ {item.amount}
                                </h2>
                            </div>
                                <button className=' bg-red-500 text-white p-2 rounded-md' onClick={()=>{delHandler(item.id)}}>DEL</button>
                        </div>
                    }) : (filter && filter?.map((item,i)=>{
                        let month = new Date(item.date).getMonth();
                        let arr = ['January', 'February', 'March', "April", 'May', "June", 'July', "August", "September", 'October', 'November', "December"];
                        return <div key={i} className='flex items-center justify-around border-2 m-1 bg-gray-300 p-1 text-white w-full'>
                            <div className=' text-white bg-gray-700 w-40 rounded-lg flex items-center justify-evenly flex-col'>
                                <h3>{new Date(item.date).getDate()}</h3>
                                <h2>{arr[month]}</h2>
                                <h3>{new Date(item.date).getFullYear()}</h3>
                            </div>
                            <div >
                                <h2 className=' text-black text-2xl'>
                                    {item.title}
                                </h2>
                            </div>
                            <div className=' bg-blue-600 px-4 py-2 rounded-lg'>
                                <h2 className=' text-xl'>
                                    $ {item.amount}
                                </h2>
                                <button className=' bg-red-500 text-white p-2'>DEL</button>
                            </div>
                        </div>
                    }))
                }
            </div>
        </>
    )
}

export default NewDisaplay