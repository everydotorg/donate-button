import { useEffect, useState } from 'preact/hooks'
import defaultOptions from './defaultOptions'
import experiment from './experiment'

export const EveryMonthLoader = ({ options = {}, hide }) => {
  const [EveryMonth, widgetLoaded] = useState()

  // when show is set to true and EveryMonth is not loaded, load it
  useEffect(() => {
    if (options.show && !EveryMonth)
      import('./components/EveryMonth').then((m) =>
        widgetLoaded(() => m.default)
      )
  }, [options.show, EveryMonth])

  // Not showing
  if (!options.show) return null

  // Loading
  if (options.show && !EveryMonth) return 'Loading...' // TODO - nicer loader

  const finalOptions = { ...defaultOptions, ...experiment(), ...options }

  return <EveryMonth options={finalOptions} hide={hide} />
}

export default EveryMonthLoader
