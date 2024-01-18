import React from 'react'

function NewModal({ errObj, setToggle, toggle }) {
    let value=Object.values(errObj);
    return (
        <div className=' bg-slate-600 fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center' onClick={() => { setToggle({ ...toggle, modal: false }) }}>
            <div className='bg-red-400 flex justify-center items-center h-[30vh] w-[30%] rounded-lg'>
                <p>{value[0]}</p>
            </div>
        </div>
    )
}

export default NewModal