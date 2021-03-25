import { render } from 'preact'
import { GenericButtonProps, DonateButtonOptions } from "src/helpers/options-types"

interface GenericButtonLoader {
  selector: string;
  onClick: Function;
  widgetOptions: Partial<DonateButtonOptions>;
  options: Partial<GenericButtonProps>;
}

const genericButtonLoader = ({selector, options = {}, onClick, widgetOptions}: GenericButtonLoader) => {
  const div = document.querySelector(selector);
  
	const charity = typeof widgetOptions?.onSubmit !== 'function' ? widgetOptions.onSubmit?.charity : ''
	const hrefUrl = `https://www.every.org/${charity}/donate`;

  if(div){
    import('./components/GenericButton').then(C => {
      const genericButton = <C.default {...options} onClick={onClick} hrefUrl={hrefUrl}/>
      render(genericButton, div)
    })
  }
  
}

export default genericButtonLoader
