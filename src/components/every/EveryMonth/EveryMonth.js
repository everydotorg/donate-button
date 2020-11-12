// import React, { useState, useEffect } from 'react'
;
import { useState, useEffect } from 'preact/hooks'
import styles from './style.css'
import appStyles from './styles'
import { Styled } from '../../../core/Styled'

import Donations from './Donations';
import OptionsContext from '../contexts/optionsContext';
import Description from './Description';
import DonationsContext from '../contexts/donationsContext';
import Images from './Images';
import Company from './Images/Company';
import WIDGET_MODE from '../constants/widgetMode';

function EveryMonth({ options, hide }) {
  const hideOnWrapperClick = e => e.target === e.currentTarget && hide()
  const [monthlyDonation, setMonthlyDonation] = useState(true);
  const [donationAmount, setDonationAmount] = useState('25');
  const [customDonation, setCustomDonation] = useState('');

  const [triggerAnimation, setTriggerAnimation] = useState([-1, 0]);
  const [monthlyLevels, setMonthlyLevels] = useState(options.monthly.levels.concat(options.monthly.allowCustom ? [options.monthly.custom] : []));
  
  useEffect(() => {
    // fade in down - fade out down-> [0] > [1]
    // fade in up - fade out up-> [0] < [1]
    const [prevValue, currValue] = triggerAnimation;

    if(prevValue > currValue) {
      const levelClasses = monthlyLevels.map((level, i) => {
        if(i === prevValue) {
          return {
            ...level,
            classes: ['fadeOutDown']
          }
        } else if (i === currValue) {
          return {
            ...level,
            classes: ['fadeInDown', 'right-panel__item--active']
          }
        }
        return level
      });
      setMonthlyLevels(levelClasses);
    }

    if(prevValue < currValue) {
      const levelClasses = monthlyLevels.map((level, i) => {
        if(i === prevValue) {
          return {
            ...level,
            classes: ['fadeOutUp']
          }
        } else if (i === currValue) {
          return {
            ...level,
            classes: ['fadeInUp', 'right-panel__item--active']
          }
        }
        return {...level, classes: ['right-panel__item--hidden']}
      })
      setMonthlyLevels(levelClasses);
    }

    const timeout = setTimeout(() => {
      const levelClasses = monthlyLevels.map((level, i) => {
        if(i === currValue){
          return {
            ...level,
            classes: ['right-panel__item--active']
          }
        } else {
          return {
            ...level,
            classes:['right-panel__item--hidden']
          }
        }
      })

      setMonthlyLevels(levelClasses);
    }, 300)

    return () => clearTimeout(timeout)
  }, [triggerAnimation])

  return (
    <Styled scoped={false} styles={appStyles}>
      <div>
    <div className="wrapper" onClick={hideOnWrapperClick}>
      <div className="close" onClick={hideOnWrapperClick}></div>
      <OptionsContext.Provider value={options}>
        <DonationsContext.Provider 
          value={{
            monthlyDonation,
            setMonthlyDonation,
            donationAmount,
            setDonationAmount,
            customDonation,
            setCustomDonation,
            setTriggerAnimation
          }}
        >
          {options.mode === WIDGET_MODE.SPLIT_PANEL && 
            <div className="widget widget--split">        
              <Donations 
                monthlyDonation={monthlyDonation}
                setMonthlyDonation={setMonthlyDonation}
              />
              <div className="right-panel">
                <Company />
                {monthlyLevels.map((level, i) => {

                  return (
                    <div key={i} className={['right-panel__item'].concat(level.classes).join(' ')}>
                      <Images image={level.img}/>
                      <Description bgColor={level.bgColor} />
                    </div>
                  )
                })}
                
              </div>
            </div>
          }
          { options.mode === WIDGET_MODE.SINGLE &&
              <div className="widget widget--single">        
              <Donations 
                monthlyDonation={monthlyDonation}
                setMonthlyDonation={setMonthlyDonation}
              />
            </div>
          }

      </DonationsContext.Provider>
      </OptionsContext.Provider>
    </div>
    </div>
   </Styled>
  )
}

export default EveryMonth
