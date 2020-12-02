import { Fragment } from 'preact'
import { useContext, useState, useEffect } from 'preact/hooks'
import RadioButton from '../../RadioButton';
import Input from '../../Input';
import Button from '../../Button';
import OptionsContext from '../../../contexts/optionsContext';
import useI18n from '../../../hooks/useI18n';
import { replaceKeys, replaceTagWithComponent } from '../../../helpers/interpolation';
import isFunction from '../../../helpers/is-function';
import DonationsContext from '../../../contexts/donationsContext';
import DonateButton from '../DonateButton';

const getButtonTextFormatted = (amount, text, currency) => {
  if(amount && !isNaN(amount)){
    return replaceKeys({amount: `$${amount} ${currency}`}, text);
  }
  return replaceKeys({amount: ''}, text);
}

const constructEveryUrl = (company, frequency, amount, mode, extras) => {
  const baseUrl = `https://www.every.org/${company}/donate?frequency=${frequency}&amount=${amount}&utm_campaign=single-or-split&utm_content=${mode.toLowerCase()}&utm_source=${company}&utm_medium=every-month`
  const extraParams = Object.keys(extras).reduce((prev, key) => {
    return prev.concat(`&${key}=${extras[key]}`)
  }, '');

  return `${baseUrl}${extraParams}`;
}

const getLevelOfAmount = (levels, amount) => {
  return levels.findIndex(l => l.amount == amount);
}

const getBoldFormatted = (text) => {
  const comp = 'span';
  const props = {};
  const tag = 'bold';

  return replaceTagWithComponent(text, tag, comp, props);
}

const DonationsForm = ({monthlyDonation}) => {
    const {donationAmount, setDonationAmount, customDonation, setCustomDonation, setTriggerAnimation} = useContext(DonationsContext)

    const { monthly, oneTime, onSubmit, currency, mode } = useContext(OptionsContext);
    const [customInputFocus, setCustomInputFocus] = useState(false);

    const lang = useI18n();
    const formText = monthlyDonation ? lang.monthly : lang.oneTime;

    useEffect(() => {
      const defaultLevel = monthly.levels.find(level => level.default)
      if(defaultLevel) {
        handleRadioButtonClick(monthly.levels[0].amount)
        const defaultSelectionTimeout = setTimeout(() => {
          handleRadioButtonClick(defaultLevel.amount)
        })
  
        return () => clearTimeout(defaultSelectionTimeout)
      }
    }, [])

    const handleCustomInputFocus = () => {
      const prevLevel = getLevelOfAmount(monthly.levels, donationAmount);
      const currLevel = monthly.levels.length - 1;
      if(monthlyDonation) {
        setTriggerAnimation([prevLevel, currLevel])
      }
      
      setDonationAmount(customDonation)
      setCustomInputFocus(true);
    }

    const handleCustomInputBlur = () => {
      setCustomInputFocus(false);
    }
  
    const handleRadioButtonClick = (amount) => {
      // Custom donation is always the last control
      // If we have a custom donation the previous level is the custom input.
      const prevLevel = customDonation || !donationAmount ? monthly.levels.length - 1 : getLevelOfAmount(monthly.levels, donationAmount);
      const currLevel = getLevelOfAmount(monthly.levels, amount);
      
      if(monthlyDonation) {
        setTriggerAnimation([prevLevel, currLevel])
      }
      setDonationAmount(amount);
      setCustomDonation('');
    }

    const handleInputChange = (value) => {
      setDonationAmount(value);
      setCustomDonation(value);
    }

    const handleDonateButton = (mode) => {
      if(!isNaN(donationAmount)){
        const frequency = monthlyDonation ? 'MONTHLY' : 'ONCE';

        if(isFunction(onSubmit)) {
          onSubmit({amount: donationAmount, frequency })
        } else {
          const url = constructEveryUrl(onSubmit.charity, frequency, donationAmount, mode, onSubmit.params);
          window.location.href = url;
        }
      }
    }

    const formClasses = ["donations__form"]
      .concat([monthlyDonation ? "donations__form--monthly" : "donations__form--one-time"])

    const fixedLevels = monthly.levels.filter(level => level.amount !== 'custom')
    const customLevel = monthly.levels.find(level => level.amount === 'custom')

    return (
      <Fragment>
        <div className={formClasses.join(' ')}>
          {monthlyDonation &&
          <Fragment>
          {fixedLevels.map((option, i) => (
          <RadioButton 
              key={i}
              name="amount"
              text={formText.levels.find(level  => level.amount === option.amount).name}
              amount={option.amount}
              selected={donationAmount === option.amount}
              handleClick={() => handleRadioButtonClick(option.amount)} 
              description={getBoldFormatted(formText.levels.find(level  => level.amount === option.amount).description1)}
              image={option.img}
              bgColor={option.bgColor}
            />
            ))}
            {customLevel && <Input 
              label={formText.custom.label}
              placeholder={formText.custom.placeholder}
              value={customDonation}
              setValue={handleInputChange}
              description={lang.oneTime.description}
              onFocus={handleCustomInputFocus}
              onBlur={handleCustomInputBlur}
              selected={customInputFocus}
            />}
          </Fragment>
          }

          {!monthlyDonation &&
          <Fragment>
          {oneTime.levels.map((option) => (
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
              onFocus={handleCustomInputFocus}
              onBlur={handleCustomInputBlur}
              selected={customInputFocus}
            />}
          </Fragment>
          }
            
        </div>
        <div className="donations__submit">
          {/* <Button extraClasses={['u-hide-mobile']} handleClick={() => handleDonateButton(mode)}>{getButtonTextFormatted(donationAmount, formText.button, currency)}</Button> */}
          <DonateButton extraClasses={['u-hide-mobile']} />
          <p className="t-body--small">
            {lang.footer}
          </p>
        </div>
      </Fragment>
    )
}

export default DonationsForm;