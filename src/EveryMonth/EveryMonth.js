import React, { useState, useEffect } from 'react'
import './style.css'

import Donations from './Donations';
import OptionsContext from '../contexts/optionsContext';
import Description from './Description';
import DonationsContext from '../contexts/donationsContext';
import Images from './Images';

function EveryMonth({ options, hide }) {
  const hideOnWrapperClick = e => e.target === e.currentTarget && hide()
  const [monthlyDonation, setMonthlyDonation] = useState(true);
  const [donationAmount, setDonationAmount] = useState('25');
  const [customDonation, setCustomDonation] = useState('');

  const [triggerAnimation, setTriggerAnimation] = useState([-1, 0]);
  const [monthlyLevels, setMonthlyLevels] = useState(options.monthly.levels);

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
    <div className="wrapper" onClick={hideOnWrapperClick}>
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
        <div className="widget">
          <Donations 
            monthlyDonation={monthlyDonation}
            setMonthlyDonation={setMonthlyDonation}
          />
          <div className="right-panel">
            {monthlyLevels.map((level, i) => {

              return (
                <div className={['right-panel__item'].concat(level.classes).join(' ')}>
                  <Images image={level.img}/>
                  <Description bgColor={level.bgColor} />
                </div>
              )
            })}
{/*             
            <div className="right-panel__item fadeInDown">
              <Images />
              <Description />
            </div>
            <div className="right-panel__item fadeOutDown">
              <Images />
              <Description />
            </div> */}
          </div>
        </div>
      </DonationsContext.Provider>
      </OptionsContext.Provider>
    </div>
  )
}

export default EveryMonth
