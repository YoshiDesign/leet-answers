function accountsMerge(accounts: string[][]): string[][] {
    let all_accounts: Record<string, string[]> = {};

    accounts.forEach( (account: string[]) => {
        let [is_new, _key] = verify_account(account, all_accounts)
        console.log("New name?: ", is_new, _key)

        if (!is_new) {
            // Merge Emails
        }
        else {
            console.log(`Adding name: ${account[0]}`)
            all_accounts[account[0]] = account.slice(1)
        }
    })

    console.log("all_accounts: ", all_accounts)

    return [[""]]
};

function verify_account(account: string[], all_accounts: Record<string, string[]>) {

    let account_name: string = account[0]
    let account_emails: string[] = account.slice(1)
    console.log("Sanity: ", account_name, Object.keys(all_accounts))
    console.log("name in object: ", (account_name in all_accounts))
    if (account_name in all_accounts) {
        console.log("Pre-Existing Name: ", account_name)
        /**
         * Compare existing emails to the incoming account's emails
         */
        let existing_emails = all_accounts[account_name]

        let same_account: boolean = account_emails.some( (email:string) => {
            return existing_emails.includes(email)
        });

        console.log("Same Account? ", same_account)

        // It's the same account, return the same key
        if (same_account) {
            return [false, account_name]
        }
        // Check how many times this name appears already so we can add another account to our all_accounts Object
        else {
            let names = Object.keys(all_accounts)

            // Get an array of all of the names without our unique suffixes
            let all_names = names.map( (name: string) => {
                return name.split("_")[0]
            })

            // Count how many times this name has already appeared
            const n = all_names.filter( (name: string) => {name === account_name}).length

            console.log(`Found ${account_name} ${n} times.`)

            // Add a unique suffix and return the key
            return [true, account_name + "_copy_" + String(n)]
        }
    }

    // The incoming account's name is new, it cannot exist already
    return [true, account_name]
}