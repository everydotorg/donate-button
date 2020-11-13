import { useEffect, useState } from 'preact/hooks'
import WIDGET_MODE from './constants/widgetMode'

import everyMonthOptions from './defaultOptions'

export const Root = (props) => {
  const [EveryMonth, widgetLoaded] = useState()
  const [widgetMode, setWidgetMode] = useState(
    localStorage.getItem('every-month-widget-mode')
  )

  if (!widgetMode) {
    const rnd = Math.random()
    if (rnd > 0.5) {
      setWidgetMode(WIDGET_MODE.SPLIT_PANEL)
      localStorage.setItem('every-month-widget-mode', WIDGET_MODE.SPLIT_PANEL)
    } else {
      setWidgetMode(WIDGET_MODE.SINGLE)
      localStorage.setItem('every-month-widget-mode', WIDGET_MODE.SINGLE)
    }
  }
  // when show is set to true and EveryMonth is not loaded, load it
  useEffect(() => {
    if (props.show && !EveryMonth)
      import('./components/EveryMonth').then((m) => widgetLoaded(() => m.default))
  }, [props.show, EveryMonth])

  if (props.show && !EveryMonth) return 'Loading...' // TODO - nicer loader

  if (!props.show || !EveryMonth) return null

  return (
    <EveryMonth
      mode={widgetMode}
      language={props.language}
      options={props.options || everyMonthOptions}
      hideFn={props.hideFn}
      hide={!props.show}
    />
  )
}

export default Root
