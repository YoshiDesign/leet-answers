function accountsMerge(accounts: string[][]): string[][] {

    // Create an object to track unique accounts and their emails
    let all_accounts: Record<string, string[]> = {};

    /**
     * First we'll create a lookup table for every account.
     * By using this table we can identify all of our edge cases AoT,
     * E.g. Same names w/ diff emails, same names w/ additional emails, etc.
     */
    accounts.forEach( (account: string[]) => {
        let [is_new, _key] = verify_account(account, all_accounts)

        if (!is_new) {
            // Merge Emails into existing account record
            all_accounts[_key] = [...all_accounts[_key], ...account.slice(1)]
        }
        else {
            // Initialize a new entry
            all_accounts[_key] = account.slice(1)
        }
    })

    return compile_answer(final_pass(all_accounts))
};

/**
 * Recursive function 
 */
function final_pass(all_accounts: Record<string, string[]>) : Record<string, string[]> {
    
    // There's no need to apply this function anymore
    if (Object.keys(all_accounts).length === 1) {
        return all_accounts
    }

    let new_records = {}            // Updated account records
    let updated_ids = []            // List of ids to avoid reiterating
    let found_duplicates = false    // Discovered accounts with a matching email

    // Compare every index of our object to each other
    Object.entries(all_accounts).forEach( (account_i, i) => {
        let emails_i = account_i[1]
        if (updated_ids.includes(account_i[0])) { /* accounted for, continue */ }
        else {
            Object.entries(all_accounts).forEach( (account_j, j) => {
                console.log("Scanned IDS: ", updated_ids)
                if (i === j) { /* same entry, continue */ }
                else {
                    let emails_j = account_j[1]
                    let new_emails = []

                    // Check for duplicates
                    if (emails_i.some( email => emails_j.includes(email))) {
                        found_duplicates = true

                        // Account has been accounted for
                        updated_ids.push(account_j[0])

                        new_emails = [...emails_i, ...emails_j] // Merge

                        // Update records
                        new_records[account_i[0]] = new_emails

                    } else {
                        // No duplicate were found
                        new_records[account_i[0]] = account_i[1]
                    }
                }
            })
        }
    })
    
    if (found_duplicates) {
        console.log("Final Pass Detected a Duplicate...\nNew Records:", new_records)
        new_records = final_pass(new_records)
    }
    console.log("Returning new records: ", new_records)
    return new_records
}

/**
 * Remove duplicates, sort, and aggregate.
 */
function compile_answer(all_accounts: Record<string, string[]>) : string[][] {
    console.log("Compiling answer...")
    let solution = []
    Object.entries(all_accounts).forEach( entry => {
        let name = entry[0].split("_id")[0]
        let emails = entry[1]
        
        // Remove duplicates
        emails = emails.filter( (email, i) => emails.indexOf(email) === i)
        emails = emails.sort()

        solution.push([name, ...emails])

    })
    console.log("Answer:", solution)
    return solution
}

/**
 * Scan our accounts lookup table, determining a status for the new entry.
 * Return the key in which the emails will reside in our lookup table,
 * and a boolean to determine if the key already exists (to merge emails later)
 */
function verify_account(account: string[], all_accounts: Record<string, string[]>) : [boolean, string] {

    let account_name: string = account[0]
    let account_emails: string[] = account.slice(1)
    let all_verified = Object.entries(all_accounts) // [[name (our unique key), followed by emails], ...] just like the input
    
    let is_new = true       // Return status
    let _key = account_name // Return status

    // Look for an existing email in our object of organized (verified) accounts.
    all_verified.forEach( (entry) => {
        if (account_emails.some( email => entry[1].includes(email) )) {
            is_new = false
            _key = entry[0]
        }
    })

    if (is_new) {
        
        /**
         * Create a unique key for the new entry.
         */
 
        let names = Object.keys(all_accounts)

        // Get an array of all of the names without our unique suffixes
        let all_names = names.map( (name: string) => {
            return name.split("_id")[0]
        })

        // Count how many times this name has already appeared
        const n = all_names.filter( (name: string) => name === account_name ).length

        // Add a unique suffix and return the key
        is_new = true
        _key = account_name + "_id" + String(n)

    }

    return [is_new, _key]

}