import PropTypes from 'prop-types';

/**
 * A reusable button component.
 * @param {Object} props - The component props.
 * @param {Function} props.handleClick - The click event handler for the button.
 * @returns {JSX.Element} - The rendered Button component.
 */

function ButtonCheck({ handleClick }) {
  return (
    <>
      <button
        type="button"
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4"
        onClick={handleClick}
      >
        Conferir diferenças
      </button>
    </>
  );
}

export default ButtonCheck;

ButtonCheck.propTypes = {
  handleClick: PropTypes.func,
};
