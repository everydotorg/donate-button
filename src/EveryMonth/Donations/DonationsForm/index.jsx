import React, { useState, useContext } from 'react'

import RadioButton from '../../RadioButton';
import Input from '../../Input';
import Button from '../../Button';
import OptionsContext from '../../../contexts/optionsContext';
import useI18n from '../../../hooks/useI18n';
import { replaceKeys } from '../../../helpers/interpolation';
import isFunction from '../../../helpers/is-function';
import DonationsContext from '../../../contexts/donationsContext';

const getButtonTextFormatted = (amount, text) => {
  if(amount && !isNaN(amount)){
    return replaceKeys({amount: `$${amount}`}, text);
  }
  return replaceKeys({amount: ''}, text);
}

const constructEveryUrl = (company, frequency, amount, extras) => {
  const baseUrl = `https://www.every.org/${company}/donate?frequency=${frequency}&amount=${amount}`
  const extraParams = Object.keys(extras).reduce((prev, key) => {
    return prev.concat(`&${key}=${extras[key]}`)
  }, '');

  return `${baseUrl}${extraParams}`;
}

const DonationsForm = ({monthlyDonation}) => {
    const {donationAmount, setDonationAmount, customDonation, setCustomDonation} = useContext(DonationsContext)

    const { monthly, oneTime, onSubmit } = useContext(OptionsContext);
    const lang = useI18n();
    const formText = monthlyDonation ? lang.monthly : lang.oneTime;

  
    const handleRadioButtonClick = (amount) => {
      setDonationAmount(amount);
      setCustomDonation('');
    }

    const handleInputChange = (value) => {
      setDonationAmount(value);
      setCustomDonation(value);
    }

    const handleDonateButton = () => {
      if(!isNaN(donationAmount)){
        const frequency = monthlyDonation ? 'MONTHLY' : 'ONCE';

        if(isFunction(onSubmit)) {
          onSubmit({amount: donationAmount, frequency })
        } else {
          const url = constructEveryUrl(onSubmit.charity, frequency, donationAmount, onSubmit.params);
          window.location.href = url;
        }
      }
    }

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
              text={formText.levels.find(level  => level.amount === option.amount)?.name}
              amount={option.amount}
              selected={donationAmount === option.amount}
              handleClick={() => handleRadioButtonClick(option.amount)} 
            />
            ))}
            {monthly.allowCustom && <Input 
              label={formText.custom.label}
              placeholder={formText.custom.placeholder}
              value={customDonation}
              setValue={handleInputChange}
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
              selected={donationAmount === option}
              handleClick={() => handleRadioButtonClick(option)} 
            />
            ))}
            {oneTime.allowCustom && <Input 
              placeholder={formText.custom.placeholder}              
              value={customDonation}
              setValue={handleInputChange}
              extraClasses={["donations__input--one-time"]}
            />}
          </>
          }
            
        </div>
        <div className="donations__submit">
          <Button handleClick={handleDonateButton}>{getButtonTextFormatted(donationAmount, formText.button)}</Button>
          <p className="t-body--small">
            Great Barrier Reef Legacy uses our trusted partner Every.org, to power donation processing. 
            You will be directed to Every.org to complete your donation.
          </p>
        </div>
      </>
    )
}

export default DonationsForm;