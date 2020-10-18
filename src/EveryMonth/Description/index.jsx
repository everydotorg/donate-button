import React, { useEffect } from 'react'
import { useRef } from 'react'

const Description = ({ monthlyDonation }) => {
    const descrRef = useRef(null);
    // const { lang }
    useEffect(() => {

    }, [])
    console.log(descrRef.current);

    return (
        <div ref={descrRef} className="description">
            
        </div>
    )
}

export default Description
