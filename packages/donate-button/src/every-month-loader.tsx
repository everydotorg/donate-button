import { useEffect, useState } from 'preact/hooks'
import defaultOptions from './defaultOptions'
import experiment from './experiment'
import WIDGET_MODE from './constants/widgetMode'


const canUseSplitPanel = (options) => {
  const allMonthlyLevelsHasImages = options.monthly.levels.every(level => !!level.img)
  const oneTimeLevelHasImage = options.oneTime.img

  return allMonthlyLevelsHasImages && oneTimeLevelHasImage
}

let originalOverflow;
const getOriginalOverflow = () => {
  const body = document.querySelector('body')

  if(!originalOverflow){
    originalOverflow = body.style.overflow ? body.style.overflow : 'unset'
  }

  return originalOverflow
}

const addOverflowToBody = () => {
  const body = document.querySelector('body')
  if(body){
    body.style.overflow = 'hidden';
  }
}

const removeOverflowFromBody = () => {
  const body = document.querySelector('body')
  const overflow = getOriginalOverflow()
  if(body){
    body.style.overflow = overflow
  }
} 

export const EveryMonthLoader = ({ options = {}, hide }) => {
  const [EveryMonth, widgetLoaded] = useState()

  // when show is set to true and EveryMonth is not loaded, load it
  useEffect(() => {
    if (options.show && !EveryMonth)
      import('./components/EveryMonth').then((m) =>
        widgetLoaded(() => m.default)
      )
  }, [options.show, EveryMonth])

  removeOverflowFromBody()
  // Not showing
  if (!options.show) return null

  addOverflowToBody()
  // Loading
  if (options.show && !EveryMonth) return 'Loading...' // TODO - nicer loader

  const finalOptions = canUseSplitPanel({ ...defaultOptions, ...options })
    ? { ...defaultOptions, ...experiment(), ...options }
    : { ...defaultOptions, ...options, mode: WIDGET_MODE.SINGLE }

  return <EveryMonth options={finalOptions} hide={hide} />
}

export default EveryMonthLoader
