/**
 * @typedef Player
 * @property {string} _id.required - Player id
 * @property {string} player_name.required - Player name - eg: Sergio Ramos
 * @property {string} firstname.required - Player first name - eg: Sergio
 * @property {string} lastname.required - Player lastname - eg: Ramos
 * @property {string} position.required - Player's position - eg: Attacker
 * @property {string} nationality.required - Player's nationality - eg: Spanish 
 * @property {number} value.required - Player's value - eg: 6000000
 * @property {number} team_id.required - Player's id team - eg: 1313
 * @property {Goals} goals.required - Total player's goals
 * @property {Cards} cards.required - Total player's cards
 */

/**
 * @typedef Goals
 * @property {number} total.required - Total goals - eg: 19
 * @property {number} assists.required - Total assisted goals - eg: 5
 */

/**
 * @typedef Cards
 * @property {number} yellow.required - Total yellow cards - eg: 1
 * @property {number} red.required - Total red cards - eg: 2
 */
 
/**
 * Get all the players
 * @route GET /players
 * @group Players - Operations about Players
 * @returns {Array.<Player>} 200 - An array of players info
 * @returns {Error}  500 - Unexpected error
 */

/**
 * Create a new player
 * @route POST /players
 * @param {Player.model} player.body.required - the new player
 * @group Players - Operations about Players
 * @operationId createNewPlayer
 * @produces application/json
 * @consumes application/json
 * @returns {Player.model} 201 - The player created
 * @returns {Error}  400 - Bad Request
 * @returns {Error}  500 - Unexpected error
 */

/*
 * @headers {integer} 200.X-Rate-Limit - calls per hour allowed by the user
 * @headers {string} 200.X-Expires-After - 	date in UTC when token expires
 * @security JWT
 */

/**
 * Get a player by ID
 * @route GET /players/{idPlayer}
 * @group Players - Operations about Players
 * @param {string} idPlayer.path.required - player id 
 * @returns {Player.model} 200 - Requested player
 * @returns {Error} 400 - Bad Request
 * @returns {Error}  500 - Unexpected error
 */

/**
 * Update a player
 * @route PUT /player
 * @param {Player.model} player.body.required - The updated player
 * @group Players - Operations about Players
 * @returns {object} 200 - Succesfully updated
 * @returns {Error}  400 - Bad Request
 * @returns {Error}  404 - Not Found
 * @returns {Error}  500 - Unexpected error
 */

/**
 * Remove a player
 * @route DELETE /players/{idPlayer}
 * @group Players - Operations about Players
 * @param {string} idPlayer.path.required - player id
 * @returns {object} 200 - OK
 * @returns {Error}  400 - Bad Request
 * @returns {Error} 404 - Not Found
 * @returns {Error}  500 - Unexpected error
 */

exports.foo = function() {}