import cxs from 'cxs'
import { COLORS } from 'src/components/widget/theme/colors.enum'
import gbFlag from 'src/assets/flags/gb.svg'

const cardCss = cxs({
    padding: '0.75rem',
    border: `1px solid ${COLORS.LightGray}`,
    borderRadius: '8px',

})

const countrySelectorCss = cxs({
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '1rem',
    alignItems: 'center',
    position: 'relative',
    cursor: 'pointer'
})

const countrySelectedCss = cxs({
    fontSize: '1rem',
    lineHeight: 1.5,
    color: COLORS.Primary,
    letterSpacing: '-0.01em',
    margin: 0,
    transform: 'translateY(0.07em)'
})

const countryFlagCss = cxs({
    height: '1rem',
    width: '1rem',
    borderRadius: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    marginRight: '1rem'
})

const arrowCss = cxs({
    fontSize: '1rem',
    lineHeight: 1.5,
    color: COLORS.Primary,
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)'
})

const bodyCss = cxs({
    color: COLORS.TextOpaque,
    fontSize: '0.75rem',
    lineHeight: 1.5,
    margin: 0,
})

export const CountryCard = () => {



    return (
        <div className={cardCss}>
            <div className={countrySelectorCss}>
                <img className={countryFlagCss} src={gbFlag} alt="country flag" />
                <p className={countrySelectedCss}>Great Bretain</p>
                <span className={arrowCss}>{'>'}</span>
            </div>
            <div>
                <p className={bodyCss}>You will be redirected to Every.org to complete  your GBP donation to a UK registered charity eligible for GiftAid.</p>
            </div>
        </div>
    )
}
