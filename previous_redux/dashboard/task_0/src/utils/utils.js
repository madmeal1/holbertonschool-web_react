/**
 * Get the current year
 * @returns {number} The current year
 */
function getCurrentYear() {
  return new Date().getFullYear()
}

/**
 * Get the footer copy text
 * @param {boolean} isIndex - Whether this is the index page
 * @returns {string} The footer copy text
 */
function getFooterCopy(isIndex) {
  if (isIndex) {
    return 'Holberton School'
  }
  return 'Holberton School main dashboard'
}

/**
 * Get the latest notification message
 * @returns {string} An HTML string describing the latest notification
 */
function getLatestNotification() {
  return '<strong>Urgent requirement</strong> - complete by EOD'
}

export { getCurrentYear, getFooterCopy, getLatestNotification }
