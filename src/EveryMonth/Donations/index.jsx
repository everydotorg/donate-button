import React, { useState, useContext } from 'react'
import './donations.css';

import RadioButton from '../RadioButton';
import Input from '../Input';
import Button from '../Button';
import OptionsContext from '../optionsContext';
import useI18n from '../../hooks/useI18n';
import { replaceKeys } from '../../helpers/interpolation';

const getButtonTextFormatted = (amount, text) => {
  return replaceKeys({amount}, text);
}

const Donations = ({monthlyDonation}) => {
    const [selectedOption, setSelectedOption] = useState('25');
    const [customAmount, setCustomAmount] = useState('');

    const { monthly, oneTime } = useContext(OptionsContext);
    const lang = useI18n();
    const formText = monthlyDonation ? lang.monthly : lang.oneTime;

  
    const formClasses = ["donations__form"]
      .concat([monthlyDonation ? "donations__form--monthly" : "donations__form--one-time"])

    return (
      <>
        <div className={formClasses.join(' ')}>
          {monthlyDonation &&
          <>
          {monthly?.levels?.map((option, i) => (
          <RadioButton 
              key={i}
              name="amount"
              text={formText.levels[i]}
              amount={option.amount}
              selected={selectedOption === option.amount}
              handleClick={() => setSelectedOption(option.amount)} 
            />
            ))}
            {monthly.allowCustom && <Input 
              label={formText.custom.label}
              placeholder={formText.custom.placeholder}
              value={customAmount}
              setValue={setCustomAmount}
            />}
          </>
          }

          {!monthlyDonation &&
          <>
          {oneTime?.levels?.map((option) => (
          <RadioButton 
              key={option}
              name="amount"
              amount={option}
              selected={selectedOption === option}
              handleClick={() => setSelectedOption(option)} 
            />
            ))}
            {oneTime.allowCustom && <Input 
              placeholder={formText.custom.placeholder}
              value={customAmount}
              setValue={setCustomAmount}
              extraClasses={["donations__input--one-time"]}
            />}
          </>
          }
            
        </div>
        <div className="donations__submit">
          <Button>{getButtonTextFormatted(selectedOption, formText.button)}</Button>
          <p className="t-body--small">
            Great Barrier Reef Legacy uses our trusted partner Every.org, to power donation processing. 
            You will be directed to Every.org to complete your donation.
          </p>
        </div>
      </>
    )
}

export default Donations;