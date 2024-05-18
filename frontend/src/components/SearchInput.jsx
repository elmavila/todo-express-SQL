import PropTypes from 'prop-types'; // Importera PropTypes

function SearchInput({value, onChange}) {
    return (
        <input type="text" placeholder="Search by name" value={value} onChange={onChange} />
    )
}

SearchInput.propTypes = {
    value: PropTypes.string.isRequired, // Förväntar sig en sträng och är obligatorisk
    onChange: PropTypes.func.isRequired, // Förväntar sig en funktion och är obligatorisk
};
export default SearchInput;
