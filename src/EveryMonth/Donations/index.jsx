import React, { useState } from 'react'
import './donations.css';

import RadioButton from '../RadioButton';

const Donations = () => {
    const [selectedOption, setSelectedOption] = useState('25');

    return (
        <div className="donations__form">
            <RadioButton 
              name="amount"
              text="Sponge Supporter"
              amount="25"
              selected={selectedOption === "25"}
              handleClick={() => setSelectedOption('25')} 
            />
            <RadioButton 
              name="amount"
              text="Friend of the reef"
              amount="50" 
              selected={selectedOption === "50"}
              handleClick={() => setSelectedOption('50')}
            />
            <RadioButton 
              name="amount"
              text="Coral Champion"
              amount="100"
              selected={selectedOption === "100"} 
              handleClick={() => setSelectedOption('100')}
            />
        </div>
    )
}

export default Donations;