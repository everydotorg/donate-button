import { useState, useEffect } from 'preact/hooks'
import appStyles from './styles'
import { Styled } from '../Styled/Styled'

import Donations from '../Donations'
import OptionsContext from '../../contexts/optionsContext'
import Description from '../Description'
import DonationsContext from '../../contexts/donationsContext'
import Images from '../Images'
import Company from '../Images/Company'
import WIDGET_MODE from '../../constants/widgetMode'
import Button from '../Button'
import DonateButton from '../Donations/DonateButton'

function EveryMonth({ options, hide }) {
  const hideOnWrapperClick = (e) => e.target === e.currentTarget && hide()
  const isMonthlyDefault = options.defaultMode !== 'one-time'

  const [monthlyDonation, setMonthlyDonation] = useState(isMonthlyDefault)

  const defaultLevel = options.monthly.levels.find(level => level.default)
  const [donationAmount, setDonationAmount] = useState(defaultLevel?.amount || options.monthly.levels?.[0]?.amount)
  const [customDonation, setCustomDonation] = useState('')
  const [triggerAnimation, setTriggerAnimation] = useState([-1, 0])
  const [monthlyLevels, setMonthlyLevels] = useState(
    // custom must be the last level
    options.monthly.levels.sort((a,b) => isNaN(b.amount) ? -1 : 0)
  )

  useEffect(() => {
    // fade in down - fade out down-> [0] > [1]
    // fade in up - fade out up-> [0] < [1]
    const [prevValue, currValue] = triggerAnimation

    if (prevValue > currValue) {
      const levelClasses = monthlyLevels.map((level, i) => {
        if (i === prevValue) {
          return {
            ...level,
            classes: ['fadeOutDown'],
          }
        } else if (i === currValue) {
          return {
            ...level,
            classes: ['fadeInDown', 'right-panel__item--active'],
          }
        }
        return level
      })
      setMonthlyLevels(levelClasses)
    }

    if (prevValue < currValue) {
      const levelClasses = monthlyLevels.map((level, i) => {
        if (i === prevValue) {
          return {
            ...level,
            classes: ['fadeOutUp'],
          }
        } else if (i === currValue) {
          return {
            ...level,
            classes: ['fadeInUp', 'right-panel__item--active'],
          }
        }
        return { ...level, classes: ['right-panel__item--hidden'] }
      })
      setMonthlyLevels(levelClasses)
    }

    const timeout = setTimeout(() => {
      const levelClasses = monthlyLevels.map((level, i) => {
        if (i === currValue) {
          return {
            ...level,
            classes: ['right-panel__item--active'],
          }
        } else {
          return {
            ...level,
            classes: ['right-panel__item--hidden'],
          }
        }
      })

      setMonthlyLevels(levelClasses)
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
                setTriggerAnimation,
              }}
            >
              {options.mode.toUpperCase() === WIDGET_MODE.SPLIT_PANEL && (
                <div className="widget widget--split">
                  <Donations
                    monthlyDonation={monthlyDonation}
                    setMonthlyDonation={setMonthlyDonation}
                  />
                  <div className="right-panel">
                    <Company />
                    {monthlyLevels.map((level, i) => {
                      return (
                        <div
                          key={i}
                          className={['right-panel__item']
                            .concat(level.classes)
                            .join(' ')}
                        >
                          <Images image={level.img} />
                          <Description bgColor={level.bgColor} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              {options.mode.toUpperCase() === WIDGET_MODE.SINGLE && (
                <div className="widget widget--single">
                  <Donations
                    monthlyDonation={monthlyDonation}
                    setMonthlyDonation={setMonthlyDonation}
                  />
                </div>
              )}
              <div className="u-hide-desktop btn-mobile">
                <DonateButton monthlyDonation={monthlyDonation} extraClasses={['u-hide-desktop']} />
              </div>
            </DonationsContext.Provider>
          </OptionsContext.Provider>
        </div>
      </div>
    </Styled>
  )
}

export default EveryMonth
