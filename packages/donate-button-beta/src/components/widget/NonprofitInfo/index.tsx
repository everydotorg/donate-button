import cxs from 'cxs'
import { COLORS } from 'src/components/widget/theme/colors.enum'

const text = `We are a nonprofit and rely on donations and grants to keep us going.`
const body = `Reader donations are essential to our work, providing us with the stability and independence we need, so we can focus on showing the data and evidence we think everyone needs to know.`
const thanks = `Global Change Data Lab and the Our World in Data team`

const containerCss = cxs({
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem',
    ' > *:not(:last-child)': {
        marginBottom: '20px'
    },
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '-0.05em',
    color: COLORS.Text,
    ' > p': {
        margin: 0,
        padding: 0,
    }
})

const lastParagraph = cxs({
    color: COLORS.TextOpaque,
    ' > span': {
        display: 'block'
    }
})

const actionsContainer = cxs({
    color: COLORS.Primary,
    display: 'flex',
    '& > *:not(:last-child)': {
        marginRight: '1.5rem',
    },
    ' > p': {
        margin: 0,
        cursor: 'pointer'
    }
})
type NonprofitInfo = {
    classes: string[]
}
export const NonprofitInfo = ({classes}: NonprofitInfo) => {
    return (
        <div className={[containerCss].concat(classes).join(' ')}>
            <p>{text}</p>
            <p>{body}</p>
            <p className={lastParagraph}><span>Thank you,</span><span>{thanks}</span></p>
            <div className={actionsContainer}>
                <p>Donations Policy</p>
                <p>FAQ</p>
            </div>
        
        </div>
    )
}
