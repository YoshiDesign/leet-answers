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
        console.log("New name?: ", is_new, _key)

        if (!is_new) {
            console.log("Updating existing <Record>...")
            // Merge Emails into existing account record
            all_accounts[_key] = [...all_accounts[_key], ...account.slice(1)]
        }
        else {
            console.log(`Adding a new <Record>: ${account[0]}`)
            // Initialize a new entry
            all_accounts[_key] = account.slice(1)
        }
    })

    console.log(" -Success- all_accounts: ", all_accounts)

    return compile_answer(all_accounts) // You are here
};

/**
 * Remove duplicates, sort, and aggregate.
 */
function compile_answer(all_accounts: Record<string, string[]>) : string[][] {

    let solution = []
    Object.entries(all_accounts).forEach( entry => {
        let name = entry[0].split("_id")[0]
        let emails = entry[1]
        
        // Remove duplicates
        emails = emails.filter( (email, i) => emails.indexOf(email) === i)
        emails = emails.sort()

        console.log("Final Object: ", [name, ...emails])
        solution.push([name, ...emails])

    })

    return solution
}

/**
 * Create a lookup table for account names and emails
 */
function verify_account(account: string[], all_accounts: Record<string, string[]>) : [boolean, string] {

    let account_name: string = account[0]
    let account_emails: string[] = account.slice(1)
    let all_verified = Object.entries(all_accounts) // [[name (our unique key), followed by emails], ...] just like the input
    let is_new = true
    let _key = account_name

    // Look for an existing email in our object of organized (verified) accounts.
    all_verified.forEach( (entry) => {
        // Compare emails between new entry and all existing entries
        if (account_emails.some( email => entry[1].includes(email) )) {
            is_new = false
            _key = entry[0]
            console.log("Found a match!", account_name, "\nAt key: ", _key)
        }
    })

    // console.log("Key: ", _key)
    // console.log("is_new: ", is_new)
    // console.log("account_name: ", account_name)
 
    if (is_new) {
        console.log("Creating new entry...")
        /**
         * Apply a unique key to this entry
         */
 
        let names = Object.keys(all_accounts)

        // Get an array of all of the names without our unique suffixes
        let all_names = names.map( (name: string) => {
            return name.split("_id")[0]
        })

        console.log("All Names: ", all_names)

        // Count how many times this name has already appeared
        const n = all_names.filter( (name: string) => name === account_name ).length

        console.log(`Found ${account_name} ${n} time(s).`)

        // Add a unique suffix and return the key
        is_new = true
        _key = account_name + "_id" + String(n)

    }

    return [is_new, _key]

}