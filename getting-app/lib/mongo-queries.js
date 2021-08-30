const stringMatch = (str) => { 
   return { $regex: str, $options: 'i' };
};

const yearAmountMatch = (yearAmount) => {
    return { [yearAmount.method]: +yearAmount.amount };
}

const createDBQuery = ({
    searchTerm = '',
    country = '',
    sector = '',
    parentSector = '',
    yearAmount,
    orderBy = { field: 'updatedAt', method: -1 },
}) => {
    const matchObject = {
        $match: {},
    };

    const orderObject = {
        $sort: {[orderBy.field]: orderBy.method },
    };

    if (searchTerm) {
        matchObject.$match.$or = [
            countryMatch(searchTerm),
            sectorMatch(searchTerm),
            parentSectorMatch(searchTerm),
        ];
    }

    if (country) {
        matchObject.$match = { ...matchObject.$match, country: stringMatch(country) };
    }
    if (sector) {
        matchObject.$match = { ...matchObject.$match, sector: stringMatch(sector) };
    }
    if (parentSector) {
        matchObject.$match = { ...matchObject.$match, parentSector: stringMatch(parentSector) };
    }

    if (yearAmount.method !== 'none') {
        matchObject.$match = {
            ...matchObject.$match,
            [yearAmount.field]: yearAmountMatch(yearAmount)
        };
    }

    return [matchObject, orderObject];
};

module.exports = {
    createDBQuery,
};