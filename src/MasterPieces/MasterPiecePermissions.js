/**
 * @constructor
 * @param {String} [binaryString="11000"] A string of 1's and 0's corresponding to allowed or not allowed for a given permission
 */
RIPSAW.MasterPiecePermissions = function (binaryString) {
    /** @type {Array} */
  this.permissionList = ['draw', 'edit', 'pan', 'zoom', 'rotate']

    /** @type {String} */
  this.setBinaryString(binaryString || '11000')

  return this
}

RIPSAW.MasterPiecePermissions.prototype = {

    /**
     * Retrieves permission by index.
     * @param {number} index - Index in permissionList array to be retrieved.
     * @returns {boolean} permission
     */
  getByIndex: function (index) {
    return this[this.permissionList[index]]
  },

    /**
     * Sets permission by index.
     * @param {number} index - Index in permissionList array to be set.
     * @returns {RIPSAW.MasterPiecePermissions} this
     */
  setByIndex: function (index, value) {
    this[this.permissionList[index]] = value

    return this
  },

    /**
     * Sets permission based on binary string (0's or 1's).
     * @param {String} binaryString
     * @returns {RIPSAW.MasterPiecePermissions} this
     */
  setBinaryString: function (binaryString) {
    var i
    var max = this.permissionList.length

    binaryString = (Object.prototype.toString.call(binaryString) === '[object String]') ? binaryString : '0'

    for (i = 0; i < max; i += 1) {
      this[this.permissionList[i]] = (binaryString.charAt(i) === '1')
    }

    return this
  }

}
