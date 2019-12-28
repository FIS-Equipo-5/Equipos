/**
 * @typedef Team
 * @property {number} team_id.required - Team id 
 * @property {string} name.required - Team name - eg: Real Betis
 * @property {string} code.required - Team code - eg: 000
 * @property {string} logo.required - Team logo - eg: https://media.api-football.com/teams/543.png
 * @property {string} country.required - Team country - eg: Spain
 * @property {number} founded.required - Team fundation year 
 * @property {string} venue_name.required - Team venue name - eg: Benito Villamarín
 * @property {string} venue_surface.required - Team venue surface - eg: grass
 * @property {string} venue_address.required - Team venue address - eg: Avnda. inventada
 * @property {string} venue_city.required - Team venue city - eg: Sevilla
 * @property {number} venue_capacity.required - Team venue capacity 
 * @property {number} budget.required - Team budget 
 * @property {number} value.required - Team value 
 */
 
/**
 * This function comment is parsed by doctrine
 * @route GET /teams
 * @group Teams - Operations about Teams
 * @returns {Array.<Team>} 200 - An array of teams info
 * @returns {Error}  500 - Unexpected error
 */

 /**
 * This function comment is parsed by doctrine
 * @route POST /teams
 * @param {Team.model} team.body.required - the new team
 * @group Teams - Operations about Teams
 * @operationId createNewTeam
 * @produces application/json
 * @consumes application/json
 * @returns {Team.model} 201 - The team created
 * @returns {Error}  400 - Bad Request
 * @returns {Error}  500 - Unexpected error
 */
/*
 * @headers {integer} 200.X-Rate-Limit - calls per hour allowed by the user
 * @headers {string} 200.X-Expires-After - 	date in UTC when token expires
 * @security JWT
 */


 /**
 * This function comment is parsed by doctrine
 * @route DELETE /teams
 * @group Teams - Operations about Teams
 * @returns {object} 204 - No content
 * @returns {Error}  500 - Unexpected error
 */

 /**
 * This function comment is parsed by doctrine
 * @route GET /teams/{team_name}
 * @group Teams - Operations about Teams
 * @param {string} team_name.path.required - team name - eg: Real Betis
 * @returns {Team.model} 200 - Requested team
 * @returns {object} 404 - Not Found
 * @returns {Error}  500 - Unexpected error
 */

 /**
 * This function comment is parsed by doctrine
 * @route PUT /teams/{team_name}
 * @param {Team.model} team.body.required - the new team
 * @group Teams - Operations about Teams
 * @param {string} team_name.path.required - team name - eg: Real Betis
 * @returns {object} 200 - Succesfully updated
 * @returns {Error}  404 - Not Found
 * @returns {Error}  400 - Bad Request
 * @returns {Error}  500 - Unexpected error
 */

 /**
 * This function comment is parsed by doctrine
 * @route DELETE /teams/{team_name}
 * @group Teams - Operations about Teams
 * @param {string} team_name.path.required - team name - eg: Real Betis
 * @returns {object} 204 - No content
 * @returns {Error}  404 - Not Found
 * @returns {Error}  500 - Unexpected error
 */

 /**
 * This function comment is parsed by doctrine
 * @route GET /teams/team/{team_id}
 * @group Teams - Operations about Teams
 * @param {string} team_id.path.required - team identifier - eg: 123
 * @returns {Team.model} 200 - Requested team
 * @returns {Error}  404 - Not Found
 * @returns {Error}  500 - Unexpected error
 */


exports.foo = function() {}