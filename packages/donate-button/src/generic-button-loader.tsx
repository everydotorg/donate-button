import { render } from 'preact'
import { GenericButtonProps } from "src/helpers/options-types"

interface GenericButtonLoader {
  selector: string;
  onClick: Function;
  hrefUrl: string;
  options: Partial<GenericButtonProps>;
}

const genericButtonLoader = ({selector, options = {}, onClick, hrefUrl}: GenericButtonLoader) => {
  const div = document.querySelector(selector);

  if(div){
    import('./components/GenericButton').then(C => {
      const genericButton = <C.default {...options} onClick={onClick} hrefUrl={hrefUrl}/>
      render(genericButton, div)
    })
  }
  
}

export default genericButtonLoader
