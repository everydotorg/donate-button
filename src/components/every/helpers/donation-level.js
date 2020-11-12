export const getCustomDonationLevel = (monthlyLevels, donationAmount) => {
    return monthlyLevels.reduce((level, currentlevel) => {
        if(parseInt(currentlevel.amount, 10) <= parseInt(donationAmount, 10)){
            return currentlevel;
        }

        return level
    })
}
