interface Donation {
    title: string;
    isChecked: boolean;
};

export const getDonationsTitles = (donations: Donation[]) => {
    const checkedDonations = donations.filter(
        donation => donation.isChecked
    );

    const titles = checkedDonations
        .map(donation => donation.title)
        .join(', ');

    return titles;
};