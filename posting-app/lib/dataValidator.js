const dataValidator = (data) => {
    const hasSector = data.hasOwnProperty('Sector');
    const hasCountry = data.hasOwnProperty('Country');
    const hasParentSector = data.hasOwnProperty('Parent sector');

    const isComplete = (hasSector && hasCountry && hasParentSector);

    return isComplete;
};

const dataFormatter = (data) => {
    const dataToFormat = data;

    dataToFormat['sector'] = data['Sector'];
    dataToFormat['parentSector'] = data['Parent sector'];
    dataToFormat['country'] = data['Country'];

    return dataToFormat;
};

module.exports = {
    dataValidator,
    dataFormatter,
};