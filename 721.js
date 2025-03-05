/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function(accounts) {
    let solution = []
    let tmp = {}

    // Used for labeling unique entries into the tmp object
    let tmp_id = 0

    accounts.forEach( account => {
        let [name, ...emails] = account
        let new_entry = name + "_" + String(tmp_id)

        // Do any of the account emails already belong to someone?
        let _key = checkTmp(tmp, emails) 

        if (_key !== false) {

            let merged = tmp[_key].concat(emails)
            tmp[_key] = merged

            // Remove duplicates
            tmp[_key] = tmp[_key].filter((item, i, self) => self.indexOf(item) === i) 
            // [...new Set(tmp[_key])] // Another way to remove duplicates
        }
        else {
            tmp[new_entry] = emails
            tmp_id++
        }

    })

    return Object.entries(tmp).map( ([key, val]) => [key.split("_")[0], ...val.sort()])

};

function checkTmp(tmp, emails) {

    let found_match = 0;

    Object.keys(tmp).forEach( key => {
        emails.forEach( email => {

            if (tmp[key].includes(email)) {
                found_match = key 
            }
        })
    })
    if (found_match) {
        return found_match
    }
    return false
}