import { React, useState, useEffect } from 'react'
// import Option from './Option'
import category from '../data';
function DonatePage() {
    const [ categoryData ] = useState(category);
    const [selectedFruit, setSelectedFruit] = useState('-- select category --');

    useEffect(() =>{
        console.log(selectedFruit)
    },[selectedFruit])

  return (
    <div className='donate-page'>
        <h1 className='donate-page-title'>What are you looking to donate today?</h1>
        <select className='select' value={selectedFruit}
                onChange={e => setSelectedFruit(e.target.value)}>
        <option> -- select category --</option>
            {
                categoryData.map((category) =>{
                    const {name, id} = category
                    return (
                        <option key={id} value = {name}>{name}</option>
                    )
                })
            }
        </select>
    </div>
  )
}

export default DonatePage
